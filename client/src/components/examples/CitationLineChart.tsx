import CitationLineChart, { type CitationDataPoint } from '../CitationLineChart';

export default function CitationLineChartExample() {
  const mockData: CitationDataPoint[] = [
    { month: '2022-01', citations: 45 },
    { month: '2022-04', citations: 52 },
    { month: '2022-07', citations: 68 },
    { month: '2022-10', citations: 85 },
    { month: '2023-01', citations: 102 },
    { month: '2023-04', citations: 125 },
    { month: '2023-07', citations: 148 },
    { month: '2023-10', citations: 172 },
    { month: '2024-01', citations: 195 },
    { month: '2024-04', citations: 215 },
  ];

  return (
    <div className="h-[400px] p-6 bg-card rounded-lg border border-card-border">
      <CitationLineChart
        data={mockData}
        title="Overall Citation Flow from LLM Research to Psychology Papers"
        color="hsl(var(--chart-1))"
      />
    </div>
  );
}
