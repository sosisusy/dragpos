![](https://img.shields.io/npm/l/dragpos) ![](https://img.shields.io/npm/v/dragpos) ![](https://img.shields.io/github/package-json/v/sosisusy/dragpos) ![](https://img.shields.io/bundlephobia/min/dragpos) ![](https://img.shields.io/npm/dm/dragpos)

# Dragpos

Dragpos is typescript library.
Helps to rearrange the list.

#### Demo
<https://sosisusy.github.io/dragpos/>

### Getting Started

#### install
```shell
npm i dragpos
```

#### import
```html
<script src="dragpos/dist/dragpos.js"></script>
<script>
    const dragpos = new DragPos(element, option)
</script>
```
```javascript
import DragPos from "dragpos"
const dragpos = new DragPos(element, option)
```

#### example

```typescript
import DragPos from "dragpos"

// Alignment helper registration for nodes with example class
const dragpos = new DragPos(document.querySelector(".example"), {
    backgroundColor: "#eee"
})

// Existing helpers are not erased and new helpers are added
const e2 = document.getElementById("example2")
dragpos.new({
    ele: e2,
    handler: ".handler",      // selector
    backgroundColor: "#eee",
    onDragEnd: (e, option) => {
        fetch("http://example.com/")
        .then(res => res.text())
        .then(res => console.log(res))
    }
})
```

#### option
| Attribute | Type |     |
|:----|:----|:----|
| ele | `HTMLElement` `String` | Specifying a list container |
| group | `String` | Group naming |
| handler | `String` | Assign handler |
| backgroundColor | `String` | Specify background color |
| fontColor | `String` | Specify font color |
| fontSize |`Number` | Specify font size |
| fontFamily | `String` | Specify font |
| animation | `Number` | Animation rate |
   
   
|Listener|Params|   |
|:---|:---|:---|
| onDragStart | `Event`, `Option` | Occurred when the dragging starts |
| onDragOver | `Event`, `Option` | Occurred when the dragging over |
| onDragEnd | `Event`, `Option` | Occurred when the dragging ends |
| onChange | `Event`, `Option` | Occurred when element is changed |
