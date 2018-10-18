import { connect } from 'react-redux'

import ComponentsBar from '../components/components.bar';
import { newPage } from "../actions/pages"
import { changeContent } from "../actions/products"

const mapStateToProps = (state:any) => {

    return {
        pages: state.getIn(['editing', 'pages'])
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onNewPage: (ownerPageLocalId:string, position:number) => {

            dispatch( newPage(ownerPageLocalId,  position) );
            dispatch( changeContent(true) );
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentsBar)
