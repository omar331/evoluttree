import * as React from 'react';

import ContentComponent from './content.component';


export default class ContentsListComponent extends React.Component<{ contents: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { contents } = this.props;

        return(
            <ul>
                {contents.map(content =>
                    <ContentComponent content={content}/>
                )}
            </ul>
        );
    }
}



