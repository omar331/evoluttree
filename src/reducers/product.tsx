import { searchPageKeyPath, createPageNode, insertPage, movePage } from '../helper/productHelper'

const productReducer = (state, action) => {
    let newState

    switch (action.type) {
        case 'PRODUCT_CHANGE_TITLE':
            return state.setIn(
                ['editing', 'general', 'title'],
                action.newTitle

            )
        case 'PAGE_CHANGE_TITLE':
            const pageKeyPath = searchPageKeyPath(state.get('editing'), action.localId );

            // get keyPath to desired page node
            let keyPath = ['editing'].concat( pageKeyPath ).concat( ['title'] )

            newState = state.setIn( keyPath, action.newTitle )

            return newState
        case 'NEW_PAGE':
            // page being created
            const newPageNode = createPageNode({title: null})

            // inserts the page
            return insertPage(
                              state,
                              action.ownerPageLocalId,
                              action.position,
                              newPageNode
                            )
        case 'MOVE_PAGE':
            return movePage(state, action.sourcePageLocalId, action.destinationPageLocalId, action.position)
        default:
            return state
    }
}

export default productReducer
