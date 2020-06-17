import _ from "lodash"
import { DRAG_EVENT_CLASS, DragPosOptions } from "./Config"
import DragEvent from "./DragEvent"

import CryptoJS from "crypto-js"

let INCREMENT = 1

class DragPos {

    constructor(ele?: HTMLElement | string, option: DragPosOptions = {}) {
        if (ele) {
            option.ele = ele
            this.runDragPos(option)
        }
    }

    // 추가 생성
    new(option: DragPosOptions) {
        this.runDragPos(option)
    }

    /**
     * apply style option
     * @param {object} option 
     */
    applyStyleOption(option: DragPosOptions) {
        let eleId = (option.ele as HTMLElement).id,
            styleId = `${eleId}_dragpos__style`,
            style = document.querySelector(styleId)

        if (!style) {
            let styleOption = ""

            style = document.createElement("style")
            style.id = styleId

            // 스타일 설정
            if (option.backgroundColor) styleOption += `background-color:${option.backgroundColor};`
            if (option.fontColor) styleOption += `color:${option.fontColor};`
            if (option.fontSize) styleOption += `font-size:${option.fontSize}px;`

            style.innerHTML = `[data-dragpos-key="${option.key}"] .${DRAG_EVENT_CLASS}{${styleOption}}`
            document.head.appendChild(style)
        }
    }

    /**
     * 동작
     * @param {Object} option 
     */
    runDragPos(option: DragPosOptions = {}) {
        let ele = option.ele as HTMLElement | string

        // selector chk
        if (typeof ele === "string") {
            ele = document.querySelector(ele) as HTMLElement
            option.ele = ele
        }

        // 고유키 설정
        option.key = CryptoJS.AES.encrypt(`${INCREMENT++}}`, "12asdasd3").toString().replace(/\W/g, "").substr(10, 15)
        ele.setAttribute("data-dragpos-key", option.key)

        // 스타일 적용
        this.applyStyleOption(option)

        switch (ele.tagName) {
            default:
                _.map(ele.children, (child) => {
                    child.setAttribute("draggable", "true")
                    child.addEventListener("dragstart", (e) => DragEvent.handleDragStart(e, option))
                    child.addEventListener("dragover", (e) => DragEvent.handleDragOver(e, option))
                    child.addEventListener("dragend", (e) => DragEvent.handleDragEnd(e, option))
                })
        }
    }
}

export default DragPos