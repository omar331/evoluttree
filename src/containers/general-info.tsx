import { connect } from 'react-redux'
import Info from '../components/misc/general-info'
import {changeProductTitle} from "../actions/products";

const mapStateToProps = (state) => {
    let general = {}

        general = state.get('editing').get('general')

    return {
        info: general
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: (newTitle) => {
            dispatch( changeProductTitle(newTitle) );
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Info)
