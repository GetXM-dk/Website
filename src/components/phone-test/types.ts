import { z } from "zod";

export type QuestionOption = {
  label: string;
  insight?: string;
};

export type Question = {
  id: "clinicType" | "whoAnswers" | "frequency" | "followup" | "painPoint";
  label: string;
  title: string;
  options: QuestionOption[];
};

export type QuizAnswers = Record<Question["id"], string>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(4, "Skriv dit for- og efternavn"),
  email: z.string().trim().email("Skriv en gyldig arbejdsmail"),
  phone: z.string()
    .trim()
    .min(8, "Skriv et gyldigt telefonnummer")
    .transform(v => v.replace(/\D/g, "")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du skal acceptere, at vi må kontakte dig om resultatet." }),
  }),
});

export type ContactForm = Omit<z.infer<typeof contactSchema>, "consent"> & {
  consent: boolean;
};

export const initialForm: ContactForm = {
  fullName: "",
  email: "",
  phone: "",
  consent: false,
};
