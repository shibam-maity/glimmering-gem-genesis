import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  // Check if it's a range slider by seeing if value is an array
  const isRange = Array.isArray(value);
  // If no value is provided, default to single thumb (or let Radix handle default)
  const thumbs = isRange ? value : [value]; 

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={value} // Pass value explicitly
      {...props} // Pass remaining props
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {/* Render a Thumb for each value in the array (or single value) */}
      {thumbs?.map((_, index) => (
        <SliderPrimitive.Thumb 
          key={index} 
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" 
        />
      ))}
    </SliderPrimitive.Root>
  )
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
