import { cubicOut } from "svelte/easing";
export function horizontalSlide(
        node: any,
        { delay = 0, duration = 300, easing = cubicOut  }
    ) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const width = parseFloat(style.width);
        const paddingLeft = parseFloat(style.paddingLeft);
        const paddingRight = parseFloat(style.paddingRight);
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        const borderLeftWidth = parseFloat(style.borderLeftWidth);
        const borderRightWidth = parseFloat(style.borderRightWidth);

        return {
            delay,
            duration,
            easing,
            css: (t: any) =>
                `overflow: hidden;` +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `width: ${t * width}px;` +
                `padding-left: ${t * paddingLeft}px;` +
                `padding-right: ${t * paddingRight}px;` +
                `margin-left: ${t * marginLeft}px;` +
                `margin-right: ${t * marginRight}px;` +
                `border-left-width: ${t * borderLeftWidth}px;` +
                `border-right-width: ${t * borderRightWidth}px;`,
        };
    }
