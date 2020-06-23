import { DRAG_ANIMATION_STATUS } from "./Config"
import _ from "lodash"
import Utils from "./Utils"

let aniDump: Array<any> = [],
    aniMoveTarget: HTMLElement | null = null,
    aniTarget: HTMLElement | null = null

const animation = {
    // 애니메이션 등록
    targetMove(container: HTMLElement, moveTarget: HTMLElement, target: HTMLElement, rate: number) {
        const moveTargetContainer = Utils.searchContainerNode(moveTarget) as HTMLElement,
            moveTargetContainerChildren = moveTargetContainer.children,
            containerChildren = container.children
        let moveTargetIndex = Utils.searchChildIndex(container.children, moveTarget),
            targetIndex = Utils.searchChildIndex(container.children, target)

        for (let d of aniDump) {
            clearTimeout(d)
        }
        aniDump = []

        if (rate) {
            this.animate(container, moveTarget, target, rate)

            let move = false

            // 다른 컨테이너로 이동 할 경우
            if (moveTargetContainer !== container) {
                // 움직일 타겟 컨테이너 요소 애니메이션
                _.map(moveTargetContainerChildren, (child: HTMLElement, index) => {
                    if (move && moveTargetContainerChildren[index - 1]) this.animate(moveTargetContainer, child, moveTargetContainerChildren[index - 1] as HTMLElement, rate)
                    if (moveTarget === child) move = true
                })
                // 이동될 타겟 컨테이너 요소 애니메이션
                move = false
                _.map(containerChildren, (child: HTMLElement, index) => {
                    if (target === child) move = true
                    if (!move) return
                    if (containerChildren[index + 1]) this.animate(container, child, containerChildren[index + 1] as HTMLElement, rate)
                    else this.animate(container, child, null, rate)
                })
                aniDump.push(
                    setTimeout(() => {
                        container.insertBefore(moveTarget, target)
                    }, rate)
                )
            } else {

                // 아래로 이동
                if (moveTargetIndex < targetIndex) {
                    _.map(containerChildren, (child: HTMLElement, index) => {
                        if (moveTarget === containerChildren[index - 1]) move = true
                        if (move && containerChildren[index - 1]) this.animate(container, child, containerChildren[index - 1] as HTMLElement, rate)
                        if (target === child) move = false
                    })
                    aniDump.push(
                        setTimeout(() => {
                            container.insertBefore(moveTarget, containerChildren[targetIndex + 1])
                        }, rate)
                    )
                } else {
                    // 위로 이동
                    _.map(containerChildren, (child: HTMLElement, index) => {
                        if (target === child) move = true
                        if (moveTarget === child) move = false
                        if (move && containerChildren[index + 1]) this.animate(container, child, containerChildren[index + 1] as HTMLElement, rate)
                    })
                    aniDump.push(
                        setTimeout(() => {
                            container.insertBefore(moveTarget, target)
                        }, rate)
                    )
                }
            }
        } else {

            if (moveTargetContainer !== container || moveTargetIndex > targetIndex) {
                container.insertBefore(moveTarget, target)
            } else {
                container.insertBefore(moveTarget, containerChildren[targetIndex + 1])
            }
        }

    },

    // animation
    animate(container: HTMLElement, from: HTMLElement, to: HTMLElement | null, rate: number) {
        const fromRect = from.getBoundingClientRect()
        let toRect
        if (to) {
            toRect = to.getBoundingClientRect()
        } else {
            let tmpChild = document.createElement("div")
            container.appendChild(tmpChild)

            toRect = tmpChild.getBoundingClientRect()
            container.removeChild(tmpChild)
        }
        let moveX = toRect.left - fromRect.left,
            moveY = toRect.top - fromRect.top

        from.style["transition"] = `transform ${rate}ms ease`
        from.style["transform"] = `translate3d(${moveX}px, ${moveY}px, 0px)`
        from.setAttribute(DRAG_ANIMATION_STATUS, "true")

        aniDump.push(
            setTimeout(() => {
                from.removeAttribute(DRAG_ANIMATION_STATUS)
                from.style["transition"] = ""
                from.style["transform"] = ""
            }, rate)
        )
    },
}

export default animation