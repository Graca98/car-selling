export default function Page() {
  return (
    <main className="min-h-dvh bg-background max-w-6xl mx-auto px-0 mt-10">
      <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Sekce 1 */}
        <section className="mb-8">
         <h2 className="text-3xl font-semibold text-gray-800">O nás</h2>
          <p className="text-lg mt-4 text-gray-700">
            Zabýváme se prodejem zánovních vozů, vozy co nejsou starší 3-5 let a naše hlavní zaměření jsou převážně koncerny.
          </p>
        </section>

        {/* Sekce 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Proč právě koncerny?</h2>
          <p className="text-lg mt-4 text-gray-700">
            S koncerny máme ten nejlepší zkušenosti, jak z naší praxe, tak právě od Vás! 
            Ale občas u nás narazíte i na jinou značku, ale vždy jsou vozy v tom nejlepším stavu.
          </p>
        </section>

        {/* Sekce 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Odkud auto kupujeme?</h2>
          <p className="text-lg mt-4 text-gray-700">
            Autos dáváme od ověřených partnerů z Německa, kde každý auto je kompletně servisní historií a autorizovaném servisu. 
            S náhledem u něj nepopípad přímo u nás na pobočce. Snažíme se, aby je to ve svém budoucím voze vedli veškerou historii 
            od A do Z. A věděli do čeho jedete.
          </p>
        </section>

        {/* Sekce 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Proč právě my?</h2>
          <p className="text-lg mt-4 text-gray-700">
            Auta si vždy bereme jako na konec. To znamená, že do toho vkládáme vše a hlavně máme na to lidi. Proto ke každému 
            z Vás přistupujeme individuálně, dle vašich potřeb. Autos vždy nejlépe připravíme a zajistíme prohlídku vozu.
          </p>
        </section>

        {/* Sekce 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Jak to u nás probíhá?</h2>
          <ol className="list-decimal list-inside text-lg mt-4 space-y-2 text-gray-700">
            <li>Vyberete si vozidlo, které nabízíme</li>
            <li>Kontaktujete nás, dále zajistíme a zarezervujeme vůz</li>
            <li>Připravíme doklady, termíny pro předání</li>
            <li>Po vyplnění administrativy a provedení úhrady je vše připraveno</li>
          </ol>
        </section>

        {/* Sekce 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Reference</h2>
          <div className="flex justify-center gap-4 mt-4">
            <div className="border p-4 w-32 h-32 bg-gray-100">Reference 1</div>
            <div className="border p-4 w-32 h-32 bg-gray-100">Reference 2</div>
            <div className="border p-4 w-32 h-32 bg-gray-100">Reference 3</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="mt-4 text-lg text-gray-700">
            <span className="font-semibold">Cami a napíšeme</span>
          </p>
        </footer>
      </div>
    </div>
    </main>
  );
}



// export default function Page() {
//   return (
//     <main className="min-h-dvh bg-background max-w-6xl mx-auto px-0 mt-10">
//       <div className="p-6 space-y-6">
//       {/* Title Section */}
//       <h2 className="text-2xl font-semibold text-blue-800">
//         O nás
//       </h2>
//       <p className="text-lg text-gray-700">
//         Zabýváme se prodejem zánovních vozů, vozy co nabízíme jsou 3-5 let staré a naše hlavní zaměření jsou především koncerny.
//       </p>

//       {/* Reasons Section */}
//       <div className="space-y-4 mt-6">
//         <h3 className="text-xl font-medium text-blue-600">
//           Proč právě koncerny?
//         </h3>
//         <p className="text-lg text-gray-700">
//           S koncerny máme ten nejlepší zkušenosti, jak z naší praxe, tak právě od Vás! Ale občas nás narazí i nějaké jiné značky, ale vždy jsou vozy v tom nejlepším stavu.
//         </p>

//         <h3 className="text-xl font-medium text-blue-600">
//           Odkud auty kupujeme?
//         </h3>
//         <p className="text-lg text-gray-700">
//           Auta dovážíme od ověřených partnerů z Německa, ke každému autu je kompletní servisní historie a autorizovaný servis. Snažíme se, aby je v budoucnu vozidla vlekla veškerou historickou historii od A do Z a věděli do čeho jdou.
//         </p>

//         <h3 className="text-xl font-medium text-blue-600">
//           Proč právě my?
//         </h3>
//         <p className="text-lg text-gray-700">
//           První a druhý auto vždy bereme jako konec. To znamená, že do toho vkládáme vše a hlavně má to báječný servis. Proto ke každému z Vás přistupujeme individuálně, dle vašich potřeb.
//         </p>

//         <h3 className="text-xl font-medium text-blue-600">
//           Nemáme o nákup problém?
//         </h3>
//         <p className="text-lg text-gray-700">
//           Po domluvě s vámi, nemáme problém vás vyzvednout na nejbližším vlakovém nebo automobilovém nádraží.
//         </p>
//       </div>

//       {/* How It Works Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold text-blue-800">
//           Jak to u nás probíhá?
//         </h2>
//         <ol className="list-decimal pl-6 space-y-4 mt-4">
//           <li className="text-lg text-gray-700">
//             Vyberete si vozidlo, které nabízíme.
//           </li>
//           <li className="text-lg text-gray-700">
//             Kontaktujete nás, můžete si zamluvit prohlídku a vozidlo do 24 hodin bez nutnosti finanční zálohy.
//           </li>
//           <li className="text-lg text-gray-700">
//             Pokud bude všechno v pořádku a jste si 100% jistí nákupem, můžete si vybrat auto, které bude v nejlepším stavu.
//           </li>
//           <li className="text-lg text-gray-700">
//             Auta dovážíme od ověřených partnerů z Německa, ke každému autu je kompletní servisní historie.
//           </li>
//           <li className="text-lg text-gray-700">
//             Snažíme se, aby vozidla splnila Vaše požadavky na nejvyšší úroveň.
//           </li>
//           <li className="text-lg text-gray-700">
//             Nabízíme možnost prodloužené záruky na 3 roky a vyřízení administrativních záležitostí.
//           </li>
//         </ol>
//       </div>

//       {/* References Section */}
//       <div className="mt-8">
//         <h3 className="text-xl font-medium text-blue-600">
//           Reference
//         </h3>
//         <div className="space-y-2 mt-4">
//           <div className="border-2 border-gray-400 p-4 rounded">
//             <p className="text-lg text-gray-700">
//               Zde můžete napsat referenci nebo poznámky.
//             </p>
//           </div>
//           <div className="border-2 border-gray-400 p-4 rounded">
//             <p className="text-lg text-gray-700">
//               Zde můžete napsat referenci nebo poznámky.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     </main>
//   );
// }
