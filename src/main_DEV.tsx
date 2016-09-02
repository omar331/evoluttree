import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Evoluttree } from './evoluttree';

declare var evltree_config: any
declare var evltree_editing_product: any


import { Glyphicon, Modal, Button, Label, Row, Col, Grid,
         FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap'

import { PageItemToolbarProps } from './components/model/PageItemToolbarProps'
class PageItemToolbar extends React.Component<PageItemToolbarProps, {}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        const { pageInfo, onEditClicked, onDelete } = this.props

        return <div>
            <a>
                <Label bsStyle="primary">
                    <Glyphicon glyph="edit" onClick={ () => { onEditClicked() } } />
                </Label>
            </a>
            &nbsp;
            <a onClick={ () => { console.log(' pages info MyToolBarItem = %o', pageInfo.toJS() ) } }>
                <Label bsStyle="primary" title={ 'Tarefas / arquivos' } >
                    <Glyphicon glyph="tasks" />
                </Label>
            </a>
            &nbsp;
            <a onClick={ () => { onDelete( pageInfo.get('localId') ) } }>
                <Label bsStyle="danger">
                    <Glyphicon glyph="trash" />
                </Label>
            </a>
        </div>
    }
}

import * as PageEditorInterfaces from './components/model/PageEditor'
import SyntheticEvent = __React.SyntheticEvent

export interface MyPageEditorState extends PageEditorInterfaces.State {
    tempoExecucao: number,
    pontos: number,
    tipo: number
}

export default class PageEditor extends React.Component<PageEditorInterfaces.Props, MyPageEditorState> {
    refs: {
        [string: string]: any;
        bodyTextInput:any;
    }
    constructor(props:any) {
        super(props)

        this.state = {
            tempoExecucao: props.pageInfo.tempoExecucao || 1,
            pontos: props.pageInfo.pontos || 0,
            tipo: props.pageInfo.tipo || 1
        } as MyPageEditorState
    }

    handleChangeInputText( fieldName:string ) {
        return (e:any) => {
            let stateInfo:any = {}

            stateInfo[ fieldName ] = e.target.value

            this.setState(stateInfo)
        }
    }

    handleClose() {
        const { onClose } = this.props
        onClose()
    }
    handleSave() {
        const { pageInfo, onSave } = this.props

        const infoSalvar = {
            body: this.refs.bodyTextInput.value,
            tempoExecucao: this.state.tempoExecucao,
            pontos: this.state.pontos,
            tipo: this.state.tipo
        }

        onSave(
            pageInfo.get('localId'),
            infoSalvar
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


                    <Grid>
                        <Row>
                            <Col md={9}>
                                <textarea
                                    ref="bodyTextInput"
                                    id={textEditorElementId}
                                    name={textEditorElementId}
                                    cols="50"
                                    rows="10"
                                    defaultValue={ pageInfo.get('body') }
                                    onChange={ (e) => { console.log(' textarea a = %s', e.target.valueOf() ); return true; } }
                                />
                            </Col>
                            <Col md={3}>
                                <form>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Tipo</ControlLabel>
                                        <FormControl componentClass="select"
                                                     name="tipo"
                                                     placeholder="-- selecione"
                                                     onChange={this.handleChangeInputText('tipo').bind(this)}
                                        >
                                            <option value="1">Passo</option>
                                            <option value="2">Saiba mais</option>
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup controlId="tempoExecucao">
                                        <ControlLabel>Tempo para execução</ControlLabel>

                                        <FormControl
                                            type="text"
                                            name="tempoExecucao"
                                            value={this.state.tempoExecucao}
                                            onChange={this.handleChangeInputText('tempoExecucao').bind(this)}
                                        />

                                        <HelpBlock>em dias úteis</HelpBlock>
                                    </FormGroup>

                                    <FormGroup controlId="pontos">
                                        <ControlLabel>Pontos</ControlLabel>

                                        <FormControl
                                            type="text"
                                            name="pontos"
                                            value={this.state.pontos}
                                            onChange={this.handleChangeInputText('pontos').bind(this)}
                                        />
                                    </FormGroup>
                                </form>
                            </Col>
                        </Row>
                    </Grid>

                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" bsSize="medium" onClick={ this.handleSave.bind(this) }>Salvar</Button>
                    <Button onClick={ onClose }>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}



ReactDOM.render(
    (
        <Evoluttree config={evltree_config}
                    editingProduct={evltree_editing_product}
                    customComponents={{
                        PageItemToolbar,
                        PageEditor
                    }}
        />
    ),
    document.getElementById('content')
)

