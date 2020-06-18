/** config */
export declare const LOOP_LIMIT = 100;
/** style */
export declare const DRAG_DEFAULT_STYLE_ID = "dragpos__default_style";
/** element class */
export declare const DRAG_START_CLASS = "dragpos__drag";
export declare const DRAG_TARGET_CLASS = "";
/** dragpos attribute */
export declare const DRAG_KEY_ATTRIBUTE = "data-dragpos-key";
/** option */
export interface DragPosOptions {
    key?: string;
    ele?: HTMLElement | string;
    group?: string;
    backgroundColor?: string;
    fontColor?: string;
    fontSize?: number;
    /** todo */
    controller?: HTMLElement | string;
    animation?: number;
    fontFamily?: string;
    onDrop?: Function;
    onDragStart?: Function;
}
/** mapping */
export interface DragPosMappingCollection {
    [primaryKey: string]: number;
}
/** group */
export interface DragPosGroupCollection {
    [groupName: string]: Array<string>;
}
/** optionCollection */
export interface DragPosOptionCollection {
    mapping: DragPosMappingCollection;
    options: Array<DragPosOptions>;
    group: DragPosGroupCollection;
}
