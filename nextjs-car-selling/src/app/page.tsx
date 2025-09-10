// src/app/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { EquipmentTooltip } from "@/components/EquipmentTooltip";
import FilterForm from "@/components/FilterForm";
import { FilterChips } from "@/components/filters/FilterChips";
import FiltersHeader from "@/components/filters/FiltersHeader";

import type { CarDoc, ImageRef } from "@/types/car";

type SearchParams = {
  q?: string;
  fuel?: string;
  gearbox?: string;
  priceMin?: string;
  priceMax?: string;
  yearFrom?: string;
  yearTo?: string;
};

const { projectId, dataset } = client.config();
const urlFor = (source: ImageRef) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const fetchOpts = { cache: "no-store" as const };

// paliva pro Select (z dat)
const FUELS_QUERY = `array::unique(*[_type == "car" && defined(fuel)].fuel) | order(@ asc)`;

// PŮVODNÍ dotaz na auta (jen filtry)
const CARS_QUERY = `
*[
  _type == "car"
  && defined(slug.current)
  && status in ["available","reserved"]
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
  _id, brand, model, slug, price, mileage, year, fuel, drivetrain,
  mainImage, equipmentText, features, status, featured
}
`;

async function fetchFuelOptions(): Promise<string[]> {
  const fuels = await client.fetch<string[]>(FUELS_QUERY, {}, fetchOpts);
  return fuels?.map((f) => String(f).trim().toLowerCase()).filter(Boolean).sort() ?? [];
}

async function fetchCars(sp: SearchParams): Promise<CarDoc[]> {
  const q        = sp.q?.trim() ? `*${sp.q.trim()}*` : null;
  const fuelPat  = sp.fuel?.trim() ? `*${sp.fuel.trim().toLowerCase()}*` : null;
  const gearbox  = sp.gearbox?.trim() ? sp.gearbox.trim().toLowerCase() : null;
  const priceMin = sp.priceMin ? Number(sp.priceMin) : null;
  const priceMax = sp.priceMax ? Number(sp.priceMax) : null;
  const yearFrom = sp.yearFrom ? Number(sp.yearFrom) : null;
  const yearTo   = sp.yearTo   ? Number(sp.yearTo)   : null;

  return client.fetch<CarDoc[]>(
    CARS_QUERY,
    { q, fuelPat, gearbox, priceMin, priceMax, yearFrom, yearTo },
    fetchOpts
  );
}

export default async function Page({
  searchParams,
}: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const [cars, fuelOptions] = await Promise.all([fetchCars(sp), fetchFuelOptions()]);

  return (
    <main className="relative">
      {/* cap: max 5 karet vedle sebe (5×16rem + 4×1.5rem gap) */}
      <div
        className="mx-auto w-full
        max-w-[min(90rem,calc(5*16rem+4*1.5rem))]
        px-4 sm:px-6 lg:px-8 py-16 pt-24"
      >
        <FiltersHeader count={cars.length} initialFilters={sp} fuelOptions={fuelOptions} />

        <div className="grid xl:grid-cols-[18rem_1fr] gap-6 items-start">
          {/* Sidebar s filtry (jen PC) */}
          <aside className="hidden xl:block w-72 shrink-0">
            <div className="rounded-2xl border p-4 sticky top-24">
              <FilterForm initialFilters={sp} fuelOptions={fuelOptions} />
            </div>
          </aside>

          {/* Nabídka vozů */}
          <section>
            <FilterChips />

            {/* >>> KLÍČ: mobil může růst (1fr), na md+ fix 16rem → nikdy se nepřetáhne <<< */}
            <ul
              className="
                grid gap-6
                grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]      /* telefon – kartu pustím do šířky */
                md:grid-cols-[repeat(auto-fill,minmax(16rem,16rem))]  /* tablet/pc – pevná šířka karty */
                justify-start
              "
            >
              {cars.map((car) => {
                const title =
                  [car.brand, car.model].filter(Boolean).join(" ") +
                  (car.year ? `, ${car.year}` : "");
                const imgUrl = car.mainImage
                  ? urlFor(car.mainImage as ImageRef)?.width(800).height(450).url()
                  : null;

                return (
                  <li key={car._id} className="md:w-[16rem]">
                    <Link href={`/${car.slug.current}`} className="group block">
                      {/* TVÁ PŮVODNÍ KARTA – beze změny vzhledu */}
                      <article className="h-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                        {/* Obrázek + floating badge */}
                        <div className="relative">
                          {imgUrl && (
                            <img
                              src={imgUrl}
                              alt={title || "Auto"}
                              className="aspect-[16/9] w-full rounded-xl object-cover"
                              width={800}
                              height={450}
                            />
                          )}

                          <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                            {car.status === "reserved" && (
                              <Badge className="rounded-md bg-amber-500 text-white shadow-md">
                                Rezervováno
                              </Badge>
                            )}
                            {car.featured && (
                              <Badge className="rounded-md bg-violet-600 text-white shadow-md">
                                Top nabídka
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Textová část – přesně jako dřív */}
                        <div className="mt-4">
                          <h2 className="text-lg md:text-xl font-semibold leading-snug group-hover:underline">
                            {title || "Auto bez názvu"}
                          </h2>

                          <EquipmentTooltip
                            text={
                              car.equipmentText ??
                              "Krátký popis výbavy – automat, 4x4, kožené sedačky…"
                            }
                          />

                          {/* Štítky (palivo, náhon, nájezd, rok) – původní obsah i styly */}
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {car.fuel && (
                              <span className="rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                                {String(car.fuel)}
                              </span>
                            )}
                            {car.drivetrain && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {car.drivetrain}
                              </span>
                            )}
                            {typeof car.mileage === "number" && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {car.mileage.toLocaleString("cs-CZ")} km
                              </span>
                            )}
                            {typeof car.year === "number" && (
                              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                                {car.year}
                              </span>
                            )}
                          </div>

                          <Separator className="mt-6" />

                          {/* Cena vlevo / částka vpravo */}
                          {typeof car.price === "number" ? (
                            <div className="mt-3 text-base flex items-baseline justify-between">
                              <span>Cena</span>
                              <span className="whitespace-nowrap font-semibold">
                                {car.price.toLocaleString("cs-CZ")} Kč
                              </span>
                            </div>
                          ) : (
                            <p className="mt-3 text-base font-semibold">Cena není uvedena</p>
                          )}
                        </div>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {cars.length === 0 && (
              <p className="mt-10 text-sm text-gray-500">
                Nenalezeny žádné inzeráty dle zadaných filtrů.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
