/** config */
// 묵시적 반복문 최대 반복 수
export const LOOP_LIMIT = 100



/** default */
// 기본 그룹명
// 옵션 기본 값
export const DefaultOption: DragPosOptions = {
    // 
}



/** style */
// dragpos를 적용한 element 전체에게 공통으로 적용 될 스타일
export const DRAG_DEFAULT_STYLE_ID = "dragpos__default_style"



/** element class */
// 드래그 이벤트 발생 시 적용될 클래스
export const DRAG_START_CLASS = "dragpos__drag"
// 드래그 핸들러 클래스
export const DRAG_HANDLER_CLASS = "dragpos__handler"



/** dragpos attribute */
// 고유키가 담길 element 속성
export const DRAG_KEY_ATTRIBUTE = "data-dragpos-key"
// 애니메이션 진행 상태
export const DRAG_ANIMATION_STATUS = "data-animation-status"



/** option */
export interface DragPosOptions {
    // primary key
    key?: string,
    // drag target container
    ele?: HTMLElement | string,
    // 그룹화
    group?: string,
    // 드래그 시 타겟 배경색
    backgroundColor?: string,
    // 드래그 시 타겟 글자 색상
    fontColor?: string,
    // 드래그 시 타겟 글자 크기
    fontSize?: number,
    // 폰트 설정
    fontFamily?: string,
    // 리스트 목록을 움직일 대체자 (셀렉터로 지정)
    handler?: string,
    // animation rate (ms)
    animation?: number,

    // 이벤트 리스너  params(event, option)
    onDragStart?: Function,
    onDragOver?: Function,
    onDragEnd?: Function,
    onChange?: Function,

    /** todo */
    /** todo */
}

/** mapping */
export interface DragPosMappingCollection {
    // 옵션 저장소 인덱스를 저장
    [primaryKey: string]: number
}

/** group */
export interface DragPosGroupCollection {
    // 같은 그룹 아래 옵션들의 고유키를 배열 형태로 저장
    [groupName: string]: Array<string>
}

/** optionCollection */
export interface DragPosOptionCollection {
    // 옵션 저장소 인덱스 모음
    mapping: DragPosMappingCollection,
    // 옵션 저장소
    options: Array<DragPosOptions>,
    // 같은 그룹끼리
    group: DragPosGroupCollection,
}