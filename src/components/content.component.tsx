import * as React from 'react';
import ContentsListComponent from './contents.list.component';


export default class ContentComponent extends React.Component<{ content: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { content } = this.props;

        let children = null;
        if ( content.hasOwnProperty('contents') ) {
            children = <ContentsListComponent contents={content.contents}/>;
        }

        return(
            <li>
                { content.title }
                { children }
            </li>
        );
    }
}



