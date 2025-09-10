"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterParams = {
  q?: string
  fuel?: string
  gearbox?: string
  priceMin?: string
  priceMax?: string
  yearFrom?: string
  yearTo?: string
}

const ANY = "__any__"
const fuelLabel = (v: string) => (v === "lpg" ? "LPG" : v.charAt(0).toUpperCase() + v.slice(1))

export default function FilterForm({
  initialFilters,
  fuelOptions = ["benzin", "diesel", "hybrid", "electric", "lpg"],
  onAfterSubmit,
}: {
  initialFilters?: FilterParams
  fuelOptions?: string[]
  onAfterSubmit?: () => void
}) {
  const router = useRouter()
  const sp = useSearchParams()

  const [q, setQ] = useState(initialFilters?.q ?? "")
  const [fuel, setFuel] = useState(initialFilters?.fuel ?? "")
  const [gearbox, setGearbox] = useState(initialFilters?.gearbox ?? "")
  const [priceMin, setPriceMin] = useState(initialFilters?.priceMin ?? "")
  const [priceMax, setPriceMax] = useState(initialFilters?.priceMax ?? "")
  const [yearFrom, setYearFrom] = useState(initialFilters?.yearFrom ?? "")
  const [yearTo, setYearTo] = useState(initialFilters?.yearTo ?? "")

  useEffect(() => {
    setQ(sp.get("q") ?? "")
    setFuel(sp.get("fuel") ?? "")
    setGearbox(sp.get("gearbox") ?? "")
    setPriceMin(sp.get("priceMin") ?? "")
    setPriceMax(sp.get("priceMax") ?? "")
    setYearFrom(sp.get("yearFrom") ?? "")
    setYearTo(sp.get("yearTo") ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.toString()])

  const params = useMemo(() => {
    const p = new URLSearchParams()
    if (q.trim()) p.set("q", q.trim())
    if (fuel) p.set("fuel", fuel)
    if (gearbox) p.set("gearbox", gearbox)
    if (priceMin) p.set("priceMin", priceMin)
    if (priceMax) p.set("priceMax", priceMax)
    if (yearFrom) p.set("yearFrom", yearFrom)
    if (yearTo) p.set("yearTo", yearTo)
    return p
  }, [q, fuel, gearbox, priceMin, priceMax, yearFrom, yearTo])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const pMin = priceMin ? Number(priceMin) : undefined
    const pMax = priceMax ? Number(priceMax) : undefined
    const yFrom = yearFrom ? Number(yearFrom) : undefined
    const yTo = yearTo ? Number(yearTo) : undefined
    if (pMin && pMax && pMin > pMax) return alert("Cena od nesmí být větší než cena do.")
    if (yFrom && yTo && yFrom > yTo) return alert("Rok od nesmí být větší než rok do.")
    router.push(`/?${params.toString()}`)
    onAfterSubmit?.()
  }

  function reset() {
    setQ(""); setFuel(""); setGearbox(""); setPriceMin(""); setPriceMax(""); setYearFrom(""); setYearTo("")
    router.push(`/`)
    onAfterSubmit?.()
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="q">Hledat</Label>
        <Input id="q" placeholder="např. Kodiaq, tempomat" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {/* Palivo */}
      <div className="grid gap-1.5">
        <Label>Palivo</Label>
        <Select value={fuel || undefined} onValueChange={(v) => setFuel(v === ANY ? "" : v)}>
          <SelectTrigger><SelectValue placeholder="(vše)" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>(vše)</SelectItem>
            {fuelOptions.map((f) => (
              <SelectItem key={f} value={f}>{fuelLabel(f)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Převodovka pod palivem */}
      <div className="grid gap-1.5">
        <Label>Převodovka</Label>
        <Select value={gearbox || undefined} onValueChange={(v) => setGearbox(v === ANY ? "" : v)}>
          <SelectTrigger><SelectValue placeholder="(vše)" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>(vše)</SelectItem>
            <SelectItem value="automatic">Automat</SelectItem>
            <SelectItem value="manual">Manuál</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="priceMin">Cena od</Label>
          <Input id="priceMin" type="number" inputMode="numeric" placeholder="např. 200000" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} min={0} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="priceMax">Cena do</Label>
          <Input id="priceMax" type="number" inputMode="numeric" placeholder="např. 500000" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} min={0} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="yearFrom">Rok od</Label>
          <Input id="yearFrom" type="number" inputMode="numeric" placeholder="např. 2018" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} min={1950} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="yearTo">Rok do</Label>
          <Input id="yearTo" type="number" inputMode="numeric" placeholder="např. 2022" value={yearTo} onChange={(e) => setYearTo(e.target.value)} min={1950} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Filtrovat</Button>
        <Button type="button" variant="outline" onClick={reset}>Reset</Button>
      </div>
    </form>
  )
}
