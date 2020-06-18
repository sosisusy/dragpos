import Utils from "./Utils"
import { DRAG_START_CLASS, DragPosOptions } from "./Config"
import _ from "lodash"

const DragEvent = {

    // mouse down
    handleMouseDown(e: Event, option: DragPosOptions) {
        window.dragposEventEnabled = true
    },

    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions) {
        let container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement

        // 컨트롤러가 지정된 상태에서 컨트롤러가 아닌 다른 곳을 드래그하여 옮기려 한 경우 이벤트 진행 안함
        if (option.controller && !window.dragposEventEnabled) return

        window.dragposEventRunning = true
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

        if (!window.dragposEventRunning) return

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
        if (!window.dragposEventRunning) return

        let moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement
        if (moveTarget) moveTarget.classList.remove(DRAG_START_CLASS)

        // reset global variable
        window.dragposEventRunning = false
        window.dragposEventEnabled = false
    },
}

export default DragEvent