import React, { Component } from 'react';
import { Icon } from "antd";
import ModalTimeOfUse from "./ModalTimeOfUse";

class ColTimeOfUse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
    }
  }

  toggleModal = (value) => {
    if(value === true) {
      this.props.submitData()
    }
    this.setState((state) => ({
      visibleModal: !state.visibleModal,
    }));
  };

  render() {

    const { nameEquipment, timeOfUse, useOfMonth, editUseOfMonth, addUseOfMonth, index, getMonth } = this.props;
    const { visibleModal } = this.state;

    return (
      <div className="set-time">
        <button style={{ border: 'none', backgroundColor: 'transparent', padding: '5px'}} onClick={this.toggleModal}>
          <span className="_padding-small-right">
            {timeOfUse}
          </span>
          <Icon type="calendar"/>
        </button>
        <ModalTimeOfUse
          getMonth={getMonth}
          nameEquipment={nameEquipment}
          visibleModal={visibleModal}
          closeModal={this.toggleModal}
          useOfMonth={useOfMonth}
          editUseOfMonth={editUseOfMonth}
          addUseOfMonth={addUseOfMonth}
          index={index}
        />
      </div>
    );
  }
}

export default ColTimeOfUse;