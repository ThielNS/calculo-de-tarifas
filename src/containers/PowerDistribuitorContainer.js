import { connect } from "react-redux";
import {listDistribuitors} from "../actions/powerDistribuitorAction";
import ChooseDistribuitors from "../components/OptionsTable/ChooseDistribuitors";

const mapStateToProps = state => {
    return { itemsTechs: state.technologiesReducer };
};

const mapDispatchToProps = dispatch => ({
    listDistribuitors: () => {   
        return dispatch(listDistribuitors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDistribuitors);