import { connect } from 'react-redux'
import PageItem from '../components/elements/page-item'

const mapStateToProps = (state:any) => {
    return {
        pageItemBeingDragged: state.getIn(['editing', 'misc', 'pageItemBeingDragged'])
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageItem)
