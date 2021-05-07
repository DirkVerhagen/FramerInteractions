import * as React from "react"
import { Frame, addPropertyControls, ControlType, useNavigation } from "framer"

//TODO:
// Optional: See if a callback event can be created that communicates it's dragstatus (e.g. whether or not it has been dropped) so it can be used in other overrides

export function DragAndDrop(props) {
    const {
        children,
        target,
        droptop,
        dropleft,
        dropbottom,
        dropright,
        ...rest
    } = props

    const navigation = useNavigation()

    const [dragging, setDragging] = React.useState(false)
    const [dropped, setDropped] = React.useState(false)

    function drop(event, info) {
        if (
            droptop == 0 &&
            dropleft == 0 &&
            dropbottom == 0 &&
            dropright == 0
        ) {
            setDropped(true)
            navigation.instant(target)
        } else if (
            info.point.x > dropleft &&
            info.point.x < dropright &&
            info.point.y > droptop &&
            info.point.y < dropbottom
        ) {
            setDropped(true)
            navigation.instant(target)
        }
        setDragging(false)
    }

    function drag() {
        setDragging(true)
    }

    return (
        <Frame
            background="none"
            size="100%"
            opacity={dragging ? 0.7 : 1.0}
            drag={true}
            visible={!dropped}
            onDragEnd={drop}
            onDragStart={drag}
            dragMomentum={false}
        >
            {children}
        </Frame>
    )
}

DragAndDrop.defaultProps = {
    height: 200,
    width: 200,
    isMixed: true,
}

addPropertyControls(DragAndDrop, {
    target: {
        title: "Navigate to",
        type: ControlType.ComponentInstance,
    },
    droptop: {
        title: "Top",
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 4000,
        unit: " px",
        step: 1,
        displayStepper: false,
    },
    dropleft: {
        title: "Left",
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 4000,
        unit: " px",
        step: 1,
        displayStepper: false,
    },
    dropbottom: {
        title: "Bottom",
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 4000,
        unit: " px",
        step: 1,
        displayStepper: false,
    },
    dropright: {
        title: "Right",
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 4000,
        unit: " px",
        step: 1,
        displayStepper: false,
    },
})
