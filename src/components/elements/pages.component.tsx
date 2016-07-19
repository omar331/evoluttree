import * as React from 'react';

import PageItem from './page-item';

export default class Pages extends React.Component<{ onTitleChange: any, pages: any }, {pages: any}> {
    constructor(props) {
        super(props);

        this.state = {
            pages: props.pages
        };
    }
    render() {
        const { onTitleChange } = this.props;
        const { pages } = this.state;

        return(
            <ul className="content-list">
                {pages.map(
                        page =>  <PageItem info={page} id={page.id} onTitleChange={onTitleChange} />
                )}
            </ul>
        );
    }
}

