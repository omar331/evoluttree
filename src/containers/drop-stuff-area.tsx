import { connect } from 'react-redux'
import { DropStuffArea } from '../components/elements/drop-stuff-area'

const mapStateToProps = (state:any) => {
    return {
        // when some page is being dragged, it's useful to droparea knows it
        pageItemBeingDragged: state.getIn(['editing', 'misc', 'pageItemBeingDragged'])
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onDragOverBegin: (ownerPage:any) => { ownerPage && console.log('DOB    page = %s', ownerPage.get('title'))},
        onDragOverEnd: (ownerPage:any) => { ownerPage && console.log('DOE   page = %s', ownerPage.get('title'))},
    }
}

export const DropStuffAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropStuffArea)
