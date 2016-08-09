export const changeProductTitle = (newTitle) => {
    return {
        type: 'PRODUCT_CHANGE_TITLE',
        newTitle
    }
}

export const replaceState = (newState) => {
    return {
        type: 'REPLACE_STATE',
        newState
    }
}