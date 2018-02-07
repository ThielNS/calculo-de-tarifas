import { connect } from 'react-redux';
import { addEquipment, searchEquipments } from "../actions/equipmentsAction";
import AddEquipment from "../components/AddEquipments";

const mapStateToProps = state => {
  return {
    listEquipments: state.equipmentsReducer,
    getMonth: state.getMonth,
  }
};

const mapDispatchToProps = {
  searchEquipments,
  addEquipment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipment);