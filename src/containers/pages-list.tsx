import { connect } from 'react-redux'
import Pages from '../components/elements/pages.component'
import {changePageTitle, newPage, movePage, changeTreeState,
        quickLevelMove } from "../actions/pages"

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
        }        
    }
}

const PagesList = connect<{},{},{}>(
    mapStateToProps,
    mapDispatchToProps
)(Pages)

export default PagesList;
