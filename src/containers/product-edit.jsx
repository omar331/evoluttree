import { connect } from 'react-redux';
import ProductEdit from '../components/product.edit.jsx';
import * as productActions from "../actions/products.jsx";

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageItemBeginDrag: (pageInfo) => {
            dispatch( productActions.pageItemStartDrag(pageInfo) );
        },
        onPageItemEndDrag: (pageInfo) => {
            dispatch( productActions.pageItemEndDrag(pageInfo) );
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductEdit)
