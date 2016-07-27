export const changePageTitle = (localId, newTitle) => {
    return {
        type: 'PAGE_CHANGE_TITLE',
        localId: localId,
        newTitle: newTitle
    }
}



export const newPage = (ownerPageLocalId, position) => {
    return {
        type: 'NEW_PAGE',
        ownerPageLocalId, position
    }
}


export const movePage = (sourcePageLocalId, destinationPageLocalId, position) => {
    return {
        type: 'MOVE_PAGE',
        sourcePageLocalId, destinationPageLocalId, position
    }
}


export const changeTreeState = (pageLocalId, newStateInfo) => {
    return {
        type: 'CHANGE_PAGE_TREE_STATE',
        pageLocalId, newStateInfo
    }
}


