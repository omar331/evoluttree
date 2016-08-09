/**
 * Expose client API
 * 
 * API can be accessed externally throught browser window object such as:
 * 
 * <code>
 *      window.evoluttree.modifyPage('aaa-11-1-', {title: 'New title'});
 * </code>
 * 
 */
import { changePageInfo } from "./actions/pages"

// prepare container API
window['evoluttree'] = {}
window['evoluttree']['api'] = {}

export const expose = (store) => {

    /**
     * Modify a page
     * @param localPageId   page's local id
     * @param pageInfo      array containing the information to be modified
     */
    window['evoluttree']['api']['modifyPage'] = (localPageId, pageInfo) => {
        store.dispatch( changePageInfo(localPageId, pageInfo) )
    }


}

