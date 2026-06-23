"use client";

import { useCallback } from "react";
import Link from "next/link";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ArrowLeft, Save } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WORKFLOW_NODES } from "@/lib/constants";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "default",
    position: { x: 100, y: 100 },
    data: { label: "Message Received" },
    style: { background: "#6366f1", color: "#fff", border: "none", borderRadius: 12, padding: 12 },
  },
  {
    id: "2",
    type: "default",
    position: { x: 350, y: 80 },
    data: { label: "AI Response" },
    style: { background: "#a855f7", color: "#fff", border: "none", borderRadius: 12, padding: 12 },
  },
  {
    id: "3",
    type: "default",
    position: { x: 350, y: 200 },
    data: { label: "Lead Capture" },
    style: { background: "#10b981", color: "#fff", border: "none", borderRadius: 12, padding: 12 },
  },
  {
    id: "4",
    type: "default",
    position: { x: 600, y: 140 },
    data: { label: "Human Handoff" },
    style: { background: "#ef4444", color: "#fff", border: "none", borderRadius: 12, padding: 12 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
];

export default function BotBuilderPage() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <>
      <DashboardHeader title="Agent Builder" />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-border bg-sidebar p-4">
          <Button variant="ghost" size="sm" className="mb-4 w-full justify-start" asChild>
            <Link href="/dashboard/bots">
              <ArrowLeft className="h-4 w-4" />
              Back to agents
            </Link>
          </Button>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Nodes
          </p>
          <div className="space-y-2">
            {WORKFLOW_NODES.map((node) => (
              <div
                key={node.type}
                className="cursor-grab rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40"
                style={{ borderLeftColor: node.color, borderLeftWidth: 3 }}
              >
                {node.label}
              </div>
            ))}
          </div>
        </aside>

        <div className="relative flex-1">
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
            <Badge variant="success">ACTIVE</Badge>
            <Button size="sm">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-background"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </>
  );
}
