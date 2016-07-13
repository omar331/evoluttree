import * as React from 'react';

import PageListing from './page-listing';

export default class Pages extends React.Component<{ pages: any }, {pages: any}> {
    constructor(props) {
        super(props);

        this.state = {
            pages: props.pages
        };
    }
    render() {
        const { pages } = this.state;

        return(
            <ul className="content-list">
                {pages.map(page =>
                <PageListing pageInfo={page} id={page.id}/>
                )}
            </ul>
        );
    }
}

