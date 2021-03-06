import * as React from 'react';
import { PageItemToolbarProps } from '../model/PageItemToolbarProps';


export default class PageItemToolbar extends React.Component<PageItemToolbarProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { pageInfo, onEditClicked, onDelete, onClone, pageOrder, onNewPage } = this.props;

        return <div>
                    <a onClick={ () => { onEditClicked() } }>
                        edit
                    </a>
                    &nbsp;<span className="sep">|</span>&nbsp;
                    <a onClick={ () => { onClone( pageInfo.get('localId'), pageOrder ) } }>
                        clone
                    </a>
                    &nbsp;<span className="sep">|</span>&nbsp;
                    <a className="danger" onClick={ () => { onDelete( pageInfo.get('localId') ) } }>
                        delete
                    </a>
                    &nbsp;<span className="sep">|</span>&nbsp;
                    <a className="primary" onClick={ () => { onNewPage( pageInfo.get('localId'), pageOrder + 1 ) } }>
                        new page
                    </a>
               </div>;
    }
}
