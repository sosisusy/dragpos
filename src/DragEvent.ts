import Utils from "./Utils"
import { DRAG_START_CLASS, DragPosOptions } from "./Config"
import _ from "lodash"

const DragEvent = {

    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions) {
        let container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement
        console.log(container, e.target, target)
        target.classList.add(DRAG_START_CLASS)
        window.dragposTargetGroup = option.group ?? ""
    },

    /**
     * drag over
     */
    handleDragOver(e: Event, option: DragPosOptions) {
        e.preventDefault()
        const store = window.dragposOptionStore,
            group = store.group

        let container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            containerChildren = container.children,
            target = Utils.searchParentNode(containerChildren, e.target as HTMLElement) as HTMLElement,
            moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement

        // 노드찾기 실패 시 이벤트 무시
        if (!target) return

        // 위치 변경
        if (moveTarget !== target) {
            let targetIndex = Utils.searchChildIndex(containerChildren, target),
                moveTargetIndex = Utils.searchChildIndex(containerChildren, moveTarget)

            if (window.dragposTargetGroup && group[window.dragposTargetGroup].indexOf(option.key as string) === -1) return

            if (targetIndex > moveTargetIndex) {
                container.insertBefore(moveTarget, containerChildren[targetIndex + 1])
            } else {
                container.insertBefore(moveTarget, target)
            }
        }
    },

    /**
     * drag end
     */
    handleDragEnd(e: Event, option: DragPosOptions) {
        let moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement
        moveTarget.classList.remove(DRAG_START_CLASS)
    },
}

export default DragEvent