import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

function isReplit() {
  return !!process.env.REPL_ID;
}

function getHost() {
  return isReplit() ? "0.0.0.0" : "127.0.0.1";
}

async function pickAvailablePort(preferred: number, host: string): Promise<number> {
  const net = await import("node:net");
  let port = preferred;

  while (true) {
    const ok = await new Promise<boolean>((resolve) => {
      const s = net
        .createServer()
        .once("error", (err: any) => {
          resolve(!(err && err.code === "EADDRINUSE")); 
        })
        .once("listening", () => {
          s.close(() => resolve(true));
        })
        .listen(port, host);
    });
    if (ok) return port;
    port += 1;
  }
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const host = getHost();
  const preferred = parseInt(process.env.PORT || "5000", 10);
  const port = await pickAvailablePort(preferred, host);

  server.listen({ port, host }, () => {
    log(
      `serving on http://${host}:${port}${
        port !== preferred ? ` (picked, ${preferred} in use)` : ""
      }`,
    );
  });
})();
