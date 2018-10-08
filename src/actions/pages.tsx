import { v4 } from 'node-uuid'

export const changePageTitle = (localId:string, newTitle:string) => {
    return {
        type: 'PAGE_CHANGE_TITLE',
        localId: localId,
        newTitle: newTitle
    }
}



export const newPage = (ownerPageLocalId:string, position:number, productId:any) => {
    return {
        type: 'NEW_PAGE',
        localId: v4(),
        ownerPageLocalId, position, productId
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

export const deletePage = (pageLocalId:string, preventExternalHooks:boolean = false) => {
    return {
        type: 'DELETE_PAGE',
        pageLocalId, preventExternalHooks
    }
}

export const clonePage = ( pageLocalId:string, position:number ) => {
    return {
        type: 'CLONE_PAGE',
        pageLocalId,
        position
    }
}
