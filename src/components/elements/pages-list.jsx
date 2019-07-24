import * as React from 'react';

import PageItemContainer from '../../containers/page-item.jsx';
import {PagesProps} from '../model/PagesProps'
import { Map, List } from 'immutable'


export default class PagesList extends React.Component {
    // static defaultProps = {
    //     pages: List(),
    //     generalInfo: {},
    //     onTitleChange: null,
    //     onNewPage: null,
    //     onChangeTreeState: null,
    //     onQuickLevelMove: null,
    //     onChangePageInfo: null,
    //     onDeletePage: null,
    //     onClonePage: null,
    //     onStartEditPageBody: null,
    //     onFinishEditPageBody: null,
    //     onPageItemBeginDrag: null,
    //     onPageItemEndDrag: null,
    //     parentPage: null,
    //     onMovePage: null,
    //     depth: 0
    // }

    constructor(props) {
        super(props);
    }
    handleMovePage(...args) {
        const { depth, onMovePage, customComponents } = this.props

        // it's possible to set an external confirmation handler.
        // If so, it's called at the first level...
        if ( depth == 0 ) {
            if ( customComponents.onMovePageConfirm ) {
                customComponents.onMovePageConfirm( onMovePage, ...args )
                return
            }
        }

        onMovePage(...args)
    }


    handleQuickLevelMove(...args) {
        const { depth, onQuickLevelMove, customComponents } = this.props

        // it's possible to set an external confirmation handler.
        // If so, it's called at the first level...
        if ( depth == 0 ) {
            if ( customComponents.onMovePageConfirm ) {
                customComponents.onMovePageConfirm( onQuickLevelMove, ...args )
                return
            }
        }

        onQuickLevelMove(...args)
    }

    render() {
        const { pages, parentPage, onTitleChange,
                onNewPage, onChangeTreeState,
                onChangePageInfo, onDeletePage, onClonePage,
                onStartEditPageBody, onFinishEditPageBody,
                depth, customComponents,
                onPageItemBeginDrag, onPageItemEndDrag,
                pageStyles
        } = this.props;

        let order = -1;

        let previousPage = null
        let pageComponentRes = null;
        return( <ul className={ 'depth-' + depth }>
                    {pages.map(

                        (page) => {
                            order++
                            pageComponentRes = <PageItemContainer info={page}
                                                      parentPage={parentPage}
                                                      previousPage={previousPage}
                                                      id={page.get('id')}
                                                      pageOrder={order}
                                                      onTitleChange={onTitleChange}
                                                      onNewPage={onNewPage}
                                                      onMovePage={this.handleMovePage.bind(this)}
                                                      onChangeTreeState={onChangeTreeState}
                                                      onQuickLevelMove={this.handleQuickLevelMove.bind(this)}
                                                      onChangePageInfo={onChangePageInfo}
                                                      onDeletePage={onDeletePage}
                                                      onClonePage={onClonePage}
                                                      onBeginDrag={onPageItemBeginDrag}
                                                      onEndDrag={onPageItemEndDrag}
                                                      onStartEditPageBody={onStartEditPageBody}
                                                      onFinishEditPageBody={onFinishEditPageBody}
                                                      depth={ depth }
                                                      customComponents={ customComponents }
                                                      key={page.get('localId')}
                                                      pageStyles={pageStyles}
                                            />


                            previousPage = page
                            return pageComponentRes
                        }

                    )}
                </ul>
        );
    }
}

