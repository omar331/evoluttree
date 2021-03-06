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
import { changePageInfo, deletePage } from './actions/pages.jsx';
import { changeProductTitle } from './actions/products';

declare var window: any;

// prepare container API
window.evoluttree = {};
window.evoluttree.api = {};

export const expose = (store: any) => {
    /**
     * Change the title of the product being edited
     * @param newTitle
     * @param preventExternalHooks prevents external hooks be called
     */
    window.evoluttree.api.modifyProductTitle = (newTitle: string, preventExternalHooks: boolean = true) => {
        store.dispatch( changeProductTitle(newTitle, preventExternalHooks) );
    };


    /**
     * Modify a page
     * @param localPageId   page's local id
     * @param pageInfo      array containing the information to be modified
     * @param preventExternalHooks prevents external hooks be called
     */
    window.evoluttree.api.modifyPage = (localPageId: string, pageInfo: any, preventExternalHooks: boolean = true) => {
        store.dispatch( changePageInfo(localPageId, pageInfo, preventExternalHooks ) );
    };

    /**
     * Delete page
     * @param localPageId   page's local id
     * @param preventExternalHooks prevents external hooks be called
     */
    window.evoluttree.api.deletePage = (localPageId: string, preventExternalHooks: boolean = true) => {
        store.dispatch( deletePage( localPageId, preventExternalHooks ) );
    };
};

