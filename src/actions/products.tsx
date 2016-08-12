export const changeProductTitle = (newTitle, preventExternalHooks = false) => {
    return {
        type: 'PRODUCT_CHANGE_TITLE',
        newTitle, preventExternalHooks
    }
}

export const replaceState = (newState) => {
    return {
        type: 'REPLACE_STATE',
        newState
    }
}