import * as React from 'react';

import '../css/general.css';

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


        return <div className="modal-container" style={{height: 700}}>
                <Modal
                    dialogClassName="evltr-modal"
                    show={true}
                    onHide={this.handleClose.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    style={{ width: '1100px', marginLeft: 'auto', marginRight: 'auto'}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            { pageInfo.get('title') }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea
                            ref="bodyTextInput"
                            id={textEditorElementId}
                            name={textEditorElementId}
                            cols="50"
                            rows="10"
                            defaultValue={ pageInfo.get('body') }
                            onChange={ (e) => { console.log(' textarea a = %s', e.target.valueOf() ); return true; } }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" bsSize="medium" onClick={ this.handleSave.bind(this) }>Save</Button>
                        <Button onClick={ onClose }>Close</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    }
}


