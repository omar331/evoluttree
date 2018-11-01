import * as React from 'react';

import '../css/general.scss';

import * as PageEditorInterfaces from '../model/PageEditor'

import { Glyphicon, Modal, Button, Row, Col, Grid } from 'react-bootstrap'
import SyntheticEvent = __React.SyntheticEvent;


export default class PageEditor extends React.Component<PageEditorInterfaces.Props, PageEditorInterfaces.State> {
    refs: {
        [string: string]: any;
        bodyTextInput:any;
    }
    constructor(props:any) {
        super(props);
    }
    handleClose(e:any) {
        const { onClose } = this.props
        onClose()
    }
    handleSave(e:any) {
        const { pageInfo, onSave } = this.props

        onSave(
            pageInfo.get('localId'),
            {
                body: this.refs.bodyTextInput.value
            }
        )
    }
   render() {
        const { pageInfo, onClose, textEditorElementId } = this.props


       // ---> ao fechar
       // this.handleClose.bind(this)


        return <div className="modal-container" style={{height: 700}}>
                    <h2>{ pageInfo.get('title') }</h2>

                    <textarea
                        ref={ (ref) => { this.refs.bodyTextInput = ref; } }
                        id={textEditorElementId}
                        name={textEditorElementId}
                        cols={50}
                        rows={10}
                        defaultValue={ pageInfo.get('body') }
                        onChange={ (e) => { console.log(' textarea a = %s', e.target.valueOf() ); return true; } }
                    />

                    <br/><br/>

                    <Button bsStyle={'primary'} onClick={ this.handleSave.bind(this) }>Save</Button>
                    <Button onClick={ onClose }>Close</Button>
            </div>
    }
}


