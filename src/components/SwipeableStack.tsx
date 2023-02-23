import React, { useState } from "react"
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence,
    PanInfo,
    Transition,
    HTMLMotionProps,
} from "framer-motion"
import Button from "./Button"

// These must match the width and height defined in the StackItem component,
// can't interpolate them since Tailwind doesn't pick up the values for purging.
const ITEM_WIDTH = 450
const ITEM_HEIGHT = 250

type SwipeableStackProps = {
    children: React.ReactNode

    // TODO: Implement these callbacks
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
}

/** 
    A component that renders a list of items in a stack. An item can be swiped
    left or right to reveal the next item.

    `OnSwipeLeft` and `OnSwipeRight` are optional callbacks that can be passed
    in to handle the swipe events.
*/

// TODO: Expose a hook to allow the parent to control the stack
// and get info such as the current index, if the stack is
// empty, etc.

export default function SwipeableStack(props: SwipeableStackProps) {
    const items = React.Children.toArray(props.children)
    const [index, setIndex] = useState(0)
    const [exitX, setExitX] = useState<number | string>("100%")

    const currentItemTransition = {
        type: "spring",
        stiffness: 300,
        damping: 20,
        opacity: { duration: 0.2 },
    } as Transition

    return (
        <motion.div
            style={{
                width: `${ITEM_WIDTH}px`,
                height: `${ITEM_HEIGHT}px`,
                position: "relative",
            }}
        >
            {/* Render a "start over" screen if there are no more items */}
            <AnimatePresence initial={true}>
                {index >= items.length && (
                    <motion.div
                        className="absolute inset-0 flex flex-col space-y-6 items-center justify-center"
                        initial={{ y: "100%" }}
                        transition={currentItemTransition}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                    >
                        <h1 className="text-4xl font-bold text-white">
                            No more jobs, sorry!
                        </h1>

                        <Button
                            color="secondary"
                            size="large"
                            onClick={() => {
                                setIndex(0)
                                setExitX("100%")
                            }}
                        >
                            Start over
                        </Button>
                    </motion.div>
                )}

                {/* Render the previous item if it exists */}
                {index >= 0 && index !== items.length && (
                    <StackItem
                        key={index + 1}
                        index={index}
                        initial={{ scale: 0, y: ITEM_HEIGHT, opacity: 0 }}
                        animate={{
                            scale: 0.75,
                            y: ITEM_HEIGHT / 6,
                            opacity: 0.5,
                        }}
                        transition={{
                            scale: { duration: 0.2 },
                            opacity: { duration: 0.4 },
                        }}
                    >
                        {items[index + 1]}
                    </StackItem>
                )}

                {/* Render the current item if it exists */}
                {index < items.length && (
                    <StackItem
                        key={index}
                        index={index}
                        drag="x"
                        transition={currentItemTransition}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exitX={exitX}
                        setExitX={setExitX}
                        setIndex={setIndex}
                    >
                        {items[index]}
                    </StackItem>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

interface StackItemProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    index: number
    exitX?: string | number
    setExitX?: (exitX: number | string) => void
    setIndex?: (index: number) => void
}

function StackItem(props: StackItemProps) {
    const x = useMotionValue(0)
    const scale = useTransform(x, [-ITEM_WIDTH, 0, ITEM_WIDTH], [0.5, 1, 0.5])
    const rotate = useTransform(x, [-ITEM_WIDTH, 0, ITEM_WIDTH], [-45, 0, 45], {
        clamp: false,
    })

    function handleDragEnd(
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        // If the drag distance is less than -100px, animate the card off the
        // screen to the left.
        if (info.offset.x < -100 && props.setExitX && props.setIndex) {
            props.setExitX(-250)
            props.setIndex(props.index + 1)
        }
        // If the drag distance is greater than 100px, animate the card off the
        // screen to the right.
        if (info.offset.x > 100 && props.setExitX && props.setIndex) {
            props.setExitX(250)
            props.setIndex(props.index + 1)
        }
    }

    return (
        <motion.div
            className="w-[450px] h-[250px] p-4 absolute top-0 cursor-grab bg-white rounded-lg"
            style={{
                x: x,
                rotate: rotate,
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={props.drag}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            onDragEnd={handleDragEnd}
            initial={props.initial}
            animate={props.animate}
            transition={props.transition}
            exit={{
                x: props.exitX,
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 },
            }}
        >
            <motion.div style={{ height: "100%", scale: scale }}>
                {props.children}
            </motion.div>
        </motion.div>
    )
}
