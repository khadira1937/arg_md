import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/ui";

export default async function AdminContentPage() {
  await requireStaff();
  const [posts, articles, announcements] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.knowledgeBaseArticle.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } }),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader title="Content" description="Blog posts, knowledge base and announcements." />

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Blog posts ({posts.length})</h2>
        <div className="space-y-2">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <Link href={`/blog/${p.slug}`} className="font-medium hover:text-primary">{p.title}</Link>
              <Badge variant={p.published ? "success" : "muted"}>{p.published ? "Published" : "Draft"}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Knowledge base ({articles.length})</h2>
        <div className="space-y-2">
          {articles.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <Link href={`/knowledge-base/${a.slug}`} className="font-medium hover:text-primary">{a.title}</Link>
              <span className="text-xs text-muted-foreground">{a.category.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Announcements ({announcements.length})</h2>
        <div className="space-y-2">
          {announcements.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
              <span className="font-medium">{a.title}</span>
              <Badge variant={a.level === "CRITICAL" ? "destructive" : a.level === "WARNING" ? "warning" : "muted"}>{a.level}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
