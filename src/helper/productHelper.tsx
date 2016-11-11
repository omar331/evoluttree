import { Map, List, fromJS } from 'immutable'
import { v4 } from 'node-uuid'



import { QuickLevelMove } from '../components/constants.tsx'

import { PageInfo } from '../components/model/PageInfo'


/**
 * Prepare the product being edited
 * Add a localId to each node of editing product tree.
 *
 * Every node in the state must have an localId.
 *
 * In this stage, editing product must be just a plai javascript object.
 *
 */
export const prepareEditingProduct = (productInfo:any) => {
    let editing = productInfo

    editing.general.localId = v4()
    editing = setupEditingPages(editing)

    return editing
}


/**
 * Add a local id to page and to its children pages
 *
 * @param page
 * @returns {any}
 */
const setupEditingPages = (page:any) => {
    page.localId = v4()
    page.collapsed = true

    if ( page.pages && page.pages.length > 0 ) {
        for(let i = 0; i < page.pages.length; i++) {
            page.pages[i] = setupEditingPages(page.pages[i])
        }
    }

    return page
}


/**
 * Add a local id to page and to its children pages
 *
 * @param page
 * @returns {any}
 */
const prepareClonePages = (page:any) => {
    page.localId = v4()

    if ( page.pages && page.pages.length > 0 ) {
        for(let i = 0; i < page.pages.length; i++) {
            page.pages[i] = prepareClonePages(page.pages[i])
        }
    }

    return Map(page)
}


/**
 * Changes title of product currently being edited
 * @param state
 * @param newTitle
 * @returns {Map<K, V>|Cursor|List<T>}
 */
export const changeProductTitle = (state:any, newTitle:string ) => {
    return state.setIn(
        ['editing', 'general', 'title'],
        newTitle
    )
}





/**
 * Get keyPath to a certain page within the state
 *
 * @param Map node the root node to page hierarchy
 * @param string localId local id to be found
 * @param integer position position in the current hierarchy level (used only for recursion purposes)
 * @param array acc keyPath being generated (used only for recursion purposes)
 * @returns {array}
 */
export const searchPageKeyPath = (node:any, localId:string, position:number = 0, acc:any = [] ):any => {
    // when the node is found...
    if ( node.get('localId') == localId ) return ['pages', position]

    // otherwise keep searching
    let childrenPages = node.get('pages')
    if ( typeof childrenPages == 'undefined' ) return null

    for(let position = 0; position < childrenPages.size; position++ ) {
        let page = childrenPages.get( position )
        let res = searchPageKeyPath(page, localId, position, ['pages', position ] )
        if ( res != null  ) return acc.concat(res)
    }

    return null
}



/**
 * Create a new page node
 * @param info
 * @returns {any}
 */
export const createPageNode:(info:PageInfo)=>any = (info:PageInfo) => {
    if (!info.hasOwnProperty('localId')) info.localId = v4();

    return Map(info)
}


/**
 * Add a page to a page node as child
 * 
 * @param state
 * @param parentPageLocalId
 * @param pageToInsert
 * @returns {any}
 * 
 * 
 */
export const addChildToPage = (state:any, parentPageLocalId:string, pageToInsert:any) => {
    // TODO: add 'position' parameter

    let page = getPageByLocalId( state, parentPageLocalId )
    let pageKeyPath = searchPageKeyPath( state.get('editing'), parentPageLocalId)

    let childPages = page.get('pages')

    if ( ! childPages ) page = page.set('pages', List() )

    page = page.set('pages',  page.get('pages').push(pageToInsert) )

    const newState = state.setIn(['editing'].concat(pageKeyPath), page)

    return newState
} 



/**
 * Find the page predecessor
 *
 * @param state
 * @param localId
 * @param asObject
 * @returns Map|string|null
 */
export const findPagePredecessor = (state:any, localId:string, asObject:boolean = false) => {
    let pageKeypath = searchPageKeyPath( state.get('editing'), localId )

    // page not found
    if ( pageKeypath == null ) return null
    
    let pageIndex = pageKeypath.pop()
    
    // page has no predecessor
    if ( pageIndex == 0 ) return null
    
    // determine predecessor keyPath
    let predecessorIndex = --pageIndex
    pageKeypath.push( predecessorIndex )

    pageKeypath = ['editing'].concat(pageKeypath)
    let pageNode = state.getIn( pageKeypath )

    if ( pageNode == null ) return null

    // return a node (map) object or just the page's localId ?
    return asObject ? pageNode : pageNode.get('localId')
}



/**
 * Find parent's page
 * @param state
 * @param localId
 * @param asObject
 * @returns {any}
 */
