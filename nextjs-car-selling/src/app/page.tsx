import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

import { EquipmentTooltip } from "@/components/EquipmentTooltip"
import { Separator } from "@/components/ui/separator"

// Dotaz pro auta
const CARS_QUERY = `*[_type == "car" && defined(slug.current)]|order(publishedAt desc)[0...12]{_id, name, slug, price, engine, mileage, year, images}`;

const { projectId, dataset } = client.config();
const urlFor = (source: { asset: { _ref: string } }) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source) // Vytvoření URL pro obrázek
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const cars = await client.fetch<SanityDocument[]>(CARS_QUERY, {}, options)

  return (
    <main className="relative">
      {/* Kontejner – centrování a horizontální odsazení */}
      <div
        className="mx-auto w-full
        max-w-[min(90rem,calc(5*16rem+4*1.5rem))]  /* cap: max 5 sloupců (5× karta + 4× gap) */
        px-4 sm:px-6 lg:px-8 py-16 pt-24"
      >
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-8">
          Vozidla na prodej
        </h1>

        <ul
          className="grid gap-6
          grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]  /* fluidní zalamování */
        "
        >
          {cars.map((car) => {
            const carImageUrl = car?.images?.[0]
              ? urlFor(car.images[0])?.width(800).height(450).url()
              : null;

            return (
              <li key={car._id}>
                <Link href={`/${car.slug.current}`} className="group block">
                  <article className="h-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                    {/* Obrázek */}
                    {carImageUrl && (
                      <img
                        src={carImageUrl}
                        alt={car.name || "Auto bez názvu"}
                        className="aspect-[16/9] w-full rounded-xl object-cover"
                        width={800}
                        height={450}
                      />
                    )}

                    {/* Textová část */}
                    <div className="mt-4">
                      <h2 className="text-lg md:text-xl font-semibold leading-snug group-hover:underline">
                        {car.name || "Auto bez názvu"}
                      </h2>

                      {/* Krátky popisek */}
                      <EquipmentTooltip text={car.equipment ?? "hlavní výbava, 4x4, Automat, kožené sedačky, vyhřivané sedačky"} />

                      {/* Štítky */}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                          {car.engine || "neuvedeno"}
                        </span>
                        {car.mileage && (
                          <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                            {car.mileage.toLocaleString?.("cs-CZ") ??
                              car.mileage}{" "}
                            km
                          </span>
                        )}
                        {car.year && (
                          <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                            {car.year}
                          </span>
                        )}
                      </div>

                      <Separator className="mt-6" />

                      {/* Cena */}
                      {car.price ? (
                        <div className="mt-3 text-base flex items-baseline justify-between">
                          <span>Cena</span>
                          <span className="whitespace-nowrap font-semibold">{car.price} Kč</span>
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
      </div>
      <footer
        className="hidden mx-auto w-full
        px-4 sm:px-6 lg:px-8 py-16 pt-24"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
          facilis commodi distinctio culpa, aliquam dolor beatae quibusdam
          corporis accusamus natus nemo cupiditate! Quam reiciendis incidunt
          consequatur aspernatur assumenda qui.
        </p>
      </footer>
    </main>
  );
}

