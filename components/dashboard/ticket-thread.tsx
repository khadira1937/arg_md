import { cn } from "@/lib/utils";

type Message = {
  id: string;
  body: string;
  isStaff: boolean;
  createdAt: Date;
  author: { name: string | null; email: string };
};

export function TicketThread({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m.id} className={cn("flex", m.isStaff ? "justify-start" : "justify-end")}>
          <div className={cn("max-w-[80%] rounded-2xl px-4 py-3", m.isStaff ? "bg-muted" : "bg-primary/10")}>
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{m.author.name ?? m.author.email}</span>
              {m.isStaff && <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">STAFF</span>}
              <span>· {m.createdAt.toLocaleString()}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
