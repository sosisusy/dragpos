import { DragPosOptions } from "./Config";
declare class DragPos {
    constructor(ele?: HTMLElement | string, option?: DragPosOptions);
    new(option?: DragPosOptions): void;
    appendStore(option: DragPosOptions): void;
    /**
     * 기본 스타일 적용
     */
    applyDefaultStyle(): void;
    /**
     * apply style option
     */
    applyStyleOption(option: DragPosOptions): void;
    /**
     * 동작
     */
    runDragPos(option: DragPosOptions): void;
}
export default DragPos;
