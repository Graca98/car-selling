// nextjs-car-selling/lib/queries.ts
import { client } from "@/lib/sanity"

export type FilterParams = {
  q?: string
  fuel?: string
  priceMin?: string
  priceMax?: string
  yearFrom?: string
  yearTo?: string
}

export async function getCars(params: FilterParams) {
  // převod čísel na čísla až tady (server-safe)
  const priceMinNum = params.priceMin ? Number(params.priceMin) : undefined
  const priceMaxNum = params.priceMax ? Number(params.priceMax) : undefined
  const yearFromNum = params.yearFrom ? Number(params.yearFrom) : undefined
  const yearToNum = params.yearTo ? Number(params.yearTo) : undefined

  const query = `*[_type == "car"
    && (!defined($q) || title match $q || seller.name match $q || features[] match $q)
    && (!defined($fuel) || fuel == $fuel)
    && (!defined($priceMin) || price >= $priceMin)
    && (!defined($priceMax) || price <= $priceMax)
    && (!defined($yearFrom) || year >= $yearFrom)
    && (!defined($yearTo) || year <= $yearTo)
  ] | order(publishedAt desc){
    _id, title, slug, price, year, mileage, fuel, gearbox, powerKw, body, color, location,
    "images": images[].asset->url
  }`

  return client.fetch(query, {
    q: params.q?.trim() ? `*${params.q.trim()}*` : undefined,
    fuel: params.fuel || undefined,
    priceMin: priceMinNum,
    priceMax: priceMaxNum,
    yearFrom: yearFromNum,
    yearTo: yearToNum,
  })
}
