import { connect } from 'react-redux'
import ProductEdit from '../components/product.edit'
import * as productActions from "../actions/products";

const mapStateToProps = (state:any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onPageItemBeginDrag: (pageInfo:any) => {
            dispatch( productActions.pageItemStartDrag(pageInfo) );
        },
        onPageItemEndDrag: (pageInfo:any) => {
            dispatch( productActions.pageItemEndDrag(pageInfo) );
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductEdit)
