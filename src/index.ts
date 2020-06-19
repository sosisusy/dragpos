import DragPos from "./DragPos"
import { DragPosOptionCollection } from "./Config"

declare global {
    interface Window {
        DragPos: Object,
        // 드래그옵션 저장
        dragposOptionStore: DragPosOptionCollection,
    }
}


window.DragPos = DragPos;
window.dragposOptionStore = {
    mapping: {},
    options: [],
    group: {},
}
export default DragPos