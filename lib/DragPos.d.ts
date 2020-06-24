import { DragPosOptions } from "./Config";
declare class DragPos {
    constructor(ele?: HTMLElement | string, option?: DragPosOptions);
    new(option?: DragPosOptions): void;
    private appendStore;
    /**
     * 기본 스타일 적용
     */
    private applyDefaultStyle;
    /**
     * apply style option
     */
    private applyStyleOption;
    /**
     * 동작
     */
    private runDragPos;
}
export default DragPos;
