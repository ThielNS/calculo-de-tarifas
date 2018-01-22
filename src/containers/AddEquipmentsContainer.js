import { connect } from 'react-redux';
import { searchEquipments } from "../actions/equipmentsAction";
import AddEquipment from "../components/AddEquipments";

const mapStateToProps = state => {
  return {
    resultEquipments: state.equipmentsReducer
  }
};

const mapDispatchToProps = {
  searchEquipments
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEquipment);