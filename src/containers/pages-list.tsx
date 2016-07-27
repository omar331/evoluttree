import { connect } from 'react-redux'
import Pages from '../components/elements/pages.component'
import {changePageTitle, newPage, movePage } from "../actions/pages";

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
        }
    }
}

const PagesList = connect<{},{},{}>(
    mapStateToProps,
    mapDispatchToProps
)(Pages)

export default PagesList;
