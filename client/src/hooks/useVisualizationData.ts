import { useState, useEffect } from 'react';
import {
  loadLLMClusters,
  loadPsychClusters,
  loadTheoryPool,
  loadFilteredPapersInfo,
  loadFilteredRefsInfo,
  getClusterNumber,
  getTopTheories,
  type LLMCluster,
  type PsychCluster,
  type ClusterTheories
} from '@/lib/dataLoader';
import type { BipartiteNode, BipartiteEdge } from '@/components/BipartiteGraph';
import type { CitationDataPoint } from '@/components/CitationLineChart';
import type { TheoryRow } from '@/components/TheoryTable';
import type { TheoryDistribution } from '@/components/TheoryBarChart';

export function useVisualizationData() {
  const [loading, setLoading] = useState(true);
  const [llmClusters, setLlmClusters] = useState<Record<string, LLMCluster>>({});
  const [psychClusters, setPsychClusters] = useState<Record<string, PsychCluster>>({});
  const [theoryPool, setTheoryPool] = useState<Record<string, ClusterTheories>>({});
  const [papersInfo, setPapersInfo] = useState<any>(null);
  const [refsInfo, setRefsInfo] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [llm, psych, theories, papers, refs] = await Promise.all([
          loadLLMClusters(),
          loadPsychClusters(),
          loadTheoryPool(),
          loadFilteredPapersInfo(),
          loadFilteredRefsInfo()
        ]);

        setLlmClusters(llm);
        setPsychClusters(psych);
        setTheoryPool(theories);
        setPapersInfo(papers);
        setRefsInfo(refs);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Generate bipartite graph nodes
  const getBipartiteNodes = (): BipartiteNode[] => {
    const llmNodes: BipartiteNode[] = Object.entries(llmClusters).map(([key, cluster]) => ({
      id: key,
      label: cluster.topic.split(' ').slice(0, 2).join(' '),
      type: 'llm' as const,
      cluster: getClusterNumber(key),
      size: cluster.size
    }));

    const psychNodes: BipartiteNode[] = Object.entries(psychClusters).map(([key, cluster]) => ({
      id: key,
      label: cluster.topic.split(' ').slice(0, 2).join(' '),
      type: 'psych' as const,
      cluster: getClusterNumber(key),
      size: cluster.size
    }));

    return [...llmNodes, ...psychNodes];
  };

  // Generate bipartite graph edges
  const getBipartiteEdges = (): BipartiteEdge[] => {
    const edges: BipartiteEdge[] = [];
    
    // Calculate edges based on citation relationships
    Object.entries(llmClusters).forEach(([llmKey, llmCluster]) => {
      Object.entries(psychClusters).forEach(([psychKey, psychCluster]) => {
        // Count overlapping papers/references
        const llmPaperIds = new Set(llmCluster.docs.map(d => d.paperId));
        const psychPaperIds = new Set(psychCluster.docs.map(d => d.paperId));
        
        let overlap = 0;
        llmPaperIds.forEach(id => {
          if (psychPaperIds.has(id)) overlap++;
        });

        if (overlap > 0) {
          edges.push({
            source: llmKey,
            target: psychKey,
            weight: overlap
          });
        }
      });
    });

    return edges;
  };

  // Generate citation time series data
  const getCitationTimeSeries = (llmClusterId?: string): CitationDataPoint[] => {
    if (!papersInfo || !llmClusterId) {
      // Return overall aggregated data
      return generateMonthlyData(Object.values(llmClusters).reduce((sum, c) => sum + c.size, 0));
    }

    const cluster = llmClusters[llmClusterId];
    if (!cluster) return [];

    return generateMonthlyData(cluster.size);
  };

  // Generate monthly data (simulated based on cluster size)
  const generateMonthlyData = (totalSize: number): CitationDataPoint[] => {
    const months = ['2022-01', '2022-04', '2022-07', '2022-10', '2023-01', '2023-04', '2023-07', '2023-10', '2024-01', '2024-04'];
    const baseValue = Math.floor(totalSize / 10);
    
    return months.map((month, index) => ({
      month,
      citations: baseValue + Math.floor((index / months.length) * totalSize)
    }));
  };

  // Get theory table data for a psychology cluster
  const getTheoryTableData = (psychClusterId: string): TheoryRow[] => {
    const clusterNum = getClusterNumber(psychClusterId);
    const clusterKey = `Cluster ${clusterNum}`;
    const clusterTheories = theoryPool[clusterKey];

    if (!clusterTheories) return [];

    const topTheories = getTopTheories(clusterTheories, 3);
    const topTheoryNames = new Set(topTheories.map(t => t.name));

    return Object.entries(clusterTheories).map(([theoryName, theoryData]) => ({
      subtopic: psychClusters[psychClusterId]?.topic.split(' ')[0] || 'General',
      theory: theoryName,
      citations: theoryData.citation,
      isTopThree: topTheoryNames.has(theoryName)
    })).sort((a, b) => b.citations - a.citations);
  };

  // Get theory distribution across LLM clusters
  const getTheoryDistribution = (theoryName: string): TheoryDistribution[] => {
    const distribution: TheoryDistribution[] = [];

    Object.entries(llmClusters).forEach(([key, cluster]) => {
      // Simulate distribution based on cluster size
      const citations = Math.floor(Math.random() * 40) + 10;
      distribution.push({
        topic: cluster.topic.split(' ').slice(0, 2).join(' '),
        citations
      });
    });

    return distribution;
  };

  return {
    loading,
    getBipartiteNodes,
    getBipartiteEdges,
    getCitationTimeSeries,
    getTheoryTableData,
    getTheoryDistribution,
    llmClusters,
    psychClusters,
    theoryPool
  };
}
