import DragPos from "./DragPos"
import { DragPosOptionCollection } from "./Config"

declare global {
    interface Window {
        DragPos: Object,
        // 드래그옵션 저장
        dragposOptionStore: DragPosOptionCollection,
        // 현재 드래그 되고 있는 노드의 그룹 저장
        dragposTargetGroup: string,
        // 드래그 이벤트 진행 여부
        dragposEventRunning: boolean,
        // 드래그 이벤트 활성 여부
        dragposEventEnabled: boolean,
    }
}


window.DragPos = DragPos;
window.dragposOptionStore = {
    mapping: {},
    options: [],
    group: {},
}
window.dragposEventRunning = false
window.dragposEventEnabled = false
export default DragPos