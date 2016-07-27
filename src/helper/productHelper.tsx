import { v4 } from 'node-uuid';
import { Map } from 'immutable';

/**
 * Get keyPath to a certain page within the state
 *
 * @param Map node the root node to page hierarchy
 * @param string localId local id to be found
 * @param integer position position in the current hierachy level (used only for recursion purposes)
 * @param array acc keyPath being generated (used only for recursion purposes)
 * @returns {array}
 */
export const searchPageKeyPath = (node, localId, position = 0, acc = [] ):any => {
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


interface  PageInfo {
    id?: string,
    localId?: string,
    title: string
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
 * 
 * @param state
 * @param ownerPageLocalId
 * @param position
 * @param pageNode
 * @returns {any}
 */
export const insertPage = (state, ownerPageLocalId, position, pageNode) => {
    const ownerPageKeyPath = searchPageKeyPath(state.get('editing'), ownerPageLocalId );

    let pagesNode
    let keyPathApply = ['editing'].concat(ownerPageKeyPath)
    keyPathApply.pop()

    pagesNode = state.getIn(keyPathApply)

    const pagesList = pagesNode
    const newPagesList = pagesList.insert( position, pageNode)

    return state.setIn( keyPathApply, newPagesList )
}


export const movePage = (state, sourcePageLocalId, destinationPageLocalId, position) =>
{
    // get the source page
    const sourcePageNode = getPageByLocalId( state, sourcePageLocalId )

    const newState1 = removePageByLocalId( state, sourcePageLocalId )

    // ---> insert the page into its new location
    const newState = insertPage(newState1, destinationPageLocalId, position, sourcePageNode )

    return newState
}


/**
 * Gets a page by its localId
 * @param localId
 * @returns {any}
 */
export const getPageByLocalId = ( state, localId : string ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), localId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    return state.getIn( sourceKeyPath )
}



export const removePageByLocalId = ( state, localId : string ) => {
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


export const changePageTreeState = ( state, pageLocalId, newStateInfo ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), pageLocalId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    const newState = state.setIn( sourceKeyPath.concat(['collapsed']), newStateInfo.collapsed )

    return newState
}

