import _ from "lodash"
import { LOOP_LIMIT, DRAG_KEY_ATTRIBUTE } from "./Config"

const Utils = {
    // 드래그 컨테이너 노드 검색
    searchContainerNode(ele: HTMLElement, cnt: number = 0): HTMLElement | boolean {
        let parent = ele.parentNode as HTMLElement

        if (!parent) return false
        if (parent.getAttribute(DRAG_KEY_ATTRIBUTE)) return parent
        if (cnt >= LOOP_LIMIT) return false
        return this.searchContainerNode(parent, ++cnt)
    },

    /**
     * children 안의 요소에 해당할때까지 상위 노드 검색
     */
    searchParentNode(children: HTMLCollection, ele: HTMLElement, cnt = 0): HTMLElement | boolean {
        let parent = ele.parentNode as HTMLElement

        if (!parent) return false

        if (_.indexOf(children, ele) !== -1) return ele
        if (cnt >= LOOP_LIMIT) return false
        return this.searchParentNode(children, parent, ++cnt)
    },

    // 노드 인덱스 반환
    searchChildIndex(children: HTMLCollection, ele: HTMLElement): number {
        let childIndex = -1
        _.map(children, (child, i) => {
            if (child === ele) childIndex = i
        })
        return childIndex
    },

    // 해당 그룹 드래그 활성화
    enableDragGroup() {

    },
}

export default Utils