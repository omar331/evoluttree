import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Evoluttree } from './evoluttree';

declare var evltree_config: any
declare var evltree_editing_product: any


let custom_components = {
    // ---> this handler may be used for asking confirmation before moving a page
    //      it's triggered at QLMs as well
    onMovePageConfirm(onConfirmCallback, ...onConfirmArgs) {
        console.log(' ----> onConfirmCallback = %o    onConfirmArgs = %o   ', onConfirmCallback, onConfirmArgs )
        onConfirmCallback(...onConfirmArgs)
    }
}


ReactDOM.render(
    (
        <Evoluttree config={evltree_config}
                    editingProduct={evltree_editing_product}
                    customComponents={custom_components}
        />
    ),
    document.getElementById('content')
)

