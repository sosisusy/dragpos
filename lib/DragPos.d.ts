import { DragPosOptions } from "./Config";
declare class DragPos {
    constructor(ele?: HTMLElement | string, option?: DragPosOptions);
    new(option: DragPosOptions): void;
    /**
     * apply style option
     * @param {object} option
     */
    applyStyleOption(option: DragPosOptions): void;
    /**
     * 동작
     * @param {Object} option
     */
    runDragPos(option?: DragPosOptions): void;
}
export default DragPos;
