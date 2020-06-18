import DragPos from "./DragPos"
import { DragPosOptionCollection } from "./Config"

declare global {
    interface Window {
        DragPos: Object,
        dragposOptionStore: DragPosOptionCollection,
        dragposTargetGroup: string,
    }
}

window.DragPos = DragPos;
window.dragposOptionStore = {
    mapping: {},
    options: [],
    group: {},
}
export default DragPos