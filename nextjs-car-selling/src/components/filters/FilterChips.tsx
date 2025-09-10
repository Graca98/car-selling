"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const LABEL: Record<string, (v: string) => string> = {
  q: (v) => v,
  fuel: (v) => (v === "lpg" ? "LPG" : v.charAt(0).toUpperCase() + v.slice(1)),
  gearbox: (v) => (v === "automatic" ? "Automat" : v === "manual" ? "Manuál" : v),
  priceMin: (v) => `Cena od ${Number(v).toLocaleString("cs-CZ")} Kč`,
  priceMax: (v) => `Cena do ${Number(v).toLocaleString("cs-CZ")} Kč`,
  yearFrom: (v) => `Rok od ${v}`,
  yearTo: (v) => `Rok do ${v}`,
}

const ORDER = ["q", "fuel", "gearbox", "priceMin", "priceMax", "yearFrom", "yearTo"]

export function FilterChips() {
  const router = useRouter()
  const sp = useSearchParams()

  const active = ORDER
    .map((k) => [k, sp.get(k)] as const)
    .filter(([, v]) => v && v.trim() !== "")

  if (active.length === 0) return null

  const removeKey = (key: string) => {
    const next = new URLSearchParams(sp.toString())
    next.delete(key)
    router.push(`/?${next.toString()}`)
  }

  const resetAll = () => router.push(`/`)

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {active.map(([k, v]) => (
        <Badge key={k} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
          <span>{LABEL[k]?.(v!) ?? `${k}: ${v}`}</span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="ml-1 h-5 w-5"
            onClick={() => removeKey(k)}
            aria-label={`Zrušit filtr ${k}`}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </Badge>
      ))}
      <Button variant="link" onClick={resetAll} className="px-0 text-blue-700">
        Zrušit filtr
      </Button>
    </div>
  )
}
