/**
 * Allow to connect editor actions to the outer world (external applications)
 * 
 * @param store
 */


let config:any


export const connect = (config:any) => {

    this.config = config

    return externalHooksMiddleware 
} 






const externalHooksMiddleware = (store:any) => (next:any) => (action:any) =>  {
    next(action)

    if ( this.config.hookActionsToExternal != null ) {
        if ( action.type.match(/HOOK_/) ) {
            this.config.hookActionsToExternal(action)
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


