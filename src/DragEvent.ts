import Utils from "./Utils"
import { DRAG_START_CLASS, DragPosOptions } from "./Config"
import _ from "lodash"

const DragEvent = {
    // mouse over
    handleMouseOver(e: Event, option: DragPosOptions) {
        const store = window.dragposOptionStore,
            group = store.group,
            mapping = store.mapping,
            options = store.options

        if (option.group) {
            _.map(group[option.group], (primaryKey) => {
                let optionIndex = mapping[primaryKey],
                    currentOption = options[optionIndex],
                    currentContainer = currentOption.ele as HTMLElement

                _.map(currentContainer.children, (ele) => {
                    ele.setAttribute("draggable", "true")
                })
            })
        } else {
            _.map(group, (groupChild) => {
                _.map(groupChild, (primaryKey) => {
                    let optionIndex = mapping[primaryKey],
                        currentOption = options[optionIndex],
                        currentContainer = currentOption.ele as HTMLElement

                    _.map(currentContainer.children, (ele) => {
                        ele.setAttribute("draggable", "true")
                    })
                })
                console.log(groupChild)
            })
        }
    },

    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions) {
        let container = option.ele as HTMLElement,
            target = Utils.searchParentNode(container.children, e.target as HTMLElement) as HTMLElement
        target.classList.add(DRAG_START_CLASS)
    },

    /**
     * drag over
     */
    handleDragOver(e: Event, option: DragPosOptions) {
        e.preventDefault()
        let container = option.ele as HTMLElement,
            containerChildren = container.children,
            target = Utils.searchParentNode(containerChildren, e.target as HTMLElement) as HTMLElement,
            moveTarget = document.querySelector(`.${DRAG_START_CLASS}`) as HTMLElement

        // 노드찾기 실패 시 이벤트 무시
        if (!target) return

        // 위치 변경
        if (moveTarget !== target) {
            let targetIndex = Utils.searchChildIndex(containerChildren, target),
                moveTargetIndex = Utils.searchChildIndex(containerChildren, moveTarget)

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