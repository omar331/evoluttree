import { connect } from 'react-redux'
import Pages from '../components/elements/pages.component'
import {changePageTitle, newPage} from "../actions/pages";

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
        onNewPage: (ownerPage, parentPage, order) => {
            dispatch( newPage(ownerPage, parentPage, order) )
        }
    }
}

const PagesList = connect<{},{},{}>(
    mapStateToProps,
    mapDispatchToProps
)(Pages)

export default PagesList;
