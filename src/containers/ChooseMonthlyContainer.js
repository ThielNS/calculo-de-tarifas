import { connect } from "react-redux";
import ChooseMonthly from "../components/OptionsTable/ChooseMonthly";
import { updateMonthEquipments } from "../actions/equipmentsAction";
import { changeMonth } from "../actions/chooseMonths";

const mapStateToProps = state => {
  return {
    getMonth: state.getMonth,
    listEquipments: state.equipmentsReducer
  };
};

const mapDispatchToProps = ({
  updateMonthEquipments,
  changeMonth
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMonthly);
