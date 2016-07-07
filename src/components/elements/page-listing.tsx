import * as React from 'react';
import Pages from './pages.component';

/**
 * Represents a page item in product content hierarchy
 */
export default class PageListing extends React.Component<{ page: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { page } = this.props;

        // does this node have children nodes?
        let children = null;
        if ( page.hasOwnProperty('pages') ) {
            children = <Pages pages={page.pages}/>;
        }

        return(
            <li className="page-item-holder">
                <div className="page-item">
                    <div className="page-title">
                       { page.title }
                    </div>
                </div>
                { children }
            </li>
        );
    }
}

