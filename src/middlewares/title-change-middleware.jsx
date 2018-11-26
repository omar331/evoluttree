/**
 * Este middleware mapeia quais ações que causam
 * alterações nos conteúdos da árvore, ou seja,
 * que representam alterações realis no conteúdo.
 *
 * @param getState
 * @returns {function(*): function(*=): *}
 */
export default (onTitleChangeCallback = null) => {

    /**
     * @param getState
     * @returns {function(*): function(*=): *}
     */
    return ({getState}) => {
        return next => action => {
            const returnValue = next(action)

            switch (action.type) {
                case 'PAGE_CHANGE_TITLE':
                    if (onTitleChangeCallback) onTitleChangeCallback(

                        {title: action.newTitle, localId: action.localId}
                     );

                    break;
                default:
                    break;
            }
            return returnValue
        }
    }
}
