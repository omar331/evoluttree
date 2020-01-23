import { Map, List, fromJS } from 'immutable'
import uuidv4 from 'uuid/v4'


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
export const prepareEditingProduct = (productInfo, treeState) => {
    let editing = productInfo;


    if ( ! editing.general.hasOwnProperty('localId') ) {
        editing.general.localId = uuidv4();
    }
    editing = setupEditingPages(editing, treeState);

    return editing
};


/**
 * Add a local id to page and to its children pages
 *
 * @param page
 * @returns {any}   
 */
const setupEditingPages = (page, treeState) => {
    if ( ! page.hasOwnProperty('localId') ) {
        page.localId = uuidv4()
    }

    if ( ! page.hasOwnProperty('collapsed') ) {
        page.collapsed = true
    }

    if ( true ) {

    }



    if ( page.pages && page.pages.length > 0 ) {
        for(let i = 0; i < page.pages.length; i++) {
            page.pages[i] = setupEditingPages(page.pages[i], treeState)
        }
    }

    return page
};


/**
 * Prepare a page tree after cloning.
 * @param page
 * @returns {*}
 */
const setupEditingCloneTree = (page) => {
    page.cloneFrom = page.localId
    page.localId = uuidv4()

    if ( ! page.hasOwnProperty('collapsed') ) {
        page.collapsed = true
    }

    if ( page.pages && page.pages.length > 0 ) {
        for(let i = 0; i < page.pages.length; i++) {
            setupEditingCloneTree(page.pages[i])
        }
    }

    return page
};



/**
 * Changes title of product currently being edited
 * @param state
 * @param newTitle
 * @returns {Map<K, V>|Cursor|List<T>}
 */
export const changeProductTitle = (state, newTitle ) => {
    return state.setIn(
        ['editing', 'general', 'title'],
        newTitle
    )
}





/**
 * Get keyPath to a certain page within the state
 *
 * @param node node the root node to page hierarchy
 * @param localId localId local id to be found
 * @param position position position in the current hierarchy level (used only for recursion purposes)
 * @param acc acc keyPath being generated (used only for recursion purposes)
 * @returns {array}
 */
