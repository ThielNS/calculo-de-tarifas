import { connect } from "react-redux";
import { listDistribuitors } from "../actions/powerDistribuitorAction";
import { listEquipments } from "../actions/equipmentsAction";
import { listCalculateEquipments } from "../actions/powerDistribuitorAction";
import ChooseDistribuitors from "../components/OptionsTable/ChooseDistribuitors";

const mapStateToProps = state => {
    return {
        itemsDistribuitors: state.powerDistribuitorReducer,
        itemsEquipments: state.equipmentsReducer,
        itemsCalculateEquipments: state.powerDistribuitorReducer,
    };
};

const mapDispatchToProps = dispatch => ({
    listDistribuitors: () => {
        return dispatch(listDistribuitors());
    },
    listEquipments: () => {
        return dispatch(listEquipments());
    },
    listCalculateEquipments: () => {
        return dispatch(listCalculateEquipments())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDistribuitors);