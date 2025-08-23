// React šablona e-mailu (JSX), kterou renderujeme na HTML v API.
// https://react.email/docs
// https://react.email/docs/components
import * as React from "react";
import type { CarOrder } from "@/lib/carOrderSchema";

export default function CarOrderEmail(d: CarOrder) {
  return (
    <div>
      <h1>Nová poptávka dovozu auta</h1>
      <p>
        <strong>{d.jmeno} {d.prijmeni}</strong><br />
        E-mail: {d.email}<br />
        Tel.: {d.telefon}
      </p>
      <p>
        <strong>Vozidlo:</strong> {d.znacka} {d.model}<br />
        <strong>Rok:</strong> {d.rokOd} – {d.rokDo}<br />
        <strong>Nájezd:</strong> {d.najezdOd} – {d.najezdDo} km
      </p>
      {d.preference ? (
        <>
          <h3>Další preference</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{d.preference}</pre>
        </>
      ) : null}
    </div>
  );
}
