import { connect } from 'react-redux'
import Info from '../components/misc/general-info'
import {changeProductTitle} from "../actions/products";

const mapStateToProps = (state) => {
    return {
        info: state.get('editing').get('general')
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
