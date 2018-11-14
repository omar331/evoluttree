/**
 * Este middleware mapeia quais ações que causam
 * alterações no estado de expansão e contração
 * dos nós da árvore
 *
 * @param getState
 * @returns {function(*): function(*=): *}
 */
export default (onExpandCollapseCallback = null) => {

    /**
     * @param getState
     * @returns {function(*): function(*=): *}
     */
    return ({getState}) => {
        return next => action => {
            const returnValue = next(action)

            switch (action.type) {
                case 'CHANGE_PAGE_TREE_STATE':
                case 'QUICK_LEVEL_MOVE':
                case 'CLONE_PAGE':
                    if (onExpandCollapseCallback) onExpandCollapseCallback(getState().getIn(['editing']).toJS())

                    break;
                default:
                    break;
            }

            return returnValue
        }
    }
}
