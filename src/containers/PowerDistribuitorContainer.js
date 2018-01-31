import { connect } from "react-redux";
import { listDistribuitors } from "../actions/powerDistribuitorAction";
import { listEquipments } from "../actions/equipmentsAction";
import { listCalculateEquipments } from "../actions/powerDistribuitorAction";
import ChooseDistribuitors from "../components/OptionsTable/ChooseDistribuitors";

const mapStateToProps = state => {
    return {
        itemsDistribuitors: state.powerDistribuitorReducer,
        itemsCalculateEquipments: state.powerDistribuitorReducer
    };
};

const mapDispatchToProps = dispatch => ({
    listDistribuitors: () => {
        return dispatch(listDistribuitors());
    },
    listCalculateEquipments: (itemsEquipments, itemsDistribuitors) => {
        return dispatch(listCalculateEquipments(itemsEquipments, itemsDistribuitors))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDistribuitors);