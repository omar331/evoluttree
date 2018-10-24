/**
 * Allow to connect editor actions to the outer world (external applications)
 * 
 * @param store
 */


let configT = null;


export const connect = (config) => {

    configT = config;

    return externalHooksMiddleware 
} 






const externalHooksMiddleware = (store) => (next) => (action) =>  {
    next(action)

    if ( configT.hookActionsToExternal != null ) {
        if ( action.type.match(/HOOK_/) ) {
            configT.hookActionsToExternal(action)
        }
    }


    switch (action.type) {
        case 'HOOK_NEW_PAGE':

            break
        case 'HOOK_CHANGE_PAGE_TITLE':

            break
        case 'HOOK_CHANGE_PRODUCT_TITLE':

            break
        case 'HOOK_CHANGE_PAGE_INFO':
            break

        case 'HOOK_MOVE_PAGE':
            break

        case 'HOOK_DELETE_PAGE':
            break

        default:
            break

    }
}


