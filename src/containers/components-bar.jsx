import { connect } from 'react-redux'

import ComponentsBar from '../components/components.bar';
import { newPage } from "../actions/pages.jsx"
import { changeContent } from "../actions/products.jsx"

const mapStateToProps = (state) => {

    return {
        pages: state.getIn(['editing', 'pages']),
        productId: state.getIn(['editing', 'general', 'id'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewPage: (ownerPageLocalId, position, productId) => {

            dispatch( newPage(ownerPageLocalId,  position, productId) );
            dispatch( changeContent(true) );
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentsBar)
