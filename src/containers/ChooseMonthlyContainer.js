import { connect } from "react-redux";
import ChooseMonthly from "../components/OptionsTable/ChooseMonthly";
import { getMonth } from "../actions/chooseMonths";
import { updateMonthEquipments } from "../actions/equipmentsAction";

const mapStateToProps = state => {
  return {
    listMonths: state.listMonthly,
    monthIndex: state.chooseMonthlyReducer,
    listEquipments: state.equipmentsReducer
  };
};

const mapDispatchToProps = () => dispatch => ({
  getMonth: () => {
    return dispatch(getMonth());
  },
  updateMonthEquipments: (dataList, month) => {
    return dispatch(updateMonthEquipments(dataList, month))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMonthly);
