export interface EvoluttreeConfig {
    hookActionsToExternal: Function,
    onStartEditPageBody: any,
    onContentChange?: Function
}

export interface AppProps {
    config: EvoluttreeConfig,
    editingProduct?: any
    customComponents?: any
}
