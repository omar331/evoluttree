import * as React from 'react';

import PageItem from './page-item';
import {PagesProps} from '../model/PagesProps'
import { Map, List } from 'immutable'


export default class PagesList extends React.Component<PagesProps, {}> {
    public static defaultProps: PagesProps = {
        pages: List(),
        generalInfo: {},
        onTitleChange: null,
        onNewPage: null,
        onChangeTreeState: null,
        onQuickLevelMove: null,
        onChangePageInfo: null,
        onDeletePage: null,
        onStartEditPageBody: null,
        parentPage: null,
        onMovePage: null,
        depth: 0
    }

    constructor(props:any) {
        super(props);
    }
    render() {
        const { pages, generalInfo, parentPage, onTitleChange,
                onNewPage, onMovePage, onChangeTreeState,
                onQuickLevelMove, onChangePageInfo, onDeletePage,
                onStartEditPageBody,
                depth, customComponents
        } = this.props;

        let order = -1

        let previousPage:any = null
        let pageComponentRes:any


        return(
            <div>
                <div className="content-list">
                    {pages.map(
                        (page:any) => {
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
                                                      onChangePageInfo={onChangePageInfo}
                                                      onDeletePage={onDeletePage}
                                                      onStartEditPageBody={onStartEditPageBody}
                                                      depth={ depth }
                                                      customComponents={ customComponents }
                                            />


                            previousPage = page

                            return pageComponentRes
                        }

                    )}
                </div>
            </div>
        );
    }
}

