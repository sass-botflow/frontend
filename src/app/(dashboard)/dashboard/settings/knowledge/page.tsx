import { FileText, Globe, Plus, Upload } from "lucide-react";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsCardHeader,
  SettingsSection,
} from "@/components/settings/settings-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Knowledge Base · Settings" };

const pdfs = [
  { name: "Product Catalog 2026.pdf", size: "2.4 MB", pages: 48, status: "Indexed" },
  { name: "FAQ Document.pdf", size: "890 KB", pages: 12, status: "Indexed" },
];

const websites = [
  { url: "https://acme.com", pages: 24, lastCrawled: "2 hours ago", status: "Active" },
  { url: "https://acme.com/pricing", pages: 3, lastCrawled: "1 day ago", status: "Active" },
];

const documents = [
  { name: "Return Policy.docx", size: "124 KB", updated: "3 days ago" },
  { name: "Shipping Guidelines.docx", size: "89 KB", updated: "1 week ago" },
];

export default function KnowledgeSettingsPage() {
  return (
    <SettingsPageShell
      title="Knowledge Base"
      description="Train your AI with documents, PDFs, and website content."
    >
      <SettingsSection title="Uploaded PDFs">
        <SettingsCard>
          <SettingsCardHeader
            title="PDF documents"
            description="Upload PDFs for your AI to learn from"
          />
          <SettingsCardBody className="divide-y divide-border/40 p-0">
            {pdfs.map((pdf) => (
              <div
                key={pdf.name}
                className="flex items-center justify-between px-5 py-3.5 sm:px-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                    <FileText className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{pdf.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pdf.size} · {pdf.pages} pages
                    </p>
                  </div>
                </div>
                <Badge variant="success">{pdf.status}</Badge>
              </div>
            ))}
            <div className="px-5 py-4 sm:px-6">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4" />
                Upload PDF
              </Button>
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Website sources">
        <SettingsCard>
          <SettingsCardHeader
            title="Crawled websites"
            description="Pages your AI has learned from"
          />
          <SettingsCardBody className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="https://yourwebsite.com" className="pl-9" />
              </div>
              <Button>
                <Plus className="h-4 w-4" />
                Add website
              </Button>
            </div>
            <div className="divide-y divide-border/40 rounded-lg border border-border/40">
              {websites.map((site) => (
                <div
                  key={site.url}
                  className="flex items-center justify-between px-4 py-3.5"
                >
                  <div>
                    <p className="text-sm font-medium">{site.url}</p>
                    <p className="text-xs text-muted-foreground">
                      {site.pages} pages · Last crawled {site.lastCrawled}
                    </p>
                  </div>
                  <Badge variant="success">{site.status}</Badge>
                </div>
              ))}
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Documents">
        <SettingsCard>
          <SettingsCardHeader
            title="Word & text documents"
            description="DOCX, TXT, and Markdown files"
          />
          <SettingsCardBody className="divide-y divide-border/40 p-0">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between px-5 py-3.5 sm:px-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <FileText className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} · Updated {doc.updated}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            ))}
            <div className="px-5 py-4 sm:px-6">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4" />
                Upload document
              </Button>
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>
    </SettingsPageShell>
  );
}
