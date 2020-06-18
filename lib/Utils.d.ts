declare const Utils: {
    searchContainerNode(ele: HTMLElement, cnt?: number): HTMLElement | boolean;
    /**
     * children 안의 요소에 해당할때까지 상위 노드 검색
     */
    searchParentNode(children: HTMLCollection, ele: HTMLElement, cnt?: number): HTMLElement | boolean;
    searchChildIndex(children: HTMLCollection, ele: HTMLElement): number;
};
export default Utils;
