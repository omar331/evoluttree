import { searchPageKeyPath } from '../helper/productHelper'

const productReducer = (state, action) => {
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

            let newState = state.setIn( keyPath, action.newTitle )

            console.log(' new state = %o', newState.toJS() )

            return newState
        default:
            return state
    }
}

export default productReducer
