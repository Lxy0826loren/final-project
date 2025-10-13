import TheoryBarChart, { type TheoryDistribution } from '../TheoryBarChart';

export default function TheoryBarChartExample() {
  const mockData: TheoryDistribution[] = [
    { topic: 'Multimodal Learning', citations: 28 },
    { topic: 'Educational App', citations: 15 },
    { topic: 'Model Adaptation', citations: 22 },
    { topic: 'Bias & Culture', citations: 35 },
    { topic: 'Advanced Reasoning', citations: 18 },
    { topic: 'Domain Knowledge', citations: 31 },
    { topic: 'Language Ability', citations: 12 },
    { topic: 'Social Intelligence', citations: 26 },
  ];

  return (
    <div className="h-[500px]">
      <TheoryBarChart
        data={mockData}
        title="Citation Distribution for Cognitive Behavioral Therapy Across LLM Topics"
      />
    </div>
  );
}
