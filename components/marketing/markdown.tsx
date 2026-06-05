/** Minimal, dependency-free Markdown-ish renderer for KB/blog bodies. */
export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: number) => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${key}`} className="my-3 list-disc space-y-1 pl-5 text-muted-foreground">
          {list.map((li, i) => <li key={i}>{li}</li>)}
        </ul>,
      );
      list = [];
    }
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (line.startsWith("## ")) { flushList(i); blocks.push(<h2 key={i} className="mt-8 text-2xl font-bold">{line.slice(3)}</h2>); }
    else if (line.startsWith("# ")) { flushList(i); blocks.push(<h1 key={i} className="mt-6 text-3xl font-bold">{line.slice(2)}</h1>); }
    else if (line.startsWith("- ")) { list.push(line.slice(2)); }
    else if (line === "") { flushList(i); }
    else { flushList(i); blocks.push(<p key={i} className="my-3 leading-relaxed text-muted-foreground">{line}</p>); }
  });
  flushList(lines.length);

  return <div className="text-[15px]">{blocks}</div>;
}