export const searchPageKeyPath = (node, localId, position = 0, acc = [] ) => {
    // when the node is found...
    if ( node.get('localId') === localId ) return ['pages', position]

    // otherwise keep searching
    let childrenPages = node.get('pages')

    if ( typeof childrenPages === 'undefined' || childrenPages === null ) return null

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
export const createPageNode = (info) => {
    if (!info.hasOwnProperty('localId')) info.localId = uuidv4();

    return Map(info);
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
export const addChildToPage = (state, parentPageLocalId, pageToInsert) => {
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
export const findPagePredecessor = (state, localId, asObject = false) => {
    let pageKeypath = searchPageKeyPath( state.get('editing'), localId )

    // page not found
    if ( pageKeypath == null ) return null;
    
    let pageIndex = pageKeypath.pop();
    
    // page has no predecessor
    if ( pageIndex === 0 ) return null;
    
    // determine predecessor keyPath
    let predecessorIndex = --pageIndex;
    pageKeypath.push( predecessorIndex );

    pageKeypath = ['editing'].concat(pageKeypath);
    let pageNode = state.getIn( pageKeypath );

    if ( pageNode == null ) return null;

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
export const findParentPage = (state, localId, asObject = false ) => {
    let pageKeypath = searchPageKeyPath( state.get('editing'), localId );

    // page not found
    if ( pageKeypath == null ) return null;

    pageKeypath.splice(-2, 2);

    pageKeypath = ['editing'].concat(pageKeypath);
    let pageNode = state.getIn( pageKeypath );

    if ( pageNode == null ) return null;

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
export const insertPage = (state, ownerPageLocalId, position, pageNodeToInsert) => {

    if ( ownerPageLocalId == null ){

        return insertPageInEditingEmpty( state, pageNodeToInsert );
    }

    const ownerPageKeyPath = searchPageKeyPath(state.get('editing'), ownerPageLocalId );


    let keyPathApply = ['editing'].concat(ownerPageKeyPath)
    keyPathApply.pop()

    const pagesList = state.getIn(keyPathApply);
    const newPagesList = pagesList.insert( position, pageNodeToInsert)

    return state.setIn( keyPathApply, newPagesList )
}

/**
 * Insert page in Editing. This method is called when there are no pages in the editing
 *
 * @param state
 * @param pageNodeToInsert
 * @returns {any}
 */
export const insertPageInEditingEmpty = ( state, pageNodeToInsert ) => {

    if ( state.get('editing').length < 0 ) return state;

    let editing = state.get('editing').toJS();

    editing.pages.push(pageNodeToInsert)

    return state.setIn( ['editing'], fromJS(editing) );
};

export const movePage = (state, sourcePageLocalId, destinationPageLocalId, position) =>
{
    let tempSourcePageLocalId = sourcePageLocalId + '-moved';

    // get the source page and clone it
    let sourcePageNode = getPageByLocalId( state, sourcePageLocalId );
    sourcePageNode = sourcePageNode.set('localId', tempSourcePageLocalId );

    // ---> insert the cloned page into new location
    const newState = insertPage(state, destinationPageLocalId, position, sourcePageNode );

    // remove the page from the state
    const newState1 = removePageByLocalId( newState, sourcePageLocalId );

    const newState2 = changePageInfo( newState1, tempSourcePageLocalId, {localId: sourcePageLocalId});

    const newState3 = changeCollapseStateAllUpperPageLevels( newState2, sourcePageLocalId, false );

    const newState4 = pageHasJustChanged( newState3, sourcePageLocalId );

    return newState4
};


/**
 * Mark a page as 'just changed' and put it in a queue to be sanitized
 * @param state
 * @param localId
 * @returns {Map<K, V>|Set<T>|Stack<T>|List<T>}
 */
export const pageHasJustChanged = (state, localId) => {
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
export const pageHasJustChangedSanitize = (state) => {
    return state.withMutations( (mState) => {

        let pagesJustChanged = mState.getIn(['editing', 'misc', 'pagesJustChanged']).toJS();

        let pageLocalId = pagesJustChanged.shift();

        if ( pageLocalId ) {
            mState = changePageInfo( mState, pageLocalId, {justChanged: false} );
            mState.setIn(['editing', 'misc', 'pagesJustChanged'], fromJS(pagesJustChanged) )
        }
    })
}



/**
 * Gets a page by its localId
 * @param state
 * @param localId
 * @returns {any}
 */
export const getPageByLocalId = ( state, localId ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), localId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    return state.getIn( sourceKeyPath )
}



export const removePageByLocalId = ( state, localId ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), localId)
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath)

    // decides if the parent 'pages' node must be removed
    let removeParentPagesNode = false;

    let parentKeyPath = sourceKeyPath.slice(0);
    parentKeyPath.pop();

    const parentNode = state.getIn( parentKeyPath );
    if ( parentNode.size === 1 ) removeParentPagesNode = true;

    // remove the page
    const newState0 = state.removeIn( sourceKeyPath );

    // if it's necessary to remove the parent 'pages' node...
    let newState1 = newState0;
    if ( removeParentPagesNode ) {
        newState1 = newState0.removeIn(parentKeyPath)
    }

    return newState1
}


export const clonePageByLocalId = (state, sourcePageLocalId, position) => {

    // get the source page and clone it
    let clonePageNode = getPageByLocalId( state, sourcePageLocalId ).toJS()
    setupEditingCloneTree( clonePageNode )

    clonePageNode.title =  clonePageNode.title + ' (clone)';


    console.log(' =====> clonePageNode = %o ', clonePageNode)


    // ---> insert the cloned page into new location
    return insertPage(state, sourcePageLocalId, position + 1, fromJS(clonePageNode) );
};



/**
 * ...
 * is the page node collapsed or not?
 * @param state
 * @param pageLocalId
 * @param newStateInfo
 * @returns {any}
 */
export const changePageTreeState = ( state, pageLocalId, newStateInfo ) => {
    let sourcePageKeyPath = searchPageKeyPath(state.get('editing'), pageLocalId);
    let sourceKeyPath = ['editing'].concat(sourcePageKeyPath);

    const newState = state.setIn( sourceKeyPath.concat(['collapsed']), newStateInfo.collapsed );

    return newState
};


/**
 * Get the position (order) of the page in the level where
 * it's located.
 * 
 */
export const getPageOrderInLevel = (state, pageLocalId) => {
    let pageKeypath = searchPageKeyPath( state.get('editing'), pageLocalId );

    if ( ! pageKeypath ) return null;

    return pageKeypath.pop()
};


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
export const quickLevelMove = ( state, direction, pageLocalId ) => {
    switch (direction) {
        case QuickLevelMove.DIRECTION_UP:
            let parentLocalId = findParentPage( state, pageLocalId );

            if ( !parentLocalId ) return state;

            let parentOrderInLevel = getPageOrderInLevel(state, parentLocalId)


            return state.withMutations( (stateM) => {
                stateM = movePage(stateM,pageLocalId, parentLocalId, parentOrderInLevel + 1 );

                stateM = changePageTreeState(stateM, parentLocalId, {collapsed: true});
                stateM = pageHasJustChanged( stateM, parentLocalId )
            });
        case QuickLevelMove.DIRECTION_DOWN:
            let predecessor = findPagePredecessor(state, pageLocalId );

            // there's no predecessor...
            if ( ! predecessor ) return state;

            let pageMoving = getPageByLocalId(state, pageLocalId);


            return state.withMutations( (stateM) => {

                stateM = pageHasJustChanged( stateM, predecessor );

                // remove from its original position
                stateM = removePageByLocalId(stateM, pageLocalId);

                stateM = changePageTreeState(stateM, predecessor, {collapsed: false});

                stateM = addChildToPage(stateM, predecessor, pageMoving );

                stateM = pageHasJustChanged( stateM, pageLocalId )
            });
        default:
            return state
    }
};


/**
 * Changes properties of a certain page
 * @param state
 * @param localPageId
 * @param modifiedProperties
 * @returns {any}
 */
export const changePageInfo = (state, localPageId, modifiedProperties ) => {
    const pageKeyPath = searchPageKeyPath(state.get('editing'), localPageId )

    let page = getPageByLocalId(state, localPageId);
    page = page.merge( Map(modifiedProperties) );

    return  state.setIn( ['editing'].concat(pageKeyPath), page );
};


/**
 * Set page being dragged
 * @param state
 * @param pageInfo
 * @returns {List<T>|Map<K, V>}
 */
export const setPageBeingDragged = (state, pageInfo ) => {
    return state.setIn(['editing', 'misc', 'pageItemBeingDragged'], pageInfo)
};


/**
 * Unset the page being dragged
 * @param state
 * @param pageInfo
 * @returns {List<T>|Map<K, V>}
 */
export const unsetPageBeingDragged = (state, pageInfo ) => {
    return state.setIn(['editing', 'misc', 'pageItemBeingDragged'], null)
};



export const changeCollapseStateAllUpperPageLevels = (state, localId, newCollapseState ) => {
    let path = searchPageKeyPath(state.get('editing'), localId );

    path.splice(-2,2);

    let newState = state.withMutations( (mState) => {
        let editing = mState.get('editing');

        while ( path.length > 0 ) {
            editing = editing.setIn( path.concat(['collapsed']), newCollapseState);

            // remove 2 last elements
            path.splice(-2,2)
        }


        mState = mState.setIn( ['editing'], editing )
    })


    return newState
}


/**
 * Set to true if any content has changed
 * @param state
 * @param value
 * @returns {any}
 */
export const anyContentHasChanged = ( state, value ) => {
    state = state.setIn(['contentChanged'], value);
    return state;
}


/**
 * Obtem os local-ids das páginas que estão expandidas
 * @param page
 * @returns {Array}
 */
export const getExpandCollapseTreeState = (page) => {
    let expanded = []

    if ( page.get('collapsed') != true ) {
        expanded.push( page.get('localId') )
    }

    let childPage = null

    if ( page.get('pages') ) {
        page.get('pages').map( (childPage) => {
            expanded = expanded.concat( getExpandCollapseTreeState(childPage) )
        })
    }

    return expanded
}


/**
 * Atualiza o estado expansão/colapso dos nós da árvore
 *
 * @param pages
 * @param expandedNodes
 * @param basePath
 */
const updateExpandCollapsePageList = (pages, expandedNodes, basePath = [] ) => {
    let n = 0

    let bPages = basePath.length === 0 ? pages : pages.getIn(basePath)

    if ( bPages == null || typeof bPages == 'undefined' ) return

    if ( bPages == null ) return

    bPages.map( (page) => {
        const localId = page.get('localId')
        let collapsed = true

        if ( expandedNodes.indexOf(localId) != -1 ) {
            collapsed = false
        }

        let path = basePath.concat([n])

        pages.setIn(path.concat(['collapsed']), collapsed )

        updateExpandCollapsePageList( pages, expandedNodes, path.concat(['pages']) )

        n++
    })
}


/**
 * Atualiza o estado expansão/colapso dos nós da árvore
 *
 * @param pages
 * @param expandedNodes
 * @param basePath
 */
export const updateExpandCollapseTreeState = (pages, expandCollapseState) => {
    let expandedNodes = expandCollapseState.hasOwnProperty('expandedNodes') ? expandCollapseState.expandedNodes : []

    if(typeof pages === "undefined") pages = List()

    return pages.withMutations( (npages) => {
        updateExpandCollapsePageList(npages, expandedNodes)
    })
}


/**
 * Atualiza a arvore de acordo com o estado de abertura e fechamento de seus nós
 *
 * @param state
 * @param newExpandedCollapsedState
 * @returns {*}
 */
export const updateTree = (state, newExpandedCollapsedState) => {
    return state.withMutations( (nstate) => {

        let npages = updateExpandCollapseTreeState( state.getIn(['editing', 'pages']), newExpandedCollapsedState )
        nstate.setIn(['editing', 'pages'], npages)
    })
}



/** Atualiza informações sobre o conjunto de páginas sendo editado */
export const updateEditingPages = (state, editingPages) => {
    return state.setIn(['editing', 'pages'], editingPages)
}

