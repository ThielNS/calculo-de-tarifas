import { connect } from "react-redux";
import MonthlyExpenses from "../components/MonthlyExpenses";
import { listEquipments } from "../actions/equipmentsAction"

const mapStateToProps = state => {
    return {
        listEquipments: state.equipmentsReducer,
    };
};

const mapDispatchToProps = dispatch => ({
    listCalculateTariffs: () => {
        return dispatch(listEquipments());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyExpenses);