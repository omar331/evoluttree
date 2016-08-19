import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Evoluttree } from './evoluttree';

declare var evltree_config: any;
declare var evltree_editing_product: any;

ReactDOM.render(
    (
        <Evoluttree config={evltree_config} editingProduct={evltree_editing_product}/>
    ),
    document.getElementById('content')
);



