/** config */
export declare const LOOP_LIMIT = 100;
/** default */
export declare const DefaultGroup = "dragposPublicGroup";
export declare const DefaultOption: DragPosOptions;
/** style */
export declare const DRAG_DEFAULT_STYLE_ID = "dragpos__default_style";
/** element class */
export declare const DRAG_START_CLASS = "dragpos__drag";
export declare const DRAG_CONTROLLER_CLASS = "dragpos__controller";
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
    fontFamily?: string;
    controller?: string;
    onDrop?: Function;
    /** todo */
    animation?: number;
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
