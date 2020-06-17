import DragPos from "./DragPos"

declare global {
    interface Window {
        DragPos: Object
    }
}

window.DragPos = DragPos;
export default DragPos