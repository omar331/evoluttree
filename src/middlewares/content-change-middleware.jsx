/**
 * Este middleware mapeia quais ações que causam
 * alterações nos conteúdos da árvore, ou seja,
 * que representam alterações realis no conteúdo.
 *
 * @param getState
 * @returns {function(*): function(*=): *}
 */
export default (onChangeCallback = null) => {

    /**
     * @param getState
     * @returns {function(*): function(*=): *}
     */
    return ({getState}) => {
        return next => action => {
            const returnValue = next(action)

            switch (action.type) {
                case 'PRODUCT_CHANGE_TITLE':
                case 'PAGE_CHANGE_TITLE':
                case 'NEW_PAGE':
                case 'MOVE_PAGE':
                case 'QUICK_LEVEL_MOVE':
                case 'DELETE_PAGE':
                case 'CHANGE_PAGE_INFO':
                case 'CLONE_PAGE':
                    if (onChangeCallback) onChangeCallback(getState().getIn(['editing']).toJS())

                    break;
                default:
                    break;
            }
            return returnValue
        }
    }
}
