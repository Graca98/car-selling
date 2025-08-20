import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

// Dotaz pro auta
const CARS_QUERY = `*[_type == "car" && defined(slug.current)]|order(publishedAt desc)[0...12]{_id, name, slug, price, engine, mileage, year, images}`;

const { projectId, dataset } = client.config();
const urlFor = (source: { asset: { _ref: string } }) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source) // Vytvoření URL pro obrázek
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const cars = await client.fetch<SanityDocument[]>(CARS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-5xl p-8">
      <h1 className="text-4xl font-bold mb-8">Vozidla na prodej</h1>
      <ul className="flex flex-wrap justify-start gap-y-4 gap-x-6">
        {cars.map((car) => {
          const carImageUrl = car?.images?.[0] ? urlFor(car.images[0])?.width(550).height(310).url() : null;
          return (
            <li className="hover:underline" key={car._id}>
              <Link href={`/${car.slug.current}`}>
                <div className="flex flex-col gap-4">
                  {carImageUrl && (
                    <img
                      src={carImageUrl}
                      alt={car.name || "Auto bez názvu"}
                      className="aspect-video rounded-xl"
                      width="275"
                      height="155"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">{car.name || "Auto bez názvu"}</h2>
                    <div className="flex gap-2">
                      <p className="bg-gray-600 p-1">{car.engine || "Motor není uveden"}</p>
                      <p className="bg-gray-600 p-1">{car.mileage || "Nájezd není uveden"}</p>
                    </div>
                    <p className="mt-2">Cena: {car.price || "Cena není uvedena"} Kč</p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
