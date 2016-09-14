import { changeProductTitle, createPageNode, insertPage,
          movePage, changePageTreeState, quickLevelMove,
          removePageByLocalId, changePageInfo
        }
    from '../helper/productHelper'

const productReducer = (state:any, action:any) => {

    console.log('Actions = %o', action)


    switch (action.type) {
        case 'REPLACE_STATE':
            return action.newState
        case 'PRODUCT_CHANGE_TITLE':
            return changeProductTitle(state, action.newTitle)
        case 'PAGE_CHANGE_TITLE':
            return changePageInfo(state, action.localId, {title: action.newTitle} )
        case 'NEW_PAGE':
            // creates the page
            const newPageNode = createPageNode({title: null, localId: action.localId })

            // inserts it
            return insertPage(
                              state,
                              action.ownerPageLocalId,
                              action.position,
                              newPageNode
                            )
        case 'MOVE_PAGE':
            return movePage(state, action.sourcePageLocalId, action.destinationPageLocalId, action.position)

        case 'CHANGE_PAGE_TREE_STATE':
            return changePageTreeState(state, action.pageLocalId, action.newStateInfo)

        case 'QUICK_LEVEL_MOVE':
            return quickLevelMove(state, action.direction, action.pageLocalId)
        case 'CHANGE_PAGE_INFO':
            return changePageInfo(state, action.localPageId, action.pageInfo )
        case 'DELETE_PAGE':
            return removePageByLocalId( state, action.pageLocalId )
        default:
            return state
    }
}

export default productReducer
