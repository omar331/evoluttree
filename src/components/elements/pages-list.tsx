import * as React from 'react';

import PageItem from './page-item';
import {PagesProps} from '../model/PagesProps'

export default class PagesList extends React.Component<PagesProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { pages, generalInfo, parentPage, onTitleChange,
                onNewPage, onMovePage, onChangeTreeState,
                onQuickLevelMove
        } = this.props;

        let order = -1;

        let previousPage = null
        let pageComponentRes


        return(
            <div>
                <ul className="content-list">
                    {pages.map(
                        page => {
                            order++

                            pageComponentRes = <PageItem info={page}
                                                      parentPage={parentPage}
                                                      previousPage={previousPage}
                                                      id={page.get('id')}
                                                      pageOrder={order}
                                                      onTitleChange={onTitleChange}
                                                      onNewPage={onNewPage}
                                                      onMovePage={onMovePage}
                                                      onChangeTreeState={onChangeTreeState}
                                                      onQuickLevelMove={onQuickLevelMove}
                                            />


                            previousPage = page

                            return pageComponentRes
                        }

                    )}
                </ul>
            </div>
        );
    }
}

