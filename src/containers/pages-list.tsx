import { connect } from 'react-redux'

import {PagesProps} from '../components/model/PagesProps'

import Pages from '../components/elements/pages-list'
import {changePageTitle, newPage, movePage, changeTreeState,
        quickLevelMove, changePageInfo, deletePage } from "../actions/pages"




const mapStateToProps = (state) => {
    return {
        pages: state.get('editing').get('pages')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: (id,newTitle) => {
            dispatch( changePageTitle(id, newTitle) );
        },
        onNewPage: (ownerPageLocalId, position) => {
            dispatch( newPage(ownerPageLocalId,  position) )
        },
        onMovePage: (sourcePageLocalId, destinationPageLocalId, position) => {
            dispatch( movePage(sourcePageLocalId, destinationPageLocalId, position) )
        },
        onChangeTreeState: (pageLocalId, newStateInfo ) => {
            dispatch( changeTreeState(pageLocalId, newStateInfo) )
        },
        onQuickLevelMove: (direction, localPageId ) => {
            dispatch( quickLevelMove(direction,localPageId) )
        },
        onChangePageInfo: ( localPageId, pageInfo ) => {
            dispatch( changePageInfo(localPageId, pageInfo) )
        },
        onDeletePage: (localPageId ) => {
            dispatch( deletePage(localPageId) )
        },
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    let ret = {}

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

export const PagesList = connect<{},{},PagesProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Pages)

export default PagesList;
