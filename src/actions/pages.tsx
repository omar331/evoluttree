export const changePageTitle = (localId:string, newTitle:string) => {
    return {
        type: 'PAGE_CHANGE_TITLE',
        localId: localId,
        newTitle: newTitle
    }
}



export const newPage = (ownerPageLocalId:string, position:number) => {
    return {
        type: 'NEW_PAGE',
        ownerPageLocalId, position
    }
}


export const movePage = (sourcePageLocalId:string, destinationPageLocalId:string, position:number) => {
    return {
        type: 'MOVE_PAGE',
        sourcePageLocalId, destinationPageLocalId, position
    }
}


export const changeTreeState = (pageLocalId:string, newStateInfo:number) => {
    return {
        type: 'CHANGE_PAGE_TREE_STATE',
        pageLocalId, newStateInfo
    }
}

export const quickLevelMove = (direction:string, pageLocalId:string) => {
    return {
        type: 'QUICK_LEVEL_MOVE',
        direction, pageLocalId
    }
}

export const changePageInfo = (localPageId:string, pageInfo:any, preventExternalHooks:boolean = false) => {
    return {
        type: 'CHANGE_PAGE_INFO',
        localPageId, pageInfo, preventExternalHooks
    }
}

export const deletePage = (pageLocalId:string) => {
    return {
        type: 'DELETE_PAGE',
        pageLocalId
    }
}


