import { connect } from 'react-redux'
import Info from '../components/misc/general-info'
import {changeContent, changeProductTitle} from "../actions/products";

const mapStateToProps = (state:any) => {
    let general:any

        general = state.get('editing').get('general')

    return {
        info: general
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onTitleChange: (newTitle:string) => {
            dispatch( changeProductTitle(newTitle) )
            dispatch( changeContent(true) )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Info)
