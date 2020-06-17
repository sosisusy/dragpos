export declare const DRAG_EVENT_CLASS = "dragpos__drag";
export interface DragPosOptions {
    key?: string;
    ele?: HTMLElement | string;
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: number;
    /** todo */
    animation?: number;
    fontFamily?: string;
    onDrop?: Function;
    onDragStart?: Function;
    overCursor?: string;
}
