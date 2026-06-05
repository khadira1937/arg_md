import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo";

export type Faq = { question: string; answer: string };

export function FaqSection({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  if (!faqs?.length) return null;
  return (
    <div className="mx-auto max-w-3xl">
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{f.question}</AccordionTrigger>
            <AccordionContent>{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
