import React, { Component } from 'react';
import { Modal as BoxModal } from 'antd';

class Modal extends Component {

  render() {
    const { title, showModal, children, toggleModal, modal } = this.props;

    return (
      <div>
        <BoxModal
          title={title}
          visible={showModal}
          onOk={() => toggleModal(modal.showModal)}
          onCancel={() => toggleModal(modal.showModal)}
        >
          {children}
        </BoxModal>
      </div>
    )
  }
}

export default Modal;