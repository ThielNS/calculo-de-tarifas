import { connect } from 'react-redux';
import { searchEquipments } from "../actions/equipmentsAction";
import { toggleModal } from "../actions/modalAction";
import AddEquipment from "../components/AddEquipments";

const mapStateToProps = state => {
  return {
    resultEquipments: state.equipmentsReducer,
    modal: state.modalReducer
  }
};

const mapDispatchToProps = {
  searchEquipments,
  toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipment);