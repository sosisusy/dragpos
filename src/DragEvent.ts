import Utils from "./Utils"
import { DRAG_START_CLASS, DragPosOptions, DRAG_ANIMATION_STATUS } from "./Config"
import Animation from "./Animation"
import _ from "lodash"

let dragposTargetGroup: string = ""

const DragEvent = {

    // mouse down
    handleMouseDown(e: Event, option: DragPosOptions) {
        const container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement

        // 드래그 허용
        target.setAttribute("draggable", "true")
    },

    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions) {
        let container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement

        // 드래그 클래스 설정
        target.classList.add(DRAG_START_CLASS)

        // target group
        dragposTargetGroup = option.group ?? ""

        // Custom Listener
        if (option.onDragStart) option.onDragStart(e, option)
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
            if (dragposTargetGroup && group[dragposTargetGroup].indexOf(option.key as string) === -1) return
            if (target.getAttribute(DRAG_ANIMATION_STATUS) || moveTarget.getAttribute(DRAG_ANIMATION_STATUS)) return



            // 인덱스 위치 확인 후 노드 이동
            if (targetIndex > moveTargetIndex) {
                container.insertBefore(moveTarget, containerChildren[targetIndex + 1])
            } else {
                container.insertBefore(moveTarget, target)
            }

            // animation
            Animation.animate(moveTarget, target, 150)
            Animation.animate(target, moveTarget, 150)

            // Custom Listener
            if (option.onChange) option.onChange(e, option)
        }

        // Custom Listener
        if (option.onDragOver) option.onDragOver(e, option)
    },

    /**
     * drag end
     */
    handleDragEnd(e: Event, option: DragPosOptions) {
        let moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement

        // 드래그 클래스 삭제
        if (moveTarget) moveTarget.classList.remove(DRAG_START_CLASS)

        // 드래그 불허
        moveTarget.removeAttribute("draggable")

        // Custom Listener
        if (option.onDragEnd) option.onDragEnd(e, option)
    },
}

export default DragEvent