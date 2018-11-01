export interface ProductEditProps {
    onStartEditPageBody?: any,
    customComponents?: any,
    onPageItemBeginDrag?: any,
    onPageItemEndDrag?: any,
    pages?: any,
    onNewPage?: any
}


export interface ModeSettings {
    componentsBarVisible: boolean,
    sideBarMd: number,
    contentMd: number
}

export interface ProductEditState {
    mode?: string,
    modeSettings?: ModeSettings,
    collapsed: boolean
}
