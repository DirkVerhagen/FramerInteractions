import * as React from "react"
import { useRef } from "react"
import { Frame, addPropertyControls, ControlType, useNavigation } from "framer"

export function DoubleClick(props) {
    const { transitionTo, doubleClicktime, fill, ...rest } = props
    function useDoubleTap(
        callback: (e: MouseEvent | TouchEvent) => void,
        timeout: number = doubleClicktime
    ) {
        // Maintain the previous timestamp in a ref so it persists between renders
        const prevClickTimestamp = useRef(0)

        // Returns a function that will only fire the provided `callback` if it's
        // fired twice within the defined `timeout`.
        return (e: MouseEvent | TouchEvent) => {
            // performance.now() is a browser-specific function that returns the
            // current timestamp in milliseconds
            const clickTimestamp = performance.now()

            // We can get the time since the previous click by subtracting it from
            // the current timestamp. If that duration is than `timeout`, fire our callback
            if (clickTimestamp - prevClickTimestamp.current <= timeout) {
                callback(e)

                // Reset the previous timestamp to `0` to prevent users triggering
                // further double clicks by clicking in rapid succession
                prevClickTimestamp.current = 0
            } else {
                // Otherwise update the previous timestamp to the latest timestamp.
                prevClickTimestamp.current = clickTimestamp
            }
        }
    }

    const navigation = useNavigation()
    const onClick = useDoubleTap(() => {
        navigation.instant(transitionTo)
    })

    return <Frame background={fill} size="100%" onTap={onClick}></Frame>
}

DoubleClick.defaultProps = {
    height: 100,
    width: 100,
}

addPropertyControls(DoubleClick, {
    transitionTo: {
        title: "Target",
        type: ControlType.ComponentInstance,
    },
    doubleClicktime: {
        title: "Speed (ms)",
        type: ControlType.Number,
        defaultValue: 300,
    },
    fill: {
        title: "Fill",
        type: ControlType.Color,
    },
})
