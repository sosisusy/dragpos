import { DRAG_ANIMATION_STATUS } from "./Config"
import _ from "lodash"


const animation = {
    // 애니메이션 등록
    targetMove(container: HTMLElement, moveTarget: HTMLElement, target: HTMLElement, rate: number) {
        // if (rate) {
        // this.animate(container, moveTarget, target, rate)

        // let move = false,
        //     stop = false
        // _.map(container.children, (child: HTMLElement, index) => {
        //     if (stop) return
        //     if (move) this.animate(container, child, container.children[index - 1] as HTMLElement, rate)
        //     if (child === moveTarget) move = true
        //     if (child === target) {
        //         stop = true
        //         move = false
        //     }
        // })
        // } else container.insertBefore(moveTarget, target)

        container.insertBefore(moveTarget, target)
    },

    // animation
    animate(container: HTMLElement, from: HTMLElement, to: HTMLElement, rate: number) {
        const fromRect = from.getBoundingClientRect(),
            toRect = to.getBoundingClientRect(),
            moveX = toRect.left - fromRect.left,
            moveY = toRect.top - fromRect.top

        from.style["transition"] = `transform ${rate}ms`
        from.style["transform"] = `translate3d(${moveX}px, ${moveY}px, 0px)`
        from.setAttribute(DRAG_ANIMATION_STATUS, "true")

        setTimeout(() => {
            from.removeAttribute(DRAG_ANIMATION_STATUS)
            from.style["transition"] = ""
            from.style["transform"] = ""
            container.insertBefore(from, to)
        }, rate)
    },
}

export default animation