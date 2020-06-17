
export const DRAG_EVENT_CLASS = "dragpos__drag"

// option
export interface DragPosOptions {
    // primary key
    key?: string,
    // drag target container
    ele?: HTMLElement | string,
    // set drag event background color
    backgroundColor?: null,
    // set drag event font color
    fontColor?: null,
    // set drag event font size
    fontSize?: null,
}