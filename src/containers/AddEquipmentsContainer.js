import { connect } from 'react-redux';
import { searchEquipments } from "../actions/equipmentsAction";
import { calculate } from "../actions/equipmentsAction";
import AddEquipment from "../components/AddEquipments";

const mapStateToProps = state => {
  return {
    resultEquipments: state.equipmentsReducer,
    resultCalculate: state.equipmentsReducer,
  }
};

const mapDispatchToProps = {
  searchEquipments,
  calculate,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipment);