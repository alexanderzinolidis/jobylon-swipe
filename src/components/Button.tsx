import { classed } from "@tw-classed/react"

// Showcasing the use of tw-classed to create a reusable button component.
// https://tw-classed.vercel.app/

const Button = classed("button", {
    base: "rounded-lg font-bold text-sm",

    variants: {
        color: {
            primary: "text-white bg-blue-500 hover:bg-blue-600",
            secondary: "text-white bg-gray-800 hover:bg-gray-900",
        },
        size: {
            small: "py-2 px-4",
            medium: "py-3 px-6",
            large: "py-4 px-8",
        },
    },

    defaultVariants: {
        color: "primary",
        size: "medium",
    },
})

export default Button
