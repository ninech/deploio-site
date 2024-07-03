import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-nine-primary text-primary-foreground hover:bg-opacity-80 disabled:bg-nine-tertiary disabled:text-nine-tertiary-300 disabled:border-nine-gray-200 border border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-nine-blue-20 bg-background hover:bg-accent hover:text-accent-foreground shadow-nine-button ",
        "outline-secondary":
          "border bg-white border-nine-secondary-border text-nine-primary shadow-nine-button disabled:text-nine-tertiary-300 disabled:border-nine-gray-200",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-gray-200/50 hover:text-accent-foreground active:bg-gray-200",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
