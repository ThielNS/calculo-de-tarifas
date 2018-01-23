import { connect } from 'react-redux';
import { toggleModal } from "../actions/modalAction";
import ListEquipments from "../components/ListEquipments/index";

const mapStateToProps = state => {
  return {
    listEquipments: state.equipmentsReducer,
    modal: state.modalReducer
  }
};

const mapDispatchToProps = {
  toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEquipments);