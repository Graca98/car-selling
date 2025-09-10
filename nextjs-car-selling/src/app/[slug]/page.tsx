// app/[slug]/page.tsx
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"
import { CarDetailsTable } from "@/components/car-details-table"
import { CarFeatures } from "@/components/car-features"
import { SanityImageGallery, type GalleryItem } from "@/components/SanityImageGallery"

const CAR_BY_SLUG = `
*[_type == "car" && slug.current == $slug][0]{
  _id, brand, model, year, status,
  price, mileage, fuel, transmission, drivetrain,
  bodyType, color, doors, seats, ownersCount, origin,
  serviceBook, accidentFree, nonSmoker,
  vatIncluded, vatDeductible, location,
  equipmentText, features,
  mainImage, gallery
}
`

const { projectId, dataset } = client.config()
const urlFor = (src: Image) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(src) : null

type Car = {
  _id: string
  brand: string
  model: string
  year?: number
  status?: "available" | "reserved" | "sold"
  price?: number
  mileage?: number
  fuel?: string
  transmission?: string
  drivetrain?: string
  bodyType?: string
  color?: string
  doors?: number
  seats?: number
  ownersCount?: number
  origin?: string
  serviceBook?: boolean
  accidentFree?: boolean
  nonSmoker?: boolean
  vatIncluded?: boolean
  vatDeductible?: boolean
  location?: string
  equipmentText?: string
  features?: string[]
  mainImage?: Image
  gallery?: Image[]
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const car = await client.fetch<Car>(CAR_BY_SLUG, { slug })

  if (!car) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Auto nenalezeno</h1>
        <p className="text-muted-foreground mt-2">Zkontroluj prosím URL.</p>
      </main>
    )
  }

  const title =
    [car.brand, car.model].filter(Boolean).join(" ") +
    (car.year ? `, ${car.year}` : "")

  // Připravíme položky pro react-image-gallery (větší original + menší thumbnail)
  const items: GalleryItem[] = [
    ...(car.mainImage
      ? [
          {
            original: urlFor(car.mainImage)!.width(1600).height(1000).url()!,
            thumbnail: urlFor(car.mainImage)!.width(360).height(220).quality(70).url()!,
            originalAlt: title,
            thumbnailAlt: title,
          },
        ]
      : []),
    ...((car.gallery ?? [])
      .map((img) => {
        const o = urlFor(img)?.width(1600).height(1000).url()
        const t = urlFor(img)?.width(360).height(220).quality(70).url()
        return o && t ? { original: o, thumbnail: t } : null
      })
      .filter(Boolean) as GalleryItem[]),
  ]

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {title}
      </h1>

      {/* Galerie (knihovní) – pokud chceš full-bleed, obal to breakout wrapperem */}
      <section className="mb-8">
        <SanityImageGallery items={items} />
      </section>

      {/* Detailní parametry */}
      <section className="mt-10">
        <h2 className="sr-only">Detail vozu</h2>
        <CarDetailsTable car={car} />
      </section>

      {/* Výbava */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Výbava</h2>
        <CarFeatures features={car.features} equipmentText={car.equipmentText} />
      </section>
    </main>
  )
}
