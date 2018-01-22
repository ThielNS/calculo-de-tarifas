import React from 'react';
import { Icon } from "antd";
import TimeOfUse from "../Modal/TimeOfUse";
import ModalContainer from "../../containers/ModalContainer";

const ColTimeOfUse = ({ timeOfUse, modal, toggleModal}) => {

  return (
    <div
      className="set-time"
      onClick={() => toggleModal(modal.showModal)}
    >
      <span className="_padding-small-right">
        {timeOfUse}
      </span>
      <Icon type="calendar"/>
      <ModalContainer
        title="Tempo de Uso"
        showModal={modal.showModal}
      >
        <TimeOfUse/>
      </ModalContainer>
    </div>
  );
};

export default ColTimeOfUse;