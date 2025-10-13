import BipartiteGraph, { type BipartiteNode, type BipartiteEdge } from '../BipartiteGraph';

export default function BipartiteGraphExample() {
  const mockNodes: BipartiteNode[] = [
    { id: 'llm1', label: 'Multimodal', type: 'llm', cluster: 0, size: 120 },
    { id: 'llm2', label: 'Educational', type: 'llm', cluster: 1, size: 95 },
    { id: 'llm3', label: 'Model Adapt', type: 'llm', cluster: 2, size: 150 },
    { id: 'llm4', label: 'Bias', type: 'llm', cluster: 3, size: 88 },
    { id: 'llm5', label: 'Reasoning', type: 'llm', cluster: 4, size: 135 },
    { id: 'llm6', label: 'Domain Know', type: 'llm', cluster: 5, size: 110 },
    { id: 'llm7', label: 'Language', type: 'llm', cluster: 6, size: 102 },
    { id: 'llm8', label: 'Social Intel', type: 'llm', cluster: 7, size: 78 },
    { id: 'psych1', label: 'Social-Clinical', type: 'psych', cluster: 0, size: 200 },
    { id: 'psych2', label: 'Education', type: 'psych', cluster: 1, size: 180 },
    { id: 'psych3', label: 'Language', type: 'psych', cluster: 2, size: 160 },
    { id: 'psych4', label: 'Social Cognition', type: 'psych', cluster: 3, size: 190 },
    { id: 'psych5', label: 'Neural Mech', type: 'psych', cluster: 4, size: 140 },
    { id: 'psych6', label: 'Psychometrics', type: 'psych', cluster: 5, size: 170 },
  ];

  const mockEdges: BipartiteEdge[] = [
    { source: 'llm1', target: 'psych1', weight: 45 },
    { source: 'llm1', target: 'psych2', weight: 32 },
    { source: 'llm2', target: 'psych2', weight: 68 },
    { source: 'llm3', target: 'psych1', weight: 28 },
    { source: 'llm3', target: 'psych6', weight: 42 },
    { source: 'llm4', target: 'psych4', weight: 55 },
    { source: 'llm5', target: 'psych3', weight: 38 },
    { source: 'llm5', target: 'psych5', weight: 50 },
    { source: 'llm6', target: 'psych2', weight: 36 },
    { source: 'llm7', target: 'psych3', weight: 72 },
    { source: 'llm8', target: 'psych1', weight: 41 },
    { source: 'llm8', target: 'psych4', weight: 58 },
  ];

  return (
    <div className="h-[600px]">
      <BipartiteGraph 
        nodes={mockNodes} 
        edges={mockEdges}
        onLLMNodeClick={(id) => console.log('LLM node clicked:', id)}
        onPsychNodeClick={(id) => console.log('Psych node clicked:', id)}
      />
    </div>
  );
}
