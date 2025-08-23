import Link from "next/link"
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityDocument } from "next-sanity"

import { EquipmentTooltip } from "@/components/EquipmentTooltip"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const SOLD_CARS_QUERY = `
*[_type == "car" && defined(slug.current) && status == "sold"]
| order(publishedAt desc)[0...24]{
  _id,
  brand,
  model,
  slug,
  price,
  mileage,
  year,
  fuel,
  drivetrain,
  mainImage,
  equipmentText
}
`

const { projectId, dataset } = client.config()
const urlFor = (source: { asset: { _ref: string } }) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null

const options = { next: { revalidate: 30 } }

export default async function SoldPage() {
  const cars = await client.fetch<SanityDocument[]>(SOLD_CARS_QUERY, {}, options)

  return (
    <main className="relative">
      <div
        className="mx-auto w-full
        max-w-[min(90rem,calc(5*16rem+4*1.5rem))]
        px-4 sm:px-6 lg:px-8 py-16 pt-24"
      >
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-8">
          Prodáno
        </h1>

        <ul className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {cars.map((car) => {
            const title =
              [car.brand, car.model].filter(Boolean).join(" ") +
              (car.year ? `, ${car.year}` : "")

            const carImageUrl = car?.mainImage
              ? urlFor(car.mainImage)?.width(800).height(450).url()
              : null

            return (
              <li key={car._id}>
                <Link href={`/${car.slug.current}`} className="group block">
                  <article className="h-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                    {/* Obrázek + floating "Prodáno" */}
                    <div className="relative">
                      {carImageUrl && (
                        <img
                          src={carImageUrl}
                          alt={title || "Auto"}
                          className="aspect-[16/9] w-full rounded-xl object-cover"
                          width={800}
                          height={450}
                        />
                      )}
                      <Badge
                        variant="destructive"
                        className="pointer-events-none absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide shadow-md"
                      >
                        Prodáno
                      </Badge>
                    </div>

                    {/* Textová část */}
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

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {car.fuel && (
                          <span className="rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                            {car.fuel}
                          </span>
                        )}
                        {car.drivetrain && (
                          <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                            {car.drivetrain}
                          </span>
                        )}
                        {car.mileage != null && (
                          <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                            {car.mileage} km
                          </span>
                        )}
                        {car.year && (
                          <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                            {car.year}
                          </span>
                        )}
                      </div>

                      <Separator className="mt-6" />

                      {car.price != null ? (
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
            )
          })}
        </ul>
      </div>
    </main>
  )
}
