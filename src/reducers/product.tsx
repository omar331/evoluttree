import { searchPageKeyPath } from '../helper/productHelper'

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
            newState = state
    
            console.log(' ACTION =%o ', action)

            const ownerPage = action.ownerPage
            const parentPage = action.parentPage

            const ownerPageLocalId = action.ownerPage.get('localId')
            const ownerPageKeyPath = searchPageKeyPath(state.get('editing'), ownerPageLocalId );
            
            console.log(' Owner page    id =%s     path = %o', ownerPageLocalId, ownerPageKeyPath)

            if ( parentPage ) {
                const parentPageLocalId = parentPage.get('localId')
                const parentPageKeyPath = searchPageKeyPath(state.get('editing'), parentPageLocalId )

                console.log(' Parent page    id =%s     path = %o', parentPageLocalId, parentPageKeyPath)
            }





            return newState
        default:
            return state
    }
}

export default productReducer
