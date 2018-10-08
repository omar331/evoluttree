export interface EvoluttreeConfig {
    hookActionsToExternal: Function,
    onStartEditPageBody: any,
    onContentChange?: Function,
    dragDropContextManager?: boolean
}

export interface AppProps {
    config?: EvoluttreeConfig,
    editingProduct?: any,
    customComponents?: any
}
