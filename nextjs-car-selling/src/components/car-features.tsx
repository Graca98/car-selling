import { Badge } from "@/components/ui/badge"

export function CarFeatures({
  features,
  equipmentText,
}: {
  features?: string[]
  equipmentText?: string
}) {
  if ((!features || features.length === 0) && !equipmentText) {
    return <p className="text-muted-foreground">Výbava není k dispozici.</p>
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      {equipmentText && (
        <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
          {equipmentText}
        </p>
      )}

      {features && features.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <li key={`${f}-${i}`}>
              <Badge variant="secondary" className="bg-gray-100 text-gray-900">
                {f}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
