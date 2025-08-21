import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn = clsx(...args) + twMerge(...) → podmíněné skládání tříd + vyřešení konfliktů v Tailwindu
 */
export function cn(...inputs: ClassValue[]) {
  // důležité: spread!
  return twMerge(clsx(...inputs))
}

/**
 * Presety tříd – můžeš je použít samostatně, nebo je přes cn "slít" s dalšími třídami.
 */
export const focusInput = [
  "focus:ring-2",
  "focus:ring-blue-200 dark:focus:ring-blue-700/30",
  "focus:border-blue-500 dark:focus:border-blue-700",
]

export const focusRing = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  "outline-blue-500 dark:outline-blue-500",
]

export const hasErrorInput = [
  "ring-2",
  "border-red-500 dark:border-red-700",
  "ring-red-200 dark:ring-red-700/30",
]

/**
 * Helper pro inputy – poskládá základ, focus a případný error stav.
 * Dá se vypnout focus styly (třeba v konkrétní komponentě).
 */
export function inputClasses({
  base = "",
  withFocus = true,
  hasError = false,
}: {
  base?: ClassValue
  withFocus?: boolean
  hasError?: boolean
}) {
  return cn(
    "block w-full rounded-md border bg-transparent px-3 py-2 transition",
    base,
    withFocus && focusInput,
    hasError && hasErrorInput,
  )
}
