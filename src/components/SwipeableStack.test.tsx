import { render, fireEvent } from "@testing-library/react"
import SwipeableStack from "./SwipeableStack"

describe("SwipeableStack", () => {
    const items = [<div key={1}>Item 1</div>, <div key={2}>Item 2</div>]

    it("renders items", () => {
        const { getByText } = render(<SwipeableStack>{items}</SwipeableStack>)
        expect(getByText("Item 1")).toBeInTheDocument()
    })

    it("allows the user to swipe to view the next item", () => {
        const { getByText } = render(<SwipeableStack>{items}</SwipeableStack>)
        const stackItem = getByText("Item 1")

        // Get the location of the stack item
        const rect = stackItem.getBoundingClientRect()

        fireEvent.touchStart(stackItem, { touches: [{ clientX: rect.x }] })
        fireEvent.touchMove(stackItem, { touches: [{ clientX: rect.x - 500 }] })
        fireEvent.touchEnd(stackItem)

        expect(getByText("Item 2")).toBeInTheDocument()
    })

    it("displays a 'start over' screen when there are no more items", () => {
        const items: any = []
        const { getByText } = render(<SwipeableStack>{items}</SwipeableStack>)

        expect(getByText("Start over")).toBeInTheDocument()
    })
})
