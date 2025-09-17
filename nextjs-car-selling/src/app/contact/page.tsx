export default function Page() {
  return (
    <main className="min-h-dvh bg-background max-w-6xl mx-auto px-0 mt-10">
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Kontakty Section */}
          <section className="mb-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-8">
              Kontakt
            </h1>

            {/* Kontaktní informace (telefon, e-mail, Instagram) na jednom řádku */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {/* Telefonní číslo */}
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-medium">Telefonní číslo</h2>
                <p className="text-lg whitespace-nowrap">123 456 000</p>
              </div>

              {/* E-mail */}
              <div className="flex flex-col items-start sm:justify-center sm:items-center">
                <h2 className="text-lg font-medium">E-mail</h2>
                <p className="text-lg whitespace-nowrap">contact@company.com</p>
              </div>

              {/* Instagram */}
              <div className="flex flex-col items-start sm:items-end">
                <h2 className="text-lg font-medium">Instagram</h2>
                <p className="text-lg whitespace-nowrap">@company</p>
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

// export default function Page() {
//   return (
//     <main className="min-h-dvh bg-background max-w-6xl mx-auto px-0 mt-10">
//       <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//       {/* Kontakt Section */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-semibold">Kontakt</h1>
//       </div>

//       {/* Contact Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <h2 className="text-lg font-medium">Telefonní číslo</h2>
//           <p className="text-lg">123 456 000</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-medium">E-mail</h2>
//           <p className="text-lg">contact@company.com</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-medium">Instagram</h2>
//           <p className="text-lg">@company</p>
//         </div>
//       </div>

//       {/* Working Hours */}
//       <div className="mb-8">
//         <h2 className="text-xl font-medium mb-2">Pracovní doba</h2>
//         <p className="text-lg">Pondělí - Pátek: 9:00 - 18:00</p>
//         <p className="text-lg">Víkendy: Flexibilní</p>
//       </div>

//       {/* Map Section */}
//       <div className="mb-8">
//         <h2 className="text-xl font-medium mb-2">Kde nás najdete?</h2>
//         <div className="relative border-2 border-gray-300 p-6 rounded-md">
//           <h3 className="text-xl font-semibold">Mapa</h3>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//             {/* <FaMapPin size={50} color="gray" /> */}
//           </div>
//         </div>
//       </div>

//       {/* Company Info */}
//       <div className="mb-8">
//         <h2 className="text-xl font-medium mb-2">Firma</h2>
//         <p className="text-lg">Corvento s.r.o.</p>
//         <div className="grid grid-cols-2 gap-6 mt-4">
//           <div>
//             <h3 className="text-lg">IČO</h3>
//             <p className="text-lg">123 456 789</p>
//           </div>
//           <div>
//             <h3 className="text-lg">DIČ</h3>
//             <p className="text-lg">CZ123456789</p>
//           </div>
//         </div>
//         <p className="text-lg mt-4">Sídlo: Chytné Město</p>
//       </div>
//     </div>
//     </main>
//   );
// }
