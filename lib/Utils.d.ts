declare const Utils: {
    /**
     * search 배열 안의 요소에 해당하는 노드를 찾을 때까지 부모 노드를 검색
     */
    searchParentNode(search: HTMLCollection, ele: HTMLElement, cnt?: number): HTMLElement | boolean;
};
export default Utils;
