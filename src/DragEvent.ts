import Utils from "./Utils"
import { DRAG_START_CLASS, DragPosOptions } from "./Config"
import _ from "lodash"

const DragEvent = {

    // mouse down
    handleMouseDown(e: Event, option: DragPosOptions) {
        console.log("test")
    },

    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions) {
        let container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement

        target.classList.add(DRAG_START_CLASS)

        // target group
        window.dragposTargetGroup = option.group ?? ""
    },

    /**
     * drag over
     */
    handleDragOver(e: Event, option: DragPosOptions) {
        e.preventDefault()
        e.stopPropagation()
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

            // 이동 노드의 그룹과 오버된 노드의 그룹이 다른 경우 무시
            if (window.dragposTargetGroup && group[window.dragposTargetGroup].indexOf(option.key as string) === -1) return

            // 인덱스 위치 확인 후 노드 이동
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
        if (moveTarget) moveTarget.classList.remove(DRAG_START_CLASS)
    },
}

export default DragEvent