export const changePageTitle = (localId, newTitle) => {
    return {
        type: 'PAGE_CHANGE_TITLE',
        localId: localId,
        newTitle: newTitle
    }
}

export const newPage = (ownerPage, parentPage, order) => {
    return {
        type: 'NEW_PAGE',
        ownerPage, parentPage, order
    }
}


