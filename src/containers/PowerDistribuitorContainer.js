import { connect } from "react-redux";
import { listDistribuitors } from "../actions/powerDistribuitorAction";
import ChooseDistribuitors from "../components/OptionsTable/ChooseDistribuitors";

const mapStateToProps = state => {
    console.log(state)
    return { itemsDistribuitors: state.powerDistribuitorReducer };
};

const mapDispatchToProps = dispatch => ({
    listDistribuitors: () => {
        return dispatch(listDistribuitors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDistribuitors);