declare const animation: {
    targetMove(container: HTMLElement, moveTarget: HTMLElement, target: HTMLElement, rate: number): void;
    animate(container: HTMLElement, from: HTMLElement, to: HTMLElement | null, rate: number): void;
};
export default animation;
