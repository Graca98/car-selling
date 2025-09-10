"use client"

import { useState } from "react"
import FilterForm from "@/components/FilterForm"
import { FilterChips } from "./FilterChips"
import { Button } from "@/components/ui/button"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"

type Props = {
  initialFilters?: Record<string, string>
  fuelOptions?: string[]
}

export default function FiltersShell({ initialFilters, fuelOptions }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* chips nad formem */}
      <FilterChips />

      {/* tlačítko Filtry – viditelné i na PC */}
      <div className="mb-4 xl:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Filtry</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[90vw] sm:w-[420px]">
            <SheetHeader><SheetTitle>Filtry</SheetTitle></SheetHeader>
            <div className="mt-4">
              <FilterForm
                initialFilters={initialFilters}
                fuelOptions={fuelOptions}
                onAfterSubmit={() => setOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* trvalý sidebar na PC */}
      <aside className="hidden xl:block w-72 shrink-0">
        <div className="rounded-xl border p-4 sticky top-24">
          <FilterForm initialFilters={initialFilters} fuelOptions={fuelOptions} />
        </div>
      </aside>
    </>
  )
}
