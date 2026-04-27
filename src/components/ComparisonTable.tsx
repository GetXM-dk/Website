import { Check, X, Minus } from "lucide-react";

const rows: Array<{
  label: string;
  getxm: "yes" | "no" | "partial";
  callcenter: "yes" | "no" | "partial";
  ai: "yes" | "no" | "partial";
  note?: string;
}> = [
  { label: "I beholder jeres eget nummer", getxm: "yes", callcenter: "partial", ai: "yes" },
  { label: "Følger op via SMS — ingen ventetid", getxm: "yes", callcenter: "no", ai: "partial" },
  { label: "Klinikken bestemmer tone og indhold", getxm: "yes", callcenter: "partial", ai: "no" },
  { label: "Svarer aldrig på medicinske spørgsmål", getxm: "yes", callcenter: "yes", ai: "no" },
  { label: "Samler info, så I kan handle hurtigt", getxm: "yes", callcenter: "partial", ai: "partial" },
  { label: "Fast lav månedspris", getxm: "yes", callcenter: "no", ai: "no" },
];

const Cell = ({ value }: { value: "yes" | "no" | "partial" }) => {
  if (value === "yes") return <Check className="mx-auto h-5 w-5 text-accent" />;
  if (value === "no") return <X className="mx-auto h-5 w-5 text-muted-foreground/60" />;
  return <Minus className="mx-auto h-5 w-5 text-muted-foreground/60" />;
};

const ComparisonTable = () => {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Sådan er vi anderledes</h2>
          <p className="mt-3 text-muted-foreground">
            GetXM løser én ting — opfølgning på ubesvarede opkald — og gør det roligt og klinik­venligt.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                <th className="px-6 py-4 text-left font-semibold text-foreground">&nbsp;</th>
                <th className="px-4 py-4 text-center font-semibold text-foreground">GetXM</th>
                <th className="px-4 py-4 text-center font-medium text-muted-foreground">Callcenter</th>
                <th className="px-4 py-4 text-center font-medium text-muted-foreground">AI-receptionist</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-secondary/20" : ""}>
                  <td className="px-6 py-4 text-left text-foreground">{row.label}</td>
                  <td className="px-4 py-4 text-center"><Cell value={row.getxm} /></td>
                  <td className="px-4 py-4 text-center"><Cell value={row.callcenter} /></td>
                  <td className="px-4 py-4 text-center"><Cell value={row.ai} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;