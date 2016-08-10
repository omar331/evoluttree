import * as React from 'react';

import { TitleEdit } from './title-edit'


// TODO: criar interface para "info"
// TODO: criar interface para "onTitleChange"
export default class GeneralInfo extends React.Component<{info?: any, onTitleChange?: any}, {editingTitle: boolean}> {
    constructor(props) {
        super(props);

        this.state = {
            editingTitle: false
        }
    }
    toggleEditingTitle() {
        const { onTitleChange } = this.props;

        let currentStateEditing = this.state.editingTitle;
        let newStateEditing = !currentStateEditing

        if ( newStateEditing ) {
        }

        this.setState({editingTitle: newStateEditing})
    }
    updateTitle(e) {
        const { info, onTitleChange } = this.props;
        onTitleChange(e.target.value )

        this.toggleEditingTitle()
    }

    render() {
        const { info, onTitleChange } = this.props;

        return(
            <div className="general-info">
                <h3 onClick={ (e) => { this.toggleEditingTitle() } }>
                    { this.state.editingTitle ?
                        <TitleEdit value={ info.get('title') }
                                   onTitleChange={ this.updateTitle.bind(this) }
                        />
                        :
                        info.get('title')
                    }
                </h3>
            </div>
        );
    }
}
