import Utils from "./Utils"
import { DRAG_START_CLASS, DragPosOptions, DRAG_ANIMATION_STATUS, DRAG_KEY_ATTRIBUTE } from "./Config"
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

        let container = Utils.searchContainerNode(e.target as HTMLElement) as HTMLElement,
            containerChildren = container.children,
            target = Utils.searchParentNode(containerChildren, e.target as HTMLElement) as HTMLElement,
            moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement,
            moveTargetContainer = Utils.searchContainerNode(moveTarget) as HTMLElement

        // 노드찾기 실패 시 이벤트 무시
        if (!target || !container.getAttribute(DRAG_KEY_ATTRIBUTE) || !moveTargetContainer.getAttribute(DRAG_KEY_ATTRIBUTE)) return

        const moveTargetPrimaryKey = moveTargetContainer.getAttribute(DRAG_KEY_ATTRIBUTE) as string,
            moveTargetOption = Utils.getOption(moveTargetPrimaryKey)

        // 위치 변경
        if (moveTarget !== target) {
            // 이동 노드의 그룹과 오버된 노드의 그룹이 다른 경우 무시
            if (moveTargetOption.group !== option.group) return
            if (target.getAttribute(DRAG_ANIMATION_STATUS) || moveTarget.getAttribute(DRAG_ANIMATION_STATUS)) return

            // 이동
            Animation.targetMove(container, moveTarget, target, moveTargetOption.animation as number)

            // Custom Listener
            if (moveTargetOption.onChange) moveTargetOption.onChange(e, moveTargetOption)
        }

        // Custom Listener
        if (moveTargetOption.onDragOver) moveTargetOption.onDragOver(e, moveTargetOption)
    },

    /**
     * drag end
     */
    handleDragEnd(e: Event, option: DragPosOptions) {
        const moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement,
            moveTargetContainer = Utils.searchContainerNode(moveTarget) as HTMLElement,
            moveTargetPrimaryKey = moveTargetContainer.getAttribute(DRAG_KEY_ATTRIBUTE) as string,
            moveTargetOption = Utils.getOption(moveTargetPrimaryKey)

        // 드래그 클래스 삭제
        if (moveTarget) moveTarget.classList.remove(DRAG_START_CLASS)

        // 드래그 불허
        moveTarget.removeAttribute("draggable")

        // Custom Listener
        if (moveTargetOption.onDragEnd) moveTargetOption.onDragEnd(e, moveTargetOption)
    },
}

export default DragEvent