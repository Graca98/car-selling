import { defineField, defineType } from 'sanity'

export const carType = defineType({
  name: 'car', // Název schématu
  title: 'Auto', // Titulek pro administraci
  type: 'document', // Typ dokumentu
  fields: [
    defineField({
      name: 'name', // Název auta
      title: 'Název auta',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: 'description', // Popis auta
      title: 'Popis auta',
      type: 'text',
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'price', // Cena auta
      title: 'Cena',
      type: 'number',
      validation: (rule) => rule.required().positive().precision(2),
    }),
    defineField({
      name: 'year', // Rok výroby auta
      title: 'Rok výroby',
      type: 'number',
      validation: (rule) => rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'images', // Obrázky auta
      title: 'Obrázky auta',
      type: 'array',
      of: [
        defineField({
          name: 'image', // Povinné jméno pro každý obrázek
          type: 'image', // Typ obrázku
          options: {
            hotspot: true, // Možnost zaostření
          },
        }),
      ],
      validation: (rule) => rule.required().min(1), // Minimálně 1 obrázek
    }),
    defineField({
      name: 'mileage', // Počet najetých kilometrů
      title: 'Počet najetých kilometrů',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'engine', // Typ motoru
      title: 'Typ motoru',
      type: 'string',
      options: {
        list: [
          { title: 'Benzín', value: 'benzine' },
          { title: 'Nafta', value: 'diesel' },
          { title: 'Elektrický', value: 'electric' },
          { title: 'Hybridní', value: 'hybrid' },
        ],
      },
    }),
    defineField({
      name: 'status', // Stav auta
      title: 'Stav auta',
      type: 'string',
      options: {
        list: [
          { title: 'Nové', value: 'new' },
          { title: 'Použité', value: 'used' },
          { title: 'Zánovní', value: 'like-new' },
        ],
      },
    }),
    defineField({
      name: 'slug', // Slug pro SEO
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name', // Generování slug z názvu auta
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color', // Barva auta
      title: 'Barva auta',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(30),
    }),
    defineField({
      name: 'features', // Výbava auta
      title: 'Vybava auta',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1).max(10),
      options: {
        list: [
          { title: 'Klimatizace', value: 'climate' },
          { title: 'Navigace', value: 'navigation' },
          { title: 'Parkovací senzory', value: 'parking-sensors' },
          { title: 'Kožená sedadla', value: 'leather-seats' },
          { title: 'Bluetooth', value: 'bluetooth' },
          { title: 'Tempomat', value: 'cruise-control' },
          { title: 'Senzory tlaku v pneumatikách', value: 'tire-pressure-sensors' },
          { title: 'Sledování mrtvého úhlu', value: 'blind-spot-monitoring' },
          { title: 'Vyhřívaná sedadla', value: 'heated-seats' },
          { title: 'Střešní okno', value: 'sunroof' },
        ],
      },
    }),
    defineField({
      name: 'sold', // Pole pro označení prodaného auta
      title: 'Prodáno',
      type: 'boolean', // Typ pole je boolean (true/false)
      initialValue: false, // Výchozí hodnota je false
    }),
  ],
})
