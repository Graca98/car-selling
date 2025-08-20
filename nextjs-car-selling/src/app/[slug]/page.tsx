import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

// Dotaz pro detail auta podle slug
const CAR_QUERY = `*[_type == "car" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: { asset: { _ref: string } }) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source) // Vytvoření URL pro obrázek
    : null;

const options = { next: { revalidate: 30 } };

// Funkce pro asynchronní získání auta na základě params
export default async function CarPage({ params }: { params: { slug: string } }) {
  // Načítání params (slug) v rámci asynchronní funkce
  const { slug } = await params;

  // Asynchronní načtení dat z Sanity
  const car = await client.fetch<SanityDocument>(CAR_QUERY, { slug }, options);

  if (!car) {
    return <div>Auto nebylo nalezeno.</div>;
  }

  const carImageUrl = car?.images?.[0] ? urlFor(car.images[0])?.width(550).height(310).url() : null;
  const carImageUrl2 = car?.images?.[1] ? urlFor(car.images[1])?.width(550).height(310).url() : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Zpět na seznam aut
      </Link>
      {carImageUrl && (
        <img
          src={carImageUrl}
          alt={car.name || "Auto bez názvu"}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      {carImageUrl2 && (
        <img
          src={carImageUrl2}
          alt={car.name || "Auto bez názvu"}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{car.name || "Auto bez názvu"}</h1>
      <p>{car.price || "Cena není uvedena"} Kč</p>
      <p>Rok výroby: {car.year || "Rok výroby není uveden"}</p>
      <p>{car.description || "Popis auta není k dispozici."}</p>
      <div className="prose">
        {Array.isArray(car.features) && (
          <ul>
            {car.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
