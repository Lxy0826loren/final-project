import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export interface BipartiteNode {
  id: string;
  label: string;
  type: 'llm' | 'psych';
  cluster: number;
  size: number;
}

export interface BipartiteEdge {
  source: string;
  target: string;
  weight: number;
}

interface BipartiteGraphProps {
  nodes: BipartiteNode[];
  edges: BipartiteEdge[];
  selectedLLMNode?: string | null;
  selectedPsychNode?: string | null;
  onLLMNodeClick?: (nodeId: string) => void;
  onPsychNodeClick?: (nodeId: string) => void;
}

export default function BipartiteGraph({
  nodes,
  edges,
  selectedLLMNode,
  selectedPsychNode,
  onLLMNodeClick,
  onPsychNodeClick,
}: BipartiteGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const llmNodes = nodes.filter(n => n.type === 'llm');
    const psychNodes = nodes.filter(n => n.type === 'psych');

    const llmColors = ['#c084fc', '#60a5fa', '#4ade80', '#fb923c', '#f87171', '#67e8f9', '#a78bfa', '#fbbf24'];
    const psychColors = ['#f87171', '#67e8f9', '#c084fc', '#fb923c', '#4ade80', '#60a5fa'];

    const g = svg.append('g');

    const llmY = height * 0.2;
    const psychY = height * 0.8;
    const margin = 60;

    const llmPositions = llmNodes.map((node, i) => ({
      id: node.id,
      x: margin + (i * (width - 2 * margin) / (llmNodes.length - 1)),
      y: llmY,
    }));

    const psychPositions = psychNodes.map((node, i) => ({
      id: node.id,
      x: margin + (i * (width - 2 * margin) / (psychNodes.length - 1)),
      y: psychY,
    }));

    const getNodePos = (id: string) => {
      return [...llmPositions, ...psychPositions].find(p => p.id === id)!;
    };

    const connectedNodes = new Set<string>();
    if (hoveredNode || selectedLLMNode || selectedPsychNode) {
      const activeNode = hoveredNode || selectedLLMNode || selectedPsychNode;
      edges.forEach(edge => {
        if (edge.source === activeNode) connectedNodes.add(edge.target);
        if (edge.target === activeNode) connectedNodes.add(edge.source);
      });
      if (activeNode) connectedNodes.add(activeNode);
    }

    const edgeOpacity = (edge: BipartiteEdge) => {
      if (!hoveredNode && !selectedLLMNode && !selectedPsychNode) return 0.3;
      if (hoveredNode && (edge.source === hoveredNode || edge.target === hoveredNode)) return 0.9;
      if (selectedLLMNode && (edge.source === selectedLLMNode || edge.target === selectedLLMNode)) return 0.7;
      if (selectedPsychNode && (edge.source === selectedPsychNode || edge.target === selectedPsychNode)) return 0.7;
      return 0.1;
    };

    g.selectAll('.edge')
      .data(edges)
      .join('path')
      .attr('class', 'edge')
      .attr('d', (d) => {
        const source = getNodePos(d.source);
        const target = getNodePos(d.target);
        const midY = (source.y + target.y) / 2;
        return `M ${source.x} ${source.y} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${target.y}`;
      })
      .attr('stroke', d => {
        const sourceNode = nodes.find(n => n.id === d.source)!;
        const targetNode = nodes.find(n => n.id === d.target)!;
        const sourceColor = sourceNode.type === 'llm' ? llmColors[sourceNode.cluster] : psychColors[sourceNode.cluster];
        const targetColor = targetNode.type === 'llm' ? llmColors[targetNode.cluster] : psychColors[targetNode.cluster];
        return `url(#gradient-${d.source}-${d.target})`;
      })
      .attr('stroke-width', d => 1 + (d.weight / 10))
      .attr('fill', 'none')
      .attr('opacity', edgeOpacity)
      .style('transition', 'opacity 0.3s');

    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source)!;
      const targetNode = nodes.find(n => n.id === edge.target)!;
      const sourceColor = sourceNode.type === 'llm' ? llmColors[sourceNode.cluster] : psychColors[sourceNode.cluster];
      const targetColor = targetNode.type === 'llm' ? llmColors[targetNode.cluster] : psychColors[targetNode.cluster];
      
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', `gradient-${edge.source}-${edge.target}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', getNodePos(edge.source).x)
        .attr('y1', getNodePos(edge.source).y)
        .attr('x2', getNodePos(edge.target).x)
        .attr('y2', getNodePos(edge.target).y);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', sourceColor);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', targetColor);
    });

    const nodeRadius = 10;

    llmPositions.forEach((pos, i) => {
      const node = llmNodes[i];
      const isActive = hoveredNode === node.id || selectedLLMNode === node.id || connectedNodes.has(node.id);
      const nodeOpacity = (!hoveredNode && !selectedLLMNode && !selectedPsychNode) ? 0.85 : (isActive ? 1 : 0.3);

      // Clickable area (larger invisible circle)
      g.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', nodeRadius * 2)
        .attr('fill', 'transparent')
        .attr('cursor', 'pointer')
        .attr('data-testid', `llm-node-${node.id}`)
        .on('mouseenter', function() {
          setHoveredNode(node.id);
          setTooltip({ x: pos.x, y: pos.y - 30, content: `${node.label} (${node.size} papers)` });
        })
        .on('mouseleave', function() {
          setHoveredNode(null);
          setTooltip(null);
        })
        .on('click', () => {
          onLLMNodeClick?.(node.id);
        });

      // Visual circle
      g.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', nodeRadius)
        .attr('fill', llmColors[node.cluster])
        .attr('opacity', nodeOpacity)
        .attr('stroke', 'hsl(var(--background))')
        .attr('stroke-width', selectedLLMNode === node.id ? 4 : 2)
        .attr('pointer-events', 'none')
        .style('transition', 'all 0.15s');

      g.append('text')
        .attr('x', pos.x)
        .attr('y', pos.y - nodeRadius - 8)
        .attr('text-anchor', 'middle')
        .attr('fill', 'hsl(var(--foreground))')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .attr('opacity', nodeOpacity)
        .attr('pointer-events', 'none')
        .text(node.label);
    });

    psychPositions.forEach((pos, i) => {
      const node = psychNodes[i];
      const isActive = hoveredNode === node.id || selectedPsychNode === node.id || connectedNodes.has(node.id);
      const nodeOpacity = (!hoveredNode && !selectedLLMNode && !selectedPsychNode) ? 0.85 : (isActive ? 1 : 0.3);

      // Clickable area (larger invisible circle)
      g.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', nodeRadius * 2)
        .attr('fill', 'transparent')
        .attr('cursor', 'pointer')
        .attr('data-testid', `psych-node-${node.id}`)
        .on('mouseenter', function() {
          setHoveredNode(node.id);
          setTooltip({ x: pos.x, y: pos.y + 30, content: `${node.label} (${node.size} papers)` });
        })
        .on('mouseleave', function() {
          setHoveredNode(null);
          setTooltip(null);
        })
        .on('click', () => {
          onPsychNodeClick?.(node.id);
        });

      // Visual circle
      g.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', nodeRadius)
        .attr('fill', psychColors[node.cluster])
        .attr('opacity', nodeOpacity)
        .attr('stroke', 'hsl(var(--background))')
        .attr('stroke-width', selectedPsychNode === node.id ? 4 : 2)
        .attr('pointer-events', 'none')
        .style('transition', 'all 0.15s');

      g.append('text')
        .attr('x', pos.x)
        .attr('y', pos.y + nodeRadius + 20)
        .attr('text-anchor', 'middle')
        .attr('fill', 'hsl(var(--foreground))')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .attr('opacity', nodeOpacity)
        .attr('pointer-events', 'none')
        .text(node.label);
    });

  }, [nodes, edges, hoveredNode, selectedLLMNode, selectedPsychNode]);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" data-testid="bipartite-graph" />
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-popover/95 backdrop-blur border border-popover-border text-popover-foreground px-3 py-2 rounded-md text-xs font-medium shadow-xl"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, 0)',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
