import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Skal vi skifte telefonnummer?",
    a: "Nej. I beholder jeres eget nummer. GetXM aktiveres kun, når et opkald ikke bliver taget.",
  },
  {
    q: "Erstatter GetXM en receptionist?",
    a: "Nej. GetXM tager kun fat, når I ikke kan. Den følger op på ubesvarede opkald, så patienten ikke bliver efterladt uden svar.",
  },
  {
    q: "Hvordan håndteres patientdata?",
    a: "Beskeder bliver behandlet sikkert, og I bestemmer, hvad der må sendes. GetXM giver aldrig medicinske vurderinger.",
  },
  {
    q: "Hvad kræver det af os at komme i gang?",
    a: "Vi sætter det op for jer. I behøver ikke ændre arbejdsgang, system eller telefonnummer.",
  },
  {
    q: "Kan vi opsige når som helst?",
    a: "Ja. Der er ingen binding. I kan opsige løbende.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Ofte stillede spørgsmål
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;