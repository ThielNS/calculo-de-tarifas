import { connect } from "react-redux";
import ChooseMonthly from "../components/OptionsTable/ChooseMonthly";
import { getMonth } from "../actions/chooseMonths";

const mapStateToProps = state => {
  return {
    listMonths: state.listMonthly,
    monthIndex: state.chooseMonthlyReducer
  };
};

const mapDispatchToProps = () => dispatch => ({
  getMonth: () => {
    return dispatch(getMonth());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMonthly);
