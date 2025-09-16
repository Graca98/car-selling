export default function Page() {
  return (
    <main className="min-h-dvh bg-background max-w-6xl mx-auto px-0 mt-10">
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Kontakty Section */}
          <section className="mb-8">
            <h1 className="text-4xl font-semibold text-gray-800">Kontakt</h1>

            {/* Kontaktní informace (telefon, e-mail, Instagram) na jednom řádku */}
            <div className="flex flex-col md:flex-row justify-between mt-6 space-y-6 md:space-y-0">
              <div className="w-full text-lg text-gray-700 flex justify-start whitespace-nowrap">
                <p>
                  <span className="font-semibold">Tel. číslo:</span> 123 456 789
                </p>
              </div>

              <div className="w-full md:w-1/3 text-lg text-gray-700 flex justify-start md:justify-center whitespace-nowrap">
                <p>
                  <span className="font-semibold">E-mail:</span>{" "}
                  corveto@gmail.com
                </p>
              </div>

              <div className="w-full text-lg text-gray-700 flex justify-start md:justify-end whitespace-nowrap">
                <p>
                  <span className="font-semibold">Instagram:</span> @Corveto20
                </p>
              </div>
            </div>

            {/* Pracovní doba na dalším řádku */}
            <div className="mt-6 text-lg text-gray-700">
              <p>
                <span className="font-semibold">Pracovní doba:</span> Dle
                domluvy, jsme flexibilní
              </p>
            </div>
          </section>

          {/* Kde nás najdete? Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Kde nás najdete?
            </h2>
            {/* <div className="mt-4 p-6 border border-gray-300 bg-gray-50">
            <p className="text-lg text-gray-700">Mapa</p>
          </div> */}
            <div className="relative w-full pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                id="gmap_canvas"
                src="https://maps.google.com/maps?width=612&height=400&hl=en&q=M%C4%9Blnick%C3%A1%20124%20V%C5%A1etaty+(Kde%20n%C3%A1s%20najdete?)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                title="Map"
              ></iframe>
              <a
                href="http://mapseinbindung.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-black px-2 py-1 text-sm rounded"
              >
                iframe google maps
              </a>
            </div>
            <script
              type="text/javascript"
              src="https://embedmaps.com/google-maps-authorization/script.js?id=d230e84271552184e74278e8f1d46df5572f2987"
              async
            ></script>
          </section>

          {/* Firma a IČO Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Firma</h2>
            <div className="text-lg text-gray-700 mt-4">
              <p>
                <span className="font-semibold">Firma:</span> Corvento s.r.o.
              </p>
              <p>
                <span className="font-semibold">IČO:</span> 12345678
              </p>
              <p>
                <span className="font-semibold">DIČ:</span> CZ12345678
              </p>
              <p>
                <span className="font-semibold">Sídlo:</span> Chýně
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
