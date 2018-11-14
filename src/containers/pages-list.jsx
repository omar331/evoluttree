import { connect } from 'react-redux'

import Pages from '../components/elements/pages-list.jsx'
import {changePageTitle, newPage, movePage, changeTreeState,
        quickLevelMove, changePageInfo, deletePage, clonePage } from "../actions/pages.jsx"
import { changeContent } from "../actions/products.jsx"



const mapStateToProps = (state) => {
    return {
        pages: state.get('editing').get('pages')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: (id,newTitle) => {
            dispatch( changePageTitle(id, newTitle) );
        },
        onNewPage: (ownerPageLocalId, position) => {
            dispatch( newPage(ownerPageLocalId,  position, null) );
        },
        onMovePage: (sourcePageLocalId, destinationPageLocalId, position) => {
            dispatch( movePage(sourcePageLocalId, destinationPageLocalId, position) );
            //dispatch( changeContent(true) );
        },
        onChangeTreeState: (pageLocalId, newStateInfo) => {
            console.log( "  -x-x-x   change collapse (container) %s  %o   ", pageLocalId, newStateInfo)

            dispatch( changeTreeState(pageLocalId, newStateInfo) );
            // dispatch( changeContent(true) );
        },
        onQuickLevelMove: (direction, localPageId) => {
            dispatch( quickLevelMove(direction,localPageId) );
            //dispatch( changeContent(true) );
        },
        onChangePageInfo: ( localPageId, pageInfo ) => {
            dispatch( changePageInfo(localPageId, pageInfo) );
            dispatch( changeContent(true) );
        },
        onDeletePage: (localPageId ) => {
            dispatch( deletePage(localPageId) );
            //dispatch( changeContent(true) );
        },
        onClonePage: (localPageId, position ) => {
            dispatch( clonePage(localPageId, position) );
           // dispatch( changeContent(true) );
        },
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    let ret = {};

    for( let k in ownProps ) {
        ret[k] = ownProps[k]
    }

    for( let k in stateProps ) {
        ret[k] = stateProps[k]
    }

    for( let k in dispatchProps ) {
        ret[k] = dispatchProps[k]
    }

    return  ret
}

export const PagesList = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Pages);

export default PagesList;
