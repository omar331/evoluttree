import * as React from 'react';

import PageItem from './page-item';
import {PagesProps} from '../model/PagesProps'

export default class Pages extends React.Component<PagesProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { pages, generalInfo, parentPage, onTitleChange, onNewPage } = this.props;

        let order = -1;

        return(
            <div>
                <ul className="content-list">
                    {pages.map(
                        page => {
                            order++
                            return <PageItem info={page}
                                      parentPage={parentPage}
                                      id={page.get('id')}
                                      pageOrder={order}
                                      onTitleChange={onTitleChange}
                                      onNewPage={onNewPage}                                             
                            />
                        }

                    )}
                </ul>
            </div>
        );
    }
}

