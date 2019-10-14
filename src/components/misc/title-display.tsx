import * as React from 'react';
import i18n from '../../../translations/i18n'

/**
 * Generic title display
 */
export class TitleDisplay extends React.Component<{value: string}, {}> {
    render() {
        const { value } = this.props

        let textStyle:any = {whiteSpace: "nowrap"}

        if ( this.isEmptyValue() ) textStyle['fontStyle'] = 'italic';

        let displayText = !this.isEmptyValue() ? value : i18n.t('sem_titulo')

        return <div className="title-display" title={ displayText }>
                     <span style={ textStyle }>{ displayText }</span>
                </div>
    }

    isEmptyValue() {
        const { value } = this.props
        return ( (value == null ) || (value.length == 0 ))
    }
}
