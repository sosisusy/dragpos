import { DRAG_ANIMATION_STATUS } from "./Config"

// let animation = []

const animation = {
    // 애니메이션 등록
    push() {

    },

    // animation
    animate(from: HTMLElement, to: HTMLElement, rate: number) {
        const fromRect = from.getBoundingClientRect(),
            toRect = to.getBoundingClientRect(),
            moveX = toRect.left - fromRect.left,
            moveY = toRect.top - fromRect.top

        console.log(moveX, moveY)
        from.style["transition"] = `transform ${rate}ms`
        from.style["transform"] = `perspective(500px) translate3d(${moveX}px, ${moveY}px, 0px)`
        from.setAttribute(DRAG_ANIMATION_STATUS, "true")


        setTimeout(() => {
            from.removeAttribute(DRAG_ANIMATION_STATUS)
            from.style["transition"] = ""
            from.style["transform"] = ""
        }, rate)
    },
}

export default animation