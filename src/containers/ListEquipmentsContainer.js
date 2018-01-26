import { connect } from 'react-redux';
import { toggleModal } from "../actions/modalAction";
import ListEquipments from "../components/ListEquipments/index";
import { addUseOfMonth, editEquipments, removeEquipments } from "../actions/equipmentsAction";

const mapStateToProps = state => {
  return {
    listEquipments: state.equipmentsReducer,
    modal: state.modalReducer
  }
};

const mapDispatchToProps = {
  toggleModal,
  removeEquipments,
  editEquipments,
  addUseOfMonth
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEquipments);