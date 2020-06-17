import _ from "lodash"

// 묵시적 반복문 최대 반복 수
const LOOP_LIMIT = 100


const Utils = {

    /**
     * search 배열 안의 요소에 해당하는 노드를 찾을 때까지 부모 노드를 검색
     */
    searchParentNode(search: HTMLCollection, ele: HTMLElement, cnt = 0): HTMLElement | boolean {
        let parent = ele.parentNode as HTMLElement

        if (_.indexOf(search, ele) !== -1) return ele
        if (cnt >= LOOP_LIMIT) return false
        return this.searchParentNode(search, parent, ++cnt)
    }
}

export default Utils