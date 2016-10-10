/**
 * Our frontend speaks in terms of localId's. API talks in terms
 * of database IDs.
 *
 * This middleware converts frontend user actions (like drag and drops)
 * to a more suitable format that may be used by external applications,
 * like HTTP Rest calls.
 *
 * @param store
 */
import * as productHelper from './productHelper'
import { QuickLevelMove } from '../components/constants';

export const mapActionToAPIParameters = (store:any) => (next:any) => (action:any) =>  {
    const currentState = store.getState()
    let page:any, sourcePage:any, direction:any

    next(action)

    /*
     Sometimes calling hooks are not desired. To prevent external hooks action
     just add preventExternalHooks == true   to action
     */
    if ( action.hasOwnProperty("preventExternalHooks") && action.preventExternalHooks === true ) return

    switch (action.type) {
        case 'PRODUCT_CHANGE_TITLE':
            const productId = currentState.getIn(['editing', 'general', 'id'])

            if ( productId ){
                next({
                    type: 'HOOK_CHANGE_PRODUCT_TITLE',
                    productId: productId,
                    newTitle: action.newTitle
                })
            }
            break;
        case 'NEW_PAGE':
            let referencedPageId:string
            let referencedPagePlacement:string = 'after'

            const pageBefore = productHelper.getPageByLocalId(currentState, action.ownerPageLocalId)

            if ( pageBefore ) {
                referencedPageId = pageBefore.get('id')
                referencedPagePlacement = 'after'
            }

            next({
                type: 'HOOK_NEW_PAGE',
                localId: action.localId,
                referencedPage:{
                    id: referencedPageId,
                    placement: referencedPagePlacement
                }
            })
            break;
        case 'PAGE_CHANGE_TITLE':
            page = productHelper.getPageByLocalId(currentState, action.localId)

            if ( page != null && page.get('id') ){
                next({
                    type: 'HOOK_CHANGE_PAGE_TITLE',
                    pageId: page.get('id'),
                    newTitle: action.newTitle
                })
            }
            break;
        case 'CHANGE_PAGE_INFO':
            page = productHelper.getPageByLocalId(currentState, action.localPageId)

            if ( page != null && page.get('id') ){
                next({
                    type: 'HOOK_CHANGE_PAGE_INFO',
                    pageId: page.get('id'),
                    modifiedInfo: action.pageInfo
                })
            }
            break
        case 'MOVE_PAGE':
            sourcePage = productHelper.getPageByLocalId(currentState, action.sourcePageLocalId)
            let destinationReferencedPage = productHelper.getPageByLocalId(currentState, action.destinationPageLocalId)


            let destinationReferencedPagePlacement = action.position == 0 ? 'before' : 'after'

            if ( (sourcePage == null) || (destinationReferencedPage == null )) break

            next({
                type: 'HOOK_MOVE_PAGE',
                sourcePageId: sourcePage.get('id'),
                destinationReferencedPageId: destinationReferencedPage.get('id'),
                placement: destinationReferencedPagePlacement
            })

            break
        case 'QUICK_LEVEL_MOVE':
            sourcePage = productHelper.getPageByLocalId(currentState, action.pageLocalId)
            direction = action.direction

            let newAction:any = {
                type: 'HOOK_MOVE_PAGE',
                sourcePageId: sourcePage.get('id')
            }

            switch (direction) {
                case QuickLevelMove.DIRECTION_UP:
                    let parentPage = productHelper.findParentPage(currentState, sourcePage.get('localId'), true )

                    console.log(' parent page = %o', parentPage )


                    newAction['destinationReferencedPageId'] = parentPage.get('id')
                    newAction['placement'] = 'after'

                    break
                case QuickLevelMove.DIRECTION_DOWN:
                    let predecessorPage = productHelper.findPagePredecessor(currentState, sourcePage.get('localId'), true )

                    if ( ! predecessorPage ) {
                        newAction = null
                        break
                    }

                    newAction['destinationReferencedPageId'] = predecessorPage.get('id')
                    newAction['placement'] = 'child'

                    break
                default:
                    newAction = null
                    break
            }

            if ( newAction != null ) next(newAction)

            break;
        case 'DELETE_PAGE':
            sourcePage = productHelper.getPageByLocalId(currentState, action.pageLocalId)

            next({
                type: 'HOOK_DELETE_PAGE',
                pageId: sourcePage.get('id')
            })

            break;
        default:
            break
    }

}