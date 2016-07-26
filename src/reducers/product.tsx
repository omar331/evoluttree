import { searchPageKeyPath, createPageNode, insertPage } from '../helper/productHelper'

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
            // new page to be created
            const newPageNode = createPageNode({title: 'página sem titulo'})

            // insert the page
            return insertPage(
                              state,
                              action.ownerPage.get('localId'),
                              action.order + 1,
                              newPageNode
                            )
        default:
            return state
    }
}

export default productReducer
