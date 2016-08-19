export const changeProductTitle = (newTitle:string, preventExternalHooks = false) => {
    return {
        type: 'PRODUCT_CHANGE_TITLE',
        newTitle, preventExternalHooks
    }
}

export const replaceState = (newState:any) => {
    return {
        type: 'REPLACE_STATE',
        newState
    }
}