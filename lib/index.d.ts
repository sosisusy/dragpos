import DragPos from "./DragPos";
declare global {
    interface Window {
        DragPos: Object;
    }
}
export default DragPos;
