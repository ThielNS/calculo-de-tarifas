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

    const { nameEquipment, timeOfUse, useOfMonth, handleUseOfMonth } = this.props;
    const { visibleModal } = this.state;

    return (
      <div className="set-time">
        <div onClick={this.toggleModal}>
          <span className="_padding-small-right">
            {timeOfUse}
          </span>
          <Icon type="calendar"/>
        </div>
        <ModalTimeOfUse
          nameEquipment={nameEquipment}
          visibleModal={visibleModal}
          closeModal={this.toggleModal}
          useOfMonth={useOfMonth}
          handleUseOfMonth={handleUseOfMonth}
        />
      </div>
    );
  }
}

export default ColTimeOfUse;