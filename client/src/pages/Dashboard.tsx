import { useState } from 'react';
import BipartiteGraph, { type BipartiteNode, type BipartiteEdge } from '@/components/BipartiteGraph';
import CitationLineChart, { type CitationDataPoint } from '@/components/CitationLineChart';
import TheoryTable, { type TheoryRow } from '@/components/TheoryTable';
import TheoryBarChart, { type TheoryDistribution } from '@/components/TheoryBarChart';
import ThemeToggle from '@/components/ThemeToggle';

export default function Dashboard() {
  const [selectedLLMNode, setSelectedLLMNode] = useState<string | null>(null);
  const [selectedPsychNode, setSelectedPsychNode] = useState<string | null>(null);
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  const bipartiteNodes: BipartiteNode[] = [
    { id: 'llm1', label: 'Multimodal Learning', type: 'llm', cluster: 0, size: 161 },
    { id: 'llm2', label: 'Educational Application', type: 'llm', cluster: 1, size: 143 },
    { id: 'llm3', label: 'Model Adaptation', type: 'llm', cluster: 2, size: 187 },
    { id: 'llm4', label: 'Bias & Culture', type: 'llm', cluster: 3, size: 156 },
    { id: 'llm5', label: 'Advanced Reasoning', type: 'llm', cluster: 4, size: 198 },
    { id: 'llm6', label: 'Domain Knowledge', type: 'llm', cluster: 5, size: 161 },
    { id: 'llm7', label: 'Language Ability', type: 'llm', cluster: 6, size: 134 },
    { id: 'llm8', label: 'Social Intelligence', type: 'llm', cluster: 7, size: 128 },
    { id: 'psych1', label: 'Social-Clinical', type: 'psych', cluster: 0, size: 298 },
    { id: 'psych2', label: 'Education', type: 'psych', cluster: 1, size: 267 },
    { id: 'psych3', label: 'Language', type: 'psych', cluster: 2, size: 245 },
    { id: 'psych4', label: 'Social Cognition', type: 'psych', cluster: 3, size: 500 },
    { id: 'psych5', label: 'Neural Mechanisms', type: 'psych', cluster: 4, size: 189 },
    { id: 'psych6', label: 'Psychometrics', type: 'psych', cluster: 5, size: 234 },
  ];

  const bipartiteEdges: BipartiteEdge[] = [
    { source: 'llm1', target: 'psych1', weight: 45 },
    { source: 'llm1', target: 'psych4', weight: 38 },
    { source: 'llm2', target: 'psych2', weight: 68 },
    { source: 'llm2', target: 'psych1', weight: 25 },
    { source: 'llm3', target: 'psych6', weight: 42 },
    { source: 'llm3', target: 'psych5', weight: 31 },
    { source: 'llm4', target: 'psych4', weight: 55 },
    { source: 'llm4', target: 'psych3', weight: 28 },
    { source: 'llm5', target: 'psych3', weight: 38 },
    { source: 'llm5', target: 'psych5', weight: 50 },
    { source: 'llm6', target: 'psych2', weight: 36 },
    { source: 'llm6', target: 'psych6', weight: 44 },
    { source: 'llm7', target: 'psych3', weight: 72 },
    { source: 'llm7', target: 'psych2', weight: 33 },
    { source: 'llm8', target: 'psych1', weight: 41 },
    { source: 'llm8', target: 'psych4', weight: 58 },
  ];

  const overallLineData: CitationDataPoint[] = [
    { month: '2022-01', citations: 145 },
    { month: '2022-04', citations: 168 },
    { month: '2022-07', citations: 192 },
    { month: '2022-10', citations: 225 },
    { month: '2023-01', citations: 268 },
    { month: '2023-04', citations: 312 },
    { month: '2023-07', citations: 358 },
    { month: '2023-10', citations: 405 },
    { month: '2024-01', citations: 452 },
    { month: '2024-04', citations: 498 },
  ];

  const multimodalLineData: CitationDataPoint[] = [
    { month: '2022-01', citations: 12 },
    { month: '2022-04', citations: 18 },
    { month: '2022-07', citations: 25 },
    { month: '2022-10', citations: 32 },
    { month: '2023-01', citations: 41 },
    { month: '2023-04', citations: 48 },
    { month: '2023-07', citations: 55 },
    { month: '2023-10', citations: 63 },
    { month: '2024-01', citations: 72 },
    { month: '2024-04', citations: 83 },
  ];

  const socialClinicalTheories: TheoryRow[] = [
    { subtopic: 'Health Communication', theory: 'Cognitive Behavioral Therapy', citations: 51, isTopThree: true },
    { subtopic: 'Health Communication', theory: 'Motivational Interviewing', citations: 13, isTopThree: false },
    { subtopic: 'Health Communication', theory: 'The Belmont Report', citations: 13, isTopThree: false },
    { subtopic: 'Mental Health Diagnosis', theory: 'The DSM-5', citations: 33, isTopThree: true },
    { subtopic: 'Mental Health Diagnosis', theory: 'The Dark Triad', citations: 4, isTopThree: false },
    { subtopic: 'Personality Assessment', theory: 'Five Factor Model', citations: 25, isTopThree: true },
    { subtopic: 'Personality Assessment', theory: 'HEXACO Model', citations: 8, isTopThree: false },
  ];

  const cbtDistribution: TheoryDistribution[] = [
    { topic: 'Multimodal Learning', citations: 28 },
    { topic: 'Educational Application', citations: 15 },
    { topic: 'Model Adaptation', citations: 22 },
    { topic: 'Bias & Culture', citations: 35 },
    { topic: 'Advanced Reasoning', citations: 18 },
    { topic: 'Domain Knowledge', citations: 31 },
    { topic: 'Language Ability', citations: 12 },
    { topic: 'Social Intelligence', citations: 26 },
  ];

  const getLineChartData = () => {
    if (selectedLLMNode === 'llm1') return multimodalLineData;
    return overallLineData;
  };

  const getLineChartTitle = () => {
    if (selectedLLMNode === 'llm1') return 'Citation Flow from Multimodal Learning to Psychology Papers';
    return 'Overall Citation Flow from LLM Research to Psychology Papers';
  };

  const getLineChartColor = () => {
    if (selectedLLMNode === 'llm1') return 'hsl(280 70% 65%)';
    return 'hsl(var(--chart-1))';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground" data-testid="page-title">
              LLM-Psychology Citation Network
            </h1>
            <p className="text-sm text-muted-foreground">Interactive Visualization Dashboard</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-8">
        <div className="flex gap-6 mb-8">
          <div className="flex-[2] bg-card border border-card-border rounded-lg p-6 min-h-[580px]">
            <h2 className="text-lg font-medium text-foreground mb-4">
              Bipartite Graph: LLM Topics ↔ Psychology Topics
            </h2>
            <BipartiteGraph
              nodes={bipartiteNodes}
              edges={bipartiteEdges}
              selectedLLMNode={selectedLLMNode}
              selectedPsychNode={selectedPsychNode}
              onLLMNodeClick={(id) => {
                setSelectedLLMNode(selectedLLMNode === id ? null : id);
                console.log('LLM Node clicked:', id);
              }}
              onPsychNodeClick={(id) => {
                setSelectedPsychNode(selectedPsychNode === id ? null : id);
                setSelectedTheory(null);
                console.log('Psychology Node clicked:', id);
              }}
            />
          </div>

          <div className="flex-1 bg-card border border-card-border rounded-lg p-6 min-h-[580px]">
            <CitationLineChart
              data={getLineChartData()}
              title={getLineChartTitle()}
              color={getLineChartColor()}
            />
          </div>
        </div>

        {selectedPsychNode && (
          <div className="flex gap-6">
            <div className="flex-[2] bg-card border border-card-border rounded-lg p-6 min-h-[520px]">
              <TheoryTable
                data={socialClinicalTheories}
                title="Subtopics and Theories in Social-Clinical Cluster"
                onTheoryClick={(theory) => {
                  setSelectedTheory(selectedTheory === theory ? null : theory);
                  console.log('Theory clicked:', theory);
                }}
              />
            </div>

            {selectedTheory && (
              <div className="flex-1 min-h-[520px]">
                <TheoryBarChart
                  data={cbtDistribution}
                  title="Citation Distribution: CBT Across LLM Topics"
                />
              </div>
            )}
          </div>
        )}

        {!selectedPsychNode && (
          <div className="bg-muted/30 border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground text-lg">
              Click on a <span className="font-semibold text-foreground">Psychology topic</span> node in the bipartite graph above to view detailed theories and frameworks
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
