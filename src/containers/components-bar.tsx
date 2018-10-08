import { connect } from 'react-redux'

import ComponentsBar from '../components/components.bar';
import { newPage } from "../actions/pages"
import { changeContent } from "../actions/products"

const mapStateToProps = (state:any) => {

    return {
        pages: state.getIn(['editing', 'pages']),
        productId: state.getIn(['editing', 'general', 'id'])
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onNewPage: (ownerPageLocalId:string, position:number, productId:number) => {

            dispatch( newPage(ownerPageLocalId,  position, productId) );
            dispatch( changeContent(true) );
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentsBar)
