import * as React from 'react';

import {TitleEdit} from '../misc/title-edit';
import {TitleDisplay} from '../misc/title-display';


export default class ControlDisplayTitle extends React.Component<any, any> {

    constructor(props:any) {
        super(props);

        this.state = {
            displayChangeTitle: props.editingTitle
        };
    }

    componentWillReceiveProps( nexProps ){

        this.setState( { displayChangeTitle: nexProps.editingTitle } )
    }

    handleOnTitleChange(value){

        const { onTitleChange } = this.props

        onTitleChange(value);
    }

    render() {

        const { info } = this.props

        return <div>
            { this.state.displayChangeTitle ?
                <TitleEdit value={ info.get('title') }
                           onTitleChange={ this.handleOnTitleChange.bind(this) }
                />
                :
                <TitleDisplay value={ info.get('title') } />
            }
        </div>
    }
}

