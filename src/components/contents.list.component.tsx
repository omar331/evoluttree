import * as React from 'react';

import ContentComponent from './content.component';
import './css/contents.css';

export default class ContentsListComponent extends React.Component<{ contents: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { contents } = this.props;

        return(
            <ul className="content-list">
                {contents.map(content =>
                    <ContentComponent content={content}/>
                )}
            </ul>
        );
    }
}



