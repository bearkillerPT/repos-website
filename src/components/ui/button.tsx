import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "cn"

// Focus is the global :focus-visible outline (index.css), so no outline-none here
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        highlight:
          "bg-highlight text-highlight-foreground hover:bg-highlight/85",
        outline:
          "border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "rounded-sm text-foreground underline underline-offset-4 hover:decoration-highlight-frame",
      },
      size: {
        default: "min-h-11 px-5 py-2 text-base has-[>svg]:px-4",
        sm: "min-h-9 px-4 py-1.5 text-sm has-[>svg]:px-3",
        lg: "min-h-12 px-6 py-2.5 text-lg has-[>svg]:px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
