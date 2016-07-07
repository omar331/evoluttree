import * as React from 'react';

import PageListing from './page-listing';
import '../css/contents.css';

export default class Pages extends React.Component<{ pages: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { pages } = this.props;

        return(
            <ul className="content-list">
                {pages.map(page =>
                    <PageListing page={page}/>
                )}
            </ul>
        );
    }
}



