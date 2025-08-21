import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

type Props = {
  car: {
    price?: number; mileage?: number; year?: number; fuel?: string; transmission?: string;
    drivetrain?: string; bodyType?: string; color?: string; doors?: number; seats?: number;
    ownersCount?: number; origin?: string; serviceBook?: boolean; accidentFree?: boolean;
    nonSmoker?: boolean; vatIncluded?: boolean; vatDeductible?: boolean; location?: string;
    vin?: string;
  }
}

export function CarDetailsTable({ car }: Props) {
  const rows: [string, React.ReactNode][] = [
    ["Cena", car.price != null ? `${car.price} Kč` : "—"],
    ["Rok výroby", car.year ?? "—"],
    ["Nájezd", car.mileage != null ? `${car.mileage} km` : "—"],
    ["Palivo", car.fuel ?? "—"],
    ["Převodovka", car.transmission ?? "—"],
    ["Pohon", car.drivetrain ?? "—"],
    ["Karoserie", car.bodyType ?? "—"],
    ["Barva", car.color ?? "—"],
    ["Dveře / Místa", car.doors || car.seats ? `${car.doors ?? "?"} / ${car.seats ?? "?"}` : "—"],
    ["Počet majitelů", car.ownersCount ?? "—"],
    ["Původ", car.origin ?? "—"],
    ["Servisní knížka", car.serviceBook ? "Ano" : "Ne"],
    ["Nehavarované", car.accidentFree ? "Ano" : "Ne"],
    ["Nekuřácké", car.nonSmoker ? "Ano" : "Ne"],
    ["Cena vč. DPH", car.vatIncluded ? "Ano" : "Ne"],
    ["Možný odpočet DPH", car.vatDeductible ? "Ano" : "Ne"],
    ["Lokalita", car.location ?? "—"],
    ["VIN", car.vin ?? "—"],
  ]

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <Table>
        <TableBody>
          {rows.map(([k, v]) => (
            <TableRow key={k} className="hover:bg-transparent">
              <TableCell className="w-56 font-medium text-gray-600">{k}</TableCell>
              <TableCell className="font-semibold">{v}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
