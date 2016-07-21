import * as React from 'react';

// TODO: criar interface para "info"
// TODO: criar interface para "onTitleChange"
export default class GeneralInfo extends React.Component<{info: any, onTitleChange: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { info, onTitleChange } = this.props;

        return(
            <div className="general-info">
                <h3 onClick={ (e) => { onTitleChange("novo titulo") } }>
                    {info.get('id')} - { info.get('title') }
                </h3>
            </div>
        );
    }
}
