/**
 * Allow to connect editor actions to the outer world (external applications)
 * 
 * @param store
 */
export const connect = store => next => action =>  {
    console.log('HOOK EXTERNAL. Action = %o', action)

    next(action)

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


