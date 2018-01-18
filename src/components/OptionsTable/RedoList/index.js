import React, { Component } from "react";
import { Modal, Button } from "antd";

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
        }, 2000);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            text:'Cancelar'
        });
    }
    render() {
        const { visible, confirmLoading, ModalText } = this.state;

        return (
            <div>
                <Button icon="reload" onClick={this.showModal}>Refazer Lista</Button>
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