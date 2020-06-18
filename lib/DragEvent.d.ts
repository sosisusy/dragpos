import { DragPosOptions } from "./Config";
declare const DragEvent: {
    handleMouseDown(e: Event, option: DragPosOptions): void;
    /**
     * drag start
     */
    handleDragStart(e: Event, option: DragPosOptions): void;
    /**
     * drag over
     */
    handleDragOver(e: Event, option: DragPosOptions): void;
    /**
     * drag end
     */
    handleDragEnd(e: Event, option: DragPosOptions): void;
};
export default DragEvent;
