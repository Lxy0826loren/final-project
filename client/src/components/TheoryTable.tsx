import { Triangle } from 'lucide-react';

export interface TheoryRow {
  subtopic: string;
  theory: string;
  citations: number;
  isTopThree?: boolean;
}

interface TheoryTableProps {
  data: TheoryRow[];
  title: string;
  onTheoryClick?: (theory: string) => void;
}

export default function TheoryTable({ data, title, onTheoryClick }: TheoryTableProps) {
  const maxCitations = Math.max(...data.map(d => d.citations));

  return (
    <div className="w-full h-full flex flex-col" data-testid="theory-table">
      <div className="mb-4">
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
      </div>
      <div className="flex-1 overflow-auto border border-border rounded-lg">
        <table className="w-full">
          <thead className="sticky top-0 bg-card border-b-2 border-border z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wide w-[30%]">
                Subtopic
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wide w-[50%]">
                Theory / Framework
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground uppercase tracking-wide w-[20%]">
                Citations
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const opacity = 0.4 + (row.citations / maxCitations) * 0.6;
              return (
                <tr
                  key={index}
                  className="border-b border-border hover-elevate transition-colors"
                  style={{ opacity }}
                  data-testid={`theory-row-${index}`}
                >
                  <td className="px-4 py-3 text-sm text-foreground">
                    {row.subtopic}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <button
                      onClick={() => row.isTopThree && onTheoryClick?.(row.theory)}
                      className={`flex items-center gap-2 ${row.isTopThree ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                      data-testid={row.isTopThree ? `top-theory-${index}` : undefined}
                      disabled={!row.isTopThree}
                    >
                      {row.isTopThree && (
                        <Triangle className="w-3 h-3 fill-foreground" />
                      )}
                      <span>{row.theory}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {row.citations}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
