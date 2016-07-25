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
    id: string,
    localId: string,
    title: string
}

/**
 * Create a new page node
  * @param info
 * @returns {any}
 */
export const createPageNode  = (info: PageInfo  ) => {
    return Map(
        {
            localId: v4(),
            id: info.id,
            title: info.title
        }        
    )
}


