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
            <li className="content-item-holder">
                <div className="content-item">
                    <div className="content-title">
                        { content.title }
                    </div>
                </div>
                { children }
            </li>
        );
    }
}

