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


export const pageItemStartDrag = (pageInfo:any) => {
    return {
        type: 'PAGE_ITEM_START_DRAG',
        pageInfo
    }
}


export const pageItemEndDrag = (pageInfo:any) => {
    return {
        type: 'PAGE_ITEM_END_DRAG',
        pageInfo
    }
}


export const pageJustChangedSanitize = () => {
    return {
        type: 'PAGE_JUST_CHANGED_SANITIZE'
    }
}

