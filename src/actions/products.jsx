export const changeProductTitle = (newTitle, preventExternalHooks = false) => {
    return {
        type: 'PRODUCT_CHANGE_TITLE',
        newTitle, preventExternalHooks
    }
};

export const replaceState = (newState) => {
    return {
        type: 'REPLACE_STATE',
        newState
    }
};


export const pageItemStartDrag = (pageInfo) => {
    return {
        type: 'PAGE_ITEM_START_DRAG',
        pageInfo
    }
};


export const pageItemEndDrag = (pageInfo) => {
    return {
        type: 'PAGE_ITEM_END_DRAG',
        pageInfo
    }
};


export const pageJustChangedSanitize = () => {
    return {
        type: 'PAGE_JUST_CHANGED_SANITIZE'
    }
};


export const changeContent = (value) => {
    return {
        type: 'ANY_CONTENT_HAS_CHANGED',
        value
    }
};
