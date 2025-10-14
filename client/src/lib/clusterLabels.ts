/**
 * Cluster label mappings for visualization
 * Maps cluster IDs to concise, user-friendly labels
 */

export const LLM_CLUSTER_LABELS: Record<string, string> = {
  'Cluster 0': 'Multimodal Learning',
  'Cluster 1': 'Educational Application',
  'Cluster 2': 'Model Adaptation & Efficiency',
  'Cluster 3': 'Bias, Morality & Culture',
  'Cluster 4': 'Advanced Reasoning',
  'Cluster 5': 'Domain Knowledge',
  'Cluster 6': 'Language Ability',
  'Cluster 7': 'Social Intelligence',
};

export const PSYCH_CLUSTER_LABELS: Record<string, string> = {
  'Cluster 0': 'Social-Clinical',
  'Cluster 1': 'Education',
  'Cluster 2': 'Language',
  'Cluster 3': 'Social Cognition',
  'Cluster 4': 'Neural Mechanisms',
  'Cluster 5': 'Psychometrics & JDM',
};

/**
 * Get display label for a cluster
 */
export function getClusterLabel(clusterId: string, type: 'llm' | 'psych'): string {
  const labels = type === 'llm' ? LLM_CLUSTER_LABELS : PSYCH_CLUSTER_LABELS;
  return labels[clusterId] || clusterId;
}
