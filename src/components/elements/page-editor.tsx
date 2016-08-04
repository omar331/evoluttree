import * as React from 'react';

import '../css/general.css';

import { Glyphicon, Modal, Button } from 'react-bootstrap'
import SyntheticEvent = __React.SyntheticEvent;

interface PageEditorProps {
    pageInfo: any,
    onClose: any
    onSave: any
}

interface PageEditorState {
}

export default class PageEditor extends React.Component<PageEditorProps, PageEditorState> {
    refs: {
        [string: string]: any;
        bodyTextInput:any;
    }
    constructor(props) {
        super(props);
    }
    handleClose(e) {
        const { onClose } = this.props
        onClose()
    }
    handleSave(e) {
        const { pageInfo, onSave } = this.props

        onSave(
            pageInfo.get('localId'),
            {
                body: this.refs.bodyTextInput.value
            }
        )
    }
   render() {
        const { pageInfo, onClose } = this.props


        return <div className="modal-container" style={{height: 700}}>
            <Modal.Dialog
                style={{ width: '800px', marginLeft: 'auto', marginRight: 'auto'}}
            >
                <Modal
                    show={true}
                    onHide={this.handleClose.bind(this)}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">{ pageInfo.get('title') }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea ref="bodyTextInput"
                                  defaultValue={ pageInfo.get('body') }
                                  style={{width: '100%'}}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" bsSize="medium" onClick={ this.handleSave.bind(this) }>Save</Button>
                        <Button onClick={ onClose }>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Modal.Dialog>
        </div>
    }
}


