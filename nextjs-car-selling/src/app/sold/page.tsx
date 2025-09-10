// dynamika = žádná cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link"
import { SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import FiltersShell from "@/components/filters/FiltersShell"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type SearchParams = {
  q?: string
  fuel?: string
  gearbox?: string
  priceMin?: string
  priceMax?: string
  yearFrom?: string
  yearTo?: string
}

const { projectId, dataset } = client.config()
const urlFor = (source: { asset: { _ref: string } }) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null

const fetchOpts = { cache: "no-store" as const }

// paliva pro Select (z dat)
const FUELS_QUERY = `array::unique(*[_type == "car" && defined(fuel)].fuel) | order(@ asc)`

const CARS_QUERY = `
*[
  _type == "car"
  && defined(slug.current)
  && status in ["sold"]
  && defined(brand) && brand != ""
  && defined(model) && model != ""
  && defined(mainImage)
  && (!($q != null) || brand match $q || model match $q || equipmentText match $q || features[] match $q)
  && (!($fuelPat != null) || lower(string(fuel)) match $fuelPat)
  && (!($gearbox != null) || lower(string(gearbox)) == $gearbox)
  && (!($priceMin != null) || price >= $priceMin)
  && (!($priceMax != null) || price <= $priceMax)
  && (!($yearFrom != null) || year >= $yearFrom)
  && (!($yearTo != null) || year <= $yearTo)
]|order(publishedAt desc)[0...120]{
  _id, brand, model, slug, price, mileage, year, fuel, drivetrain, gearbox,
  engine, engineSize, engineLiters,
  mainImage, equipmentText, features, status, featured
}
`

async function fetchFuelOptions() {
  const fuels = await client.fetch<string[]>(FUELS_QUERY, {}, fetchOpts)
  return fuels?.map((f) => String(f).trim().toLowerCase()).filter(Boolean).sort() ?? []
}

async function fetchCars(sp: SearchParams) {
  const q        = sp.q?.trim() ? `*${sp.q.trim()}*` : null
  const fuelPat  = sp.fuel?.trim() ? `*${sp.fuel.trim().toLowerCase()}*` : null
  const gearbox  = sp.gearbox?.trim() ? sp.gearbox.trim().toLowerCase() : null
  const priceMin = sp.priceMin ? Number(sp.priceMin) : null
  const priceMax = sp.priceMax ? Number(sp.priceMax) : null
  const yearFrom = sp.yearFrom ? Number(sp.yearFrom) : null
  const yearTo   = sp.yearTo   ? Number(sp.yearTo)   : null

  return client.fetch<SanityDocument[]>(
    CARS_QUERY,
    { q, fuelPat, gearbox, priceMin, priceMax, yearFrom, yearTo },
    fetchOpts
  )
}

// Next 15 – searchParams je Promise
export default async function IndexPage({
  searchParams,
}: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const [cars, fuelOptions] = await Promise.all([fetchCars(sp), fetchFuelOptions()])

  return (
    <main className="relative">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* hlavička */}
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Naše vozy</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{cars.length} vozů v nabídce</span>
            {/* tlačítko Filtry pro PC – otevře drawer (sidebar je přitom vidět) */}
            {/* Pokud chceš jen na mobilu, obal to className="xl:hidden" */}
          </div>
        </div>

        {/* layout: sidebar + obsah */}
        <div className="grid xl:grid-cols-[18rem_1fr] gap-6">
          <FiltersShell initialFilters={sp} fuelOptions={fuelOptions} />

          {/* GRID KARET – 1/3/5 sloupců (mobil/tablet/PC) */}
          <section>
            <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {cars.map((car) => {
                const title = [car.brand, car.model].filter(Boolean).join(" ") + (car.year ? `, ${car.year}` : "")
                const img = car?.mainImage ? urlFor(car.mainImage)?.width(800).height(450).url() : null

                const gearboxLabel =
                  (car.gearbox && String(car.gearbox).toLowerCase() === "automatic" && "Automat") ||
                  (car.gearbox && String(car.gearbox).toLowerCase() === "manual" && "Manuál") ||
                  car.gearbox

                const engineLabel =
                  car.engine ?? car.engineSize ?? (car.engineLiters ? `${car.engineLiters} l` : undefined)

                return (
                  <li key={car._id}>
                    <Link href={`/${car.slug.current}`} className="group block">
                      <article className="h-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                        <div className="relative">
                          {img && (
                            <img
                              src={img}
                              alt={title || "Auto"}
                              className="aspect-[16/9] w-full rounded-xl object-cover"
                              width={800}
                              height={450}
                            />
                          )}
                          <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                            {car.status === "reserved" && (
                              <Badge className="rounded-md bg-amber-500 text-white shadow-md">Rezervováno</Badge>
                            )}
                            {car.featured && (
                              <Badge className="rounded-md bg-violet-600 text-white shadow-md">Top nabídka</Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <h2 className="text-lg md:text-xl font-semibold leading-snug group-hover:underline">
                            {title || "Auto bez názvu"}
                          </h2>

                          {/* volitelný text (oddělený čárkami) – necháváme */}
                          {car.equipmentText && (
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{car.equipmentText}</p>
                          )}

                          {/* Štítky: km, převodovka, palivo, motor */}
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {car.mileage != null && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {Number(car.mileage).toLocaleString("cs-CZ")} km
                              </span>
                            )}
                            {gearboxLabel && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {gearboxLabel}
                              </span>
                            )}
                            {car.fuel && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {car.fuel}
                              </span>
                            )}
                            {engineLabel && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {engineLabel}
                              </span>
                            )}
                          </div>

                          <Separator className="mt-6" />

                          {car.price != null ? (
                            <div className="mt-3 text-base flex items-baseline justify-between">
                              <span>Cena</span>
                              <span className="whitespace-nowrap font-semibold">
                                {Number(car.price).toLocaleString("cs-CZ")} Kč
                              </span>
                            </div>
                          ) : (
                            <p className="mt-3 text-base font-semibold">Cena není uvedena</p>
                          )}
                        </div>
                      </article>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {cars.length === 0 && (
              <p className="mt-10 text-sm text-gray-500">Nenalezeny žádné inzeráty dle zadaných filtrů.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
