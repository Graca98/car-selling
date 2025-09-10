import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "@/components/ui/tooltip"
  
  type EquipmentProps = {
    text: string
    className?: string
  }
  
  export function EquipmentTooltip({ text, className }: EquipmentProps) {
    return (
      <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            className={`text-muted-foreground text-sm line-clamp-2 sm:line-clamp-1 ${className ?? ""}`}
            title={text} // fallback pro dlouhý press na mobilu
          >
            {text}
          </p>
        </TooltipTrigger>

        {/* zarovnání doprostřed + světle šedý vzhled */}
        <TooltipContent
          side="top"
          align="center"
          sideOffset={8}
          className="max-w-xs text-center rounded-md  text-neutral-100 border border-gray-200 shadow-md"
        >
          <p className="text-sm leading-snug">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    )
  }
  