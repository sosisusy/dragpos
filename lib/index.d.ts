import DragPos from "./DragPos";
import { DragPosOptionCollection } from "./Config";
declare global {
    interface Window {
        DragPos: Object;
        dragposOptionStore: DragPosOptionCollection;
    }
}
export default DragPos;
