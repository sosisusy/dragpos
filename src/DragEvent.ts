import Utils from "./Utils"
import { DRAG_EVENT_CLASS, DragPosOptions } from "./Config"

const DragEvent = {
    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions) {
        let target = e.target as HTMLElement
        target.classList.add(DRAG_EVENT_CLASS)
    },

    /**
     * drag over
     */
    handleDragOver(e: Event, option: DragPosOptions) {
        e.preventDefault()
        let container = option.ele as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement,
            moveTarget = document.querySelector(`.${DRAG_EVENT_CLASS}`) as HTMLElement

        if (!target) return

        // 위치 값
        let { x: targetX, y: targetY } = target.getBoundingClientRect(),
            { x: moveTargetX, y: moveTargetY } = moveTarget.getBoundingClientRect()

        if (moveTarget !== target) {
            // 이동할 노드가 타겟 이전에 위치 할 경우
            if (targetX < moveTargetX || targetY < moveTargetY) {
                container.insertBefore(moveTarget, target)
            } else {
                container.insertBefore(moveTarget, target.nextSibling)
            }
        }
    },

    /**
     * drag end
     */
    handleDragEnd(e: Event, option: DragPosOptions) {
        let target = e.target as HTMLElement
        target.classList.remove("dragpos__drag")
    },
}

export default DragEvent