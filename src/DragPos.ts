import _ from "lodash"
import {
    DRAG_START_CLASS,
    DragPosOptions,
    DRAG_DEFAULT_STYLE_ID,
    DRAG_KEY_ATTRIBUTE,
    DefaultOption
} from "./Config"
import DragEvent from "./DragEvent"
import CryptoJS from "crypto-js"

let primaryIndex = 1

class DragPos {

    constructor(ele?: HTMLElement | string, option: DragPosOptions = {}) {
        if (ele) {
            option.ele = ele
            this.runDragPos(option)
        }
    }

    // 추가 생성
    new(option: DragPosOptions = {}) {
        this.runDragPos(option)
    }

    // 옵션 정보 추가
    appendStore(option: DragPosOptions) {
        let store = window.dragposOptionStore,
            primaryKey = option.key as string

        store.options.push(option)
        if (option.group) {
            if (!store.group[option.group]) store.group[option.group] = []
            store.group[option.group].push(primaryKey)
        }
        store.mapping[primaryKey] = store.options.length - 1
    }

    /**
     * 기본 스타일 적용
     */
    applyDefaultStyle() {
        let style = document.querySelector(`.${DRAG_DEFAULT_STYLE_ID}`)

        if (style) return

        style = document.createElement("style")
        style.id = DRAG_DEFAULT_STYLE_ID

        style.innerHTML = ``
        document.head.appendChild(style)
    }

    /**
     * apply style option
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

            style.innerHTML = `[${DRAG_KEY_ATTRIBUTE}="${option.key}"] .${DRAG_START_CLASS}{${styleOption}}`
            document.head.appendChild(style)
        }
    }

    /**
     * 동작
     */
    runDragPos(option: DragPosOptions) {
        option = { ...DefaultOption, ...option }
        let ele = option.ele as HTMLElement | string

        // ele selector chk
        if (typeof ele === "string") {
            ele = document.querySelector(ele) as HTMLElement
            option.ele = ele
        }

        // element not found
        // if (!ele) throw new Error("Element not found")
        if (!ele) return

        // 고유키 설정
        option.key = CryptoJS.AES.encrypt(`${primaryIndex++}}`, "sosisusy/dragpos").toString().replace(/\W/g, "").substr(10, 15)
        ele.setAttribute(DRAG_KEY_ATTRIBUTE, option.key)

        // 스타일 적용
        this.applyDefaultStyle()
        this.applyStyleOption(option)

        switch (ele.tagName) {
            default:
                _.map(ele.children, (child) => {
                    child.setAttribute("draggable", "true")

                    if (option.controller) {
                        let controller = document.querySelector(option.controller) as HTMLElement
                        child.removeAttribute("draggable")
                        controller.addEventListener("mousedown", (e) => DragEvent.handleMouseDown(e, option))
                    }

                    child.addEventListener("dragstart", (e) => DragEvent.handleDragStart(e, option))
                    child.addEventListener("dragover", (e) => DragEvent.handleDragOver(e, option))
                    child.addEventListener("dragend", (e) => DragEvent.handleDragEnd(e, option))
                })
        }

        this.appendStore(option)
    }
}

export default DragPos