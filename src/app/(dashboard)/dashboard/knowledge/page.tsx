import { DashboardHeader } from "@/components/dashboard/header";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, Plus, Upload } from "lucide-react";

export const metadata = { title: "Knowledge Base" };

const documents = [
  { title: "Product FAQ.pdf", type: "PDF", status: "READY", size: "2.4 MB" },
  { title: "Pricing Guide.docx", type: "DOCX", status: "READY", size: "1.1 MB" },
  { title: "botflow.ink/docs", type: "URL", status: "PROCESSING", size: "—" },
];

export default function KnowledgePage() {
  return (
    <>
      <DashboardHeader title="Knowledge" />
      <div className="flex-1 p-6">
        <PageHeader
          title="AI Knowledge Base"
          description="Upload documents and URLs for AI to learn from."
          action={
            <Button>
              <Plus className="h-4 w-4" />
              New knowledge base
            </Button>
          }
        />

        <Card className="mb-8 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="font-medium">Drop files here or click to upload</p>
            <p className="mt-1 text-sm text-muted-foreground">
              PDF, DOCX or website URLs
            </p>
            <Button variant="outline" className="mt-4">
              Choose files
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  {doc.type === "URL" ? (
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} · {doc.size}
                    </p>
                  </div>
                </div>
                <Badge variant={doc.status === "READY" ? "success" : "warning"}>
                  {doc.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
