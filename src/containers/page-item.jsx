import { connect } from 'react-redux'
import PageItem from '../components/elements/page-item'

const mapStateToProps = (state) => {
    return {
        pageItemBeingDragged: state.getIn(['editing', 'misc', 'pageItemBeingDragged'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageItem)
