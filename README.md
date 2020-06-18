# Dragpos ![](https://img.shields.io/npm/l/dragpos) ![](https://img.shields.io/npm/v/dragpos) ![](https://img.shields.io/github/package-json/v/sosisusy/dragpos) ![](https://img.shields.io/bundlephobia/min/dragpos) ![](https://img.shields.io/npm/dm/dragpos)

Dragpos는 타입스크립트 라이브러리입니다.
Element 리스트 순서를 재정렬 할 수 있게 도와줍니다.


### Getting Started
npm:
```
npm i dragpos
```

샘플 코드:
```
import DragPos from "dragpos"

const dragpos = new DragPos(element, {
    group: "group1",              // 드래그 그룹 지정
    backgroundColor: "#eee",      // 드래그 이벤트 발생 시 타겟 배경색 변경
    fontColor: "#333",            // 드래그 이벤트 발생 시 타겟 글자 색상
    fontSize: 15,                 // 드래그 이벤트 발생 시 타겟 글자 크기
    fontFamily: "sans-serif",     // 드래그 이벤트 발생 시 폰트 설정
    controller: ".controller",    // 리스트 목록을 움직일 대체자 (셀렉터로 지정)
    onDrop: (event, option)=>{},  // 위치변경 완료 후 이벤트  params(event, option)
})

```
