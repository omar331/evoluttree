import * as React from 'react';

/**
 * Generic title display
 */
export class TitleDisplay extends React.Component<{value: string}, {}> {
    render() {
        const { value } = this.props

        let textStyle:any = {whiteSpace: "nowrap"}

        if ( this.isEmptyValue() ) textStyle['fontStyle'] = 'italic';

        let displayText = !this.isEmptyValue() ? value : 'sem título'

        return <div className="title-display" title={ displayText }>
                     <span style={ textStyle }>{ displayText }</span>
                </div>
    }

    isEmptyValue() {
        const { value } = this.props
        return ( (value == null ) || (value.length == 0 ))
    }
}
