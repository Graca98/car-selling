"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import FilterForm from "@/components/FilterForm"

type Props = {
  count: number
  initialFilters?: Record<string, string>
  fuelOptions?: string[]
}

export default function FiltersHeader({ count, initialFilters, fuelOptions }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Naše vozy</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{count} vozů v nabídce</span>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Filtry</Button>
          </SheetTrigger>
          {/* padding pro mobil/tablet */}
          <SheetContent side="left" className="w-[90vw] sm:w-[420px] p-4 sm:p-6">
            <SheetHeader>
              <SheetTitle>Filtry</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterForm initialFilters={initialFilters} fuelOptions={fuelOptions} onAfterSubmit={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
