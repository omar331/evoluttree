import * as React from 'react';

import PageItem from './page-item';

export default class Pages extends React.Component<{ onTitleChange: any, pages: any, generalInfo?: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { pages, generalInfo, onTitleChange } = this.props;

        return(
            <div>
                <ul className="content-list">
                    {pages.map(
                            page =>  <PageItem info={page} id={page.get('id')} onTitleChange={onTitleChange} />
                    )}
                </ul>
            </div>
        );
    }
}

