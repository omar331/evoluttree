import * as React from 'react';

/**
 * Generic title display
 */
export class TitleDisplay extends React.Component<{value: string}, {}> {
    render() {
        const { value } = this.props

        let style = {}

        if ( this.isEmptyValue() ) style['fontStyle'] = 'italic';

        return <span style={ style }>{ !this.isEmptyValue() ? value : 'untitled page'}</span>
    }

    isEmptyValue() {
        const { value } = this.props
        return ( (value == null ) || (value.length == 0 ))
    }
}
