
export const DRAG_EVENT_CLASS = "dragpos__drag"

// option
export interface DragPosOptions {
    // primary key
    key?: string,
    // drag target container
    ele?: HTMLElement | string,
    // set drag event background color
    backgroundColor?: string,
    // set drag event font color
    fontColor?: string,
    // set drag event font size
    fontSize?: number,

    /** todo */
    // animation rate (ms)
    animation?: number,
    // 폰트 설정
    fontFamily?: string,
    // 이벤트 리스너
    onDrop?: Function,
    onDragStart?: Function,
    // 리스트에 마우스 올릴 시 커서
    overCursor?: string,
    /** todo */
}