export const findParentPage = (state:any, localId:string, asObject:boolean = false ) => {
    let pageKeypath = searchPageKeyPath( state.get('editing'), localId )

    // page not found
    if ( pageKeypath == null ) return null

    pageKeypath.splice(-2, 2)

    pageKeypath = ['editing'].concat(pageKeypath)
    let pageNode = state.getIn( pageKeypath )

    if ( pageNode == null ) return null

    // return a node (map) object or just the page's localId ?
    return asObject ? pageNode : pageNode.get('localId')
}




/**
 *
 * @param state
 * @param ownerPageLocalId
 * @param position
 * @param pageNodeToInsert
 * @returns {any}
 */
export const insertPage = (state:any, ownerPageLocalId:string, position:number, pageNodeToInsert:any) => {
    const ownerPageKeyPath = searchPageKeyPath(state.get('editing'), ownerPageLocalId );

    let pagesNode:any
    let keyPathApply = ['editing'].concat(ownerPageKeyPath)
    keyPathApply.pop()

    pagesNode = state.getIn(keyPathApply)

    const pagesList = pagesNode
    const newPagesList = pagesList.insert( position, pageNodeToInsert)

    return state.setIn( keyPathApply, newPagesList )
}


export const movePage = (state:any, sourcePageLocalId:string, destinationPageLocalId:string, position:number) =>
{
    let tempSourcePageLocalId = sourcePageLocalId + '-moved'

    // get the source page and clone it
    let sourcePageNode = getPageByLocalId( state, sourcePageLocalId )
    sourcePageNode = sourcePageNode.set('localId', tempSourcePageLocalId )

    // ---> insert the cloned page into new location
    const newState = insertPage(state, destinationPageLocalId, position, sourcePageNode )

    // remove the page from the state
    const newState1 = removePageByLocalId( newState, sourcePageLocalId )

    const newState2 = changePageInfo( newState1, tempSourcePageLocalId, {localId: sourcePageLocalId})

    const newState3 = changeCollapseStateAllUpperPageLevels( newState2, sourcePageLocalId, false )

    const newState4 = pageHasJustChanged( newState3, sourcePageLocalId )



    return newState4
}


/**
 * Mark a page as 'just changed' and put it in a queue to be sanitized
 * @param state
 * @param localId
 * @returns {Map<K, V>|Set<T>|Stack<T>|List<T>}
 */
export const pageHasJustChanged = (state:any, localId:any) => {
    return state.withMutations( (mState) => {

        // mark the page as just changed
        mState = changePageInfo( mState, localId, {justChanged: true})

        // put the page in the sanitizing queue
        let pagesJustChanged = mState.getIn(['editing', 'misc', 'pagesJustChanged']).toJS()
        pagesJustChanged.push(localId)

        mState.setIn(['editing', 'misc', 'pagesJustChanged'], fromJS(pagesJustChanged) )
    })
}


/**
 * Sanitize the 'just changed' page queue
 * @param state
 * @returns {Map<K, V>|Set<T>|Stack<T>|List<T>}
 */
export const pageHasJustChangedSanitize = (state:any) => {
    return state.withMutations( (mState) => {

        let pagesJustChanged = mState.getIn(['editing', 'misc', 'pagesJustChanged']).toJS()

        let pageLocalId = pagesJustChanged.shift()

        if ( pageLocalId ) {
            mState = changePageInfo( mState, pageLocalId, {justChanged: false} )
            mState.setIn(['editing', 'misc', 'pagesJustChanged'], fromJS(pagesJustChanged) )
        }
    })
}



/**
 * Gets a page by its localId
 * @param localId
 * @returns {any}
 */
export const getPageByLocalId = ( state:any, localId : string ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), localId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    return state.getIn( sourceKeyPath )
}



export const removePageByLocalId = ( state:any, localId : string ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), localId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    // decides if the parent 'pages' node must be removed
    let removeParentPagesNode = false

    let parentKeyPath = sourceKeyPath.slice(0)
    parentKeyPath.pop()

    const parentNode = state.getIn( parentKeyPath )
    if ( parentNode.size == 1 ) removeParentPagesNode = true

    // remove the page
    const newState0 = state.removeIn( sourceKeyPath )

    // if it's necessary to remove the parent 'pages' node...
    let newState1 = newState0
    if ( removeParentPagesNode ) {
        newState1 = newState0.removeIn(parentKeyPath)
    }

    return newState1
}


