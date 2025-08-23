// /schemas/car.ts
import { defineType, defineField } from "sanity"

export const carType = defineType({
  name: "car",
  title: "Auta",
  type: "document",

  fields: [
    // Základ (bez duplicitního 'name')
    defineField({ name: "brand", title: "Značka", type: "string", validation: R => R.required() }),
    defineField({ name: "model", title: "Model", type: "string", validation: R => R.required() }),

    defineField({
      name: "vin",
      title: "VIN",
      type: "string",
      description: "17 znaků bez I/O/Q. Posledních 6 znaků pomáhá odlišit stejné názvy.",
      validation: R => R.regex(/^[A-HJ-NPR-Z0-9]{17}$/i, { name: "VIN" }).warning("VIN má mít 17 znaků"),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL identifikátor. Generuje se automaticky ze značky, modelu, roku a (pokud je) posledních 6 znaků VIN.",
      options: {
        // Sestavíme čitelný zdroj pro slug (včetně VIN, pokud je)
        source: (doc) =>
          [doc.brand, doc.model, doc.year, doc.vin ? String(doc.vin).slice(-6) : null]
            .filter(Boolean)
            .join(" "),
        maxLength: 96,
        // sjednocené slugování (bez diakritiky, malé znaky, '-')
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 96),
        // kontrola unikátnosti (defaultní kontrola proti celé kolekci)
        isUnique: (slug, ctx) => ctx.defaultIsUnique(slug, ctx),
      },
      validation: R => R.required(),
    }),

    defineField({
      name: "status",
      title: "Stav nabídky",
      type: "string",
      initialValue: "available",
      options: {
        list: [
          { title: "Na prodej", value: "available" },
          { title: "Rezervováno", value: "reserved" },
          { title: "Prodáno", value: "sold" },
        ],
        layout: "radio",
      },
      validation: R => R.required(),
    }),

    // Parametry pro filtraci
    defineField({ name: "price", title: "Cena (Kč)", type: "number" }),
    defineField({ name: "mileage", title: "Nájezd (km)", type: "number" }),
    defineField({ name: "year", title: "Rok výroby", type: "number" }),
    defineField({
      name: "fuel",
      title: "Palivo",
      type: "string",
      options: { list: ["benzín", "diesel", "hybrid", "elektro", "LPG", "CNG"] },
    }),
    defineField({
      name: "transmission",
      title: "Převodovka",
      type: "string",
      options: { list: ["manuální", "automatická"] },
    }),
    defineField({
      name: "drivetrain",
      title: "Pohon",
      type: "string",
      options: { list: ["FWD", "RWD", "AWD", "4x4"] },
    }),
    defineField({
      name: "bodyType",
      title: "Karoserie",
      type: "string",
      options: { list: ["hatchback", "kombi", "sedan", "SUV", "MPV", "kupé", "kabriolet"] },
    }),
    defineField({ name: "color", title: "Barva", type: "string" }),
    defineField({ name: "doors", title: "Počet dveří", type: "number" }),
    defineField({ name: "seats", title: "Počet míst", type: "number" }),

    // Původ / vlastnictví
    defineField({ name: "ownersCount", title: "Počet majitelů", type: "number" }),
    defineField({
      name: "origin",
      title: "Původ",
      type: "string",
      options: { list: ["ČR", "DE", "AT", "IT", "FR", "NL", "PL", "jiné"] },
    }),
    defineField({ name: "serviceBook", title: "Servisní knížka", type: "boolean" }),
    defineField({ name: "accidentFree", title: "Nehavarované", type: "boolean" }),
    defineField({ name: "nonSmoker", title: "Nekuřácké", type: "boolean" }),

    // DPH
    defineField({ name: "vatIncluded", title: "Cena vč. DPH", type: "boolean" }),
    defineField({ name: "vatDeductible", title: "Odpočet DPH", type: "boolean" }),

    // Umístění
    defineField({ name: "location", title: "Lokalita (město)", type: "string" }),

    // Výbava
    defineField({
      name: "features",
      title: "Výbava (štítky)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Napiš jednu výbavu (např.: 4x4) a klikni na enter. Potom napiš další a zopakuj",
    }),
    defineField({
      name: "equipmentText",
      title: "Popis výbavy (text)",
      type: "text",
      rows: 3,
      description: "Krátký popis výbavy pro detail vozu. Na kartě se může zkrátit a ukázat v tooltipu.",
    }),

    // Obrázky
    defineField({
      name: "mainImage",
      title: "Hlavní fotka",
      type: "image",
      options: { hotspot: true },
      description: "Použije se v kartách, náhledech a jako výchozí pro sdílení.",
      validation: R => R.required().error("Hlavní fotka je povinná."),
    }),
    defineField({
      name: "gallery",
      title: "Galerie (volitelné)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      // bez povinného minima
    }),

    // Publikace + SEO
    defineField({
      name: "publishedAt",
      title: "Datum zveřejnění",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          title: "SEO Title",
          type: "string",
          description: "Krátký titulek do výsledků vyhledávání (doporučeno 50–60 znaků). Příklad: 'BMW X5 xDrive30d, 2017, servisní knížka, automat' ",
          validation: R => R.max(60).warning("Drž se ideálně do 60 znaků."),
        },
        {
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 2,
          description: "Stručný popis pro vyhledávače a sdílení (doporučeno do 160 znaků). Příklad: 'X5 xDrive30d, 2017, AWD, 178 000 km. Bohatá výbava, pravidelný servis, nekuřácké. Financování a protiúčet možné.'",
          validation: R => R.max(160).warning("Drž se ideálně do 160 znaků."),
        },
        {
          name: "openGraphImage",
          title: "OpenGraph obrázek",
          type: "image",
          options: { hotspot: true },
          description: "Obrázek pro sdílení na sociálních sítích (FB/WhatsApp/X). Doporučeno 1200×630 px.",
        },
      ],
    }),

    // Příznak
    defineField({
      name: "featured",
      title: "Zvýrazněné",
      type: "boolean",
      description: "Propagovat auto nahoře v seznamu a zvýraznit na webu.",
    }),
  ],

  // Náhled v Desk: fotka + Značka Model • Rok • Cena
  preview: {
    select: {
      brand: "brand",
      model: "model",
      year: "year",
      price: "price",
      media: "mainImage",
    },
    prepare({ brand, model, year, price, media }) {
      const title = [brand, model].filter(Boolean).join(" ") || "Auto"
      const subtitle = [year, price != null ? `${price} Kč` : null].filter(Boolean).join(" • ")
      return { title, subtitle, media }
    },
  },

  // (volitelně) orderings, pokud ještě nemáš přidané
  orderings: [
    { name: "recent", title: "Naposledy upravené (nejnovější)", by: [{ field: "_updatedAt", direction: "desc" }] },
    { name: "publishedAtDesc", title: "Zveřejněno ↓ (nejnovější)", by: [{ field: "publishedAt", direction: "desc" }] },
    { name: "publishedAtAsc", title: "Zveřejněno ↑ (nejstarší)", by: [{ field: "publishedAt", direction: "asc" }] },
    { name: "priceAsc", title: "Cena ↑", by: [{ field: "price", direction: "asc" }] },
    { name: "priceDesc", title: "Cena ↓", by: [{ field: "price", direction: "desc" }] },
    { name: "yearDesc", title: "Rok výroby ↓", by: [{ field: "year", direction: "desc" }] },
    { name: "yearAsc", title: "Rok výroby ↑", by: [{ field: "year", direction: "asc" }] },
    { name: "mileageAsc", title: "Nájezd ↑", by: [{ field: "mileage", direction: "asc" }] },
    { name: "mileageDesc", title: "Nájezd ↓", by: [{ field: "mileage", direction: "desc" }] },
    {
      name: "brandModelAsc",
      title: "Značka / Model A–Z",
      by: [
        { field: "brand", direction: "asc" },
        { field: "model", direction: "asc" },
        { field: "year", direction: "desc" },
      ],
    },
  ],
})
