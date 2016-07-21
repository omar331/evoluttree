export const changePageTitle = (localId, newTitle) => {
    return {
        type: 'PAGE_CHANGE_TITLE',
        localId: localId,
        newTitle: newTitle
    }
}
