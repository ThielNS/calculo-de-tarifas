import React, { Component } from "react";
import { Modal, Button } from "antd";
import "./reDoList.less";

class RedoList extends Component {
    constructor(props) {
        super();

        this.state = {
            ModalText: 'Deseja realmente refazer a lista de equipamentos?',
            visible: false,
            confirmLoading: false,
        }

    }
    showModal = () => {
        this.setState({
            visible: true
        });
    }
    handleOk = () => {
        //console.log('List clean');

        this.setState({
            okText: 'Sim',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                okText: 'Sim',
                visible: false,
                confirmLoading: false,
            });
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            text: 'Cancelar'
        });
    }
    render() {
        const { visible, confirmLoading, ModalText } = this.state;

        return (
            <div className="modal-redolist">
                <Button icon="reload" onClick={this.showModal} className="redo-list">Refazer Lista</Button>
                <Modal title="Refazer lista"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText="Confirmar"
                >
                    <p>{ModalText}</p>
                </Modal>
            </div>
        )
    }
}

export default RedoList;