import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Evoluttree } from './evoluttree.jsx';
import { EvoluttreeConfig } from './components/model/AppProps';

declare var evltree_config: EvoluttreeConfig;
declare var evltree_editing_product: any;


let custom_components = {
    // ---> this handler may be used for asking confirmation before moving a page
    //      it's triggered at QLMs as well
    onMovePageConfirm(onConfirmCallback, ...onConfirmArgs) {
        // console.log(' ----> onConfirmCallback = %o    onConfirmArgs = %o   ', onConfirmCallback, onConfirmArgs );
        onConfirmCallback(...onConfirmArgs);
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

