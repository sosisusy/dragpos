# Dragpos ![](https://img.shields.io/npm/l/dragpos) ![](https://img.shields.io/npm/v/dragpos) ![](https://img.shields.io/github/package-json/v/sosisusy/dragpos) ![](https://img.shields.io/bundlephobia/min/dragpos) ![](https://img.shields.io/npm/dm/dragpos)

Dragpos는 자바스크립트 라이브러리입니다.
Element 리스트 순서를 재정렬 할 수 있게 도와줍니다.


#### 데모 페이지
<https://sosisusy.github.io/dragpos/>

### Getting Started
npm:
```
npm i dragpos
```

샘플 코드:
```javascript
import DragPos from "dragpos"

// example 클래스를 가지는 노드에 정렬 헬퍼 등록
const dragpos = new DragPos(document.querySelector(".example"), {
    backgroundColor: "#eee"
})

// 새로운 타겟 설정
// 기존 헬퍼는 지워지지 않고 새로운 헬퍼 추가
const e2 = document.getElementById("example2")
dragpos.new({
    ele: e2,
    controller: ".controller",
    backgroundColor: "#eee",
    onDrop: (e, option) => {      // 이벤트 종료 후 리스너
        fetch("http://example.com/")
        .then(res => res.text())
        .then(res => console.log(res))
    }
})

const dragpos = new DragPos(element, )
```

옵션:
```javascript
{
    ele: HTMLElement | String       // 타겟 지정
    group: String,                  // 드래그 그룹 지정
    backgroundColor: String,        // 드래그 이벤트 발생 시 타겟 배경색 변경
    fontColor: String,              // 드래그 이벤트 발생 시 타겟 글자 색상
    fontSize: Number,               // 드래그 이벤트 발생 시 타겟 글자 크기
    fontFamily: String,             // 드래그 이벤트 발생 시 폰트 설정
    controller: String,             // 리스트 목록을 움직일 대체자 (셀렉터로 지정)
    onDrop: Function,               // 위치변경 완료 후 이벤트  params(event, option)
}
```