export const clonePageByLocalId = (state:any, sourcePageLocalId:string, position:number) => {

    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), sourcePageLocalId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    let destinationPageLocalId = sourcePageLocalId

    // get the source page and clone it
    let sourcePageNode = getPageByLocalId( state, sourcePageLocalId )

    console.log(sourcePageNode)

    //sourcePageNode = sourcePageNode.set('localId', sourcePageLocalId )

    let pagesPrepared = prepareClonePages( sourcePageNode.toJS() );

    // ---> insert the cloned page into new location
    const newState = insertPage( state, destinationPageLocalId, position, pagesPrepared )

    return newState
}



/**
 * ...
 * is the page node collapsed or not?
 * @param state
 * @param pageLocalId
 * @param newStateInfo
 * @returns {any}
 */
export const changePageTreeState = ( state:any, pageLocalId:string, newStateInfo:any ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), pageLocalId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    const newState = state.setIn( sourceKeyPath.concat(['collapsed']), newStateInfo.collapsed )

    return newState
}


/**
 * Get the position (order) of the page in the level where
 * it's located.
 * 
 */
export const getPageOrderInLevel = (state:any, pageLocalId:string) => {
    let pageKeypath = searchPageKeyPath( state.get('editing'), pageLocalId )

    if ( ! pageKeypath ) return null

    return pageKeypath.pop()
}


/**
 * Move the page to a level up or down in hierarchy. It's related to 
 * dragging slightly the page node to left or right.
 *
 * The movements happens the following ways:
 *
 * - if the direction is down the node is moved to be its predecessor child
 * - if the direction is up it will be placed as its parent successor
 *
 * @param state
 * @param direction
 * @param pageLocalId
 * @returns {any}
 */
export const quickLevelMove = ( state:any, direction:string, pageLocalId:string ) => {
    switch (direction) {
        case QuickLevelMove.DIRECTION_UP:
            let parentLocalId = findParentPage( state, pageLocalId )

            if ( !parentLocalId ) return state

            let parentOrderInLevel = getPageOrderInLevel(state, parentLocalId)


            return state.withMutations( (stateM) => {
                stateM = movePage(stateM,pageLocalId, parentLocalId, parentOrderInLevel + 1 )

                stateM = changePageTreeState(stateM, parentLocalId, {collapsed: true})
                stateM = pageHasJustChanged( stateM, parentLocalId )
            })
        case QuickLevelMove.DIRECTION_DOWN:
            let predecessor = findPagePredecessor(state, pageLocalId )

            // there's no predecessor...
            if ( ! predecessor ) return state

            let pageMoving = getPageByLocalId(state, pageLocalId)


            return state.withMutations( (stateM) => {

                stateM = pageHasJustChanged( stateM, predecessor )

                // remove from its original position
                stateM = removePageByLocalId(stateM, pageLocalId)

                stateM = changePageTreeState(stateM, predecessor, {collapsed: false})

                stateM = addChildToPage(stateM, predecessor, pageMoving )

                stateM = pageHasJustChanged( stateM, pageLocalId )
            })
        default:
            return state
    }
}


/**
 * Changes properties of a certain page
 * @param state
 * @param localPageId
 * @param modifiedProperties
 * @returns {any}
 */
export const changePageInfo = (state:any, localPageId:string, modifiedProperties:any ) => {
    const pageKeyPath = searchPageKeyPath(state.get('editing'), localPageId )

    let page = getPageByLocalId(state, localPageId)
    page = page.merge( Map(modifiedProperties) )

    return  state.setIn( ['editing'].concat(pageKeyPath), page )
}


/**
 * Set page being dragged
 * @param state
 * @param pageInfo
 * @returns {List<T>|Map<K, V>}
 */
export const setPageBeingDragged = (state:any, pageInfo:any ) => {
    return state.setIn(['editing', 'misc', 'pageItemBeingDragged'], pageInfo)
}


/**
 * Unset the page being dragged
 * @param state
 * @param pageInfo
 * @returns {List<T>|Map<K, V>}
 */
export const unsetPageBeingDragged = (state:any, pageInfo:any ) => {
    return state.setIn(['editing', 'misc', 'pageItemBeingDragged'], null)
}



export const changeCollapseStateAllUpperPageLevels = (state:any, localId:string, newCollapseState:boolean ) => {
    let path = searchPageKeyPath(state.get('editing'), localId )

    path.splice(-2,2)

    let newState = state.withMutations( (mState:any) => {
        let editing = mState.get('editing')

        while ( path.length > 0 ) {
            editing = editing.setIn( path.concat(['collapsed']), newCollapseState)

            // remove 2 last elements
            path.splice(-2,2)
        }


        mState = mState.setIn( ['editing'], editing )
    })


    return newState
}