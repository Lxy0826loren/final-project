import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export interface CitationDataPoint {
  month: string;
  citations: number;
}

interface CitationLineChartProps {
  data: CitationDataPoint[];
  title: string;
  color?: string;
}

export default function CitationLineChart({ data, title, color = 'hsl(var(--chart-1))' }: CitationLineChartProps) {
  return (
    <div className="w-full h-full flex flex-col" data-testid="citation-line-chart">
      <div className="mb-4">
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ 
                value: 'Citation Count', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--popover-border))',
                borderRadius: '0.375rem',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
            />
            <Line
              type="monotone"
              dataKey="citations"
              stroke={color}
              strokeWidth={2.5}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={400}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
