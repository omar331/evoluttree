import * as React from 'react';

export class TitleEdit extends React.Component<{value: string, onTitleChange: any}, {}> {
    refs: {
        [string: string]: any;
        textInput:any;
    }
    componentDidMount() {
        this.refs.textInput.focus();
    }
    handleKeyPress(e) {
        const { onTitleChange } = this.props

        if (e.key === 'Enter') {
            onTitleChange(e)
        }
    }
    render() {
        const { value, onTitleChange } = this.props

        return <input type="text"
                      ref="textInput"
                      style={ {width: "96%"} }
                      defaultValue={ value }
                      onBlur={ onTitleChange }
                      onClick={ (e) => { e.stopPropagation() } }
                      onKeyPress={ this.handleKeyPress.bind(this) }
        />
    }
}
