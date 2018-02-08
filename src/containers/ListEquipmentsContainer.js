import { connect } from 'react-redux';
import { toggleModal } from "../actions/modalAction";
import ListEquipments from "../components/ListEquipments/index";
import { addUseOfMonth, editEquipments, editUseOfMonth, removeEquipments, editNameEquipment, searchEquipments, addEquipment } from "../actions/equipmentsAction";

const mapStateToProps = state => {
  return {
    listEquipments: state.equipmentsReducer,
    getMonth: state.getMonth,
  }
};

const mapDispatchToProps = {
  toggleModal,
  removeEquipments,
  editEquipments,
  addUseOfMonth,
  editUseOfMonth,
  editNameEquipment,
  searchEquipments,
  addEquipment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEquipments);