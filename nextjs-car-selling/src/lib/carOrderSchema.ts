//? Zod schéma poptávky (validace polí, cross-field pravidla, export typů input/output).
// https://zod.dev/?id=validation
// https://react-hook-form.com/docs/useform#resolver
import { z } from "zod";

export const nameRegex = /^[A-Za-zÀ-ž' -]+$/u;
export const phoneRegex = /^[0-9+\s-]{9,18}$/;
export const currentYear = new Date().getFullYear();

export const CarOrderSchema = z.object({
  jmeno: z.string().min(2, "Zadej aspoň 2 znaky.").regex(nameRegex, "Jen písmena a základní znaky (mezera, -, ')."),
  prijmeni: z.string().min(2, "Zadej aspoň 2 znaky.").regex(nameRegex, "Jen písmena a základní znaky (mezera, -, ')."),
  telefon: z.string().min(9).max(18).regex(phoneRegex, "Telefon: číslice, mezery, + a -."),
  email: z.string().email("Zadej platný e-mail."),
  znacka: z.string().min(2, "Značka je povinná."),
  model: z.string().min(1, "Model je povinný."),

  // čísla bez coerce; čísla dodáme přes setValueAs ve formuláři
  najezdOd: z.number().int().min(0, "Min 0 km").max(800_000, "Max 800 000 km"),
  najezdDo: z.number().int().min(0, "Min 0 km").max(800_000, "Max 800 000 km"),
  rokOd: z.number().int().min(1990, "Min 1990").max(currentYear, `Max ${currentYear}`),
  rokDo: z.number().int().min(1990, "Min 1990").max(currentYear, `Max ${currentYear}`),

  // default("") => na VSTUPU je to volitelné (optional), na VÝSTUPU vždy string ""
  preference: z.string().max(2000, "Max 2000 znaků.").default(""),
  hp: z.string().default(""),
})
.refine(d => d.najezdOd <= d.najezdDo, { path: ["najezdDo"], message: "Nájezd „od“ nesmí být větší než „do“." })
.refine(d => d.rokOd <= d.rokDo, { path: ["rokDo"], message: "Rok „od“ nesmí být větší než „do“." });

export type CarOrderInput = z.input<typeof CarOrderSchema>;   // vstup (preference?, hp?)
export type CarOrder = z.output<typeof CarOrderSchema>;        // výstup (preference, hp povinné)
export const { } = {};
