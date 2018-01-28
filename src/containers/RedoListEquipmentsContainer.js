import { connect } from "react-redux";
import { listEquipments } from "../actions/equipmentsAction";
import { resetListEquipments } from "../actions/equipmentsAction";
import RedoList from "../components/OptionsTable/RedoList";

const mapStateToProps = state => {
    return {
        itemsEquipments: state.equipmentsReducer,

    }
}

const mapDispatchToProps = dispatch => ({
    listEquipments: () => {
        return dispatch(listEquipments());
    },
    resetListEquipments: () => {
        console.log(dispatch(resetListEquipments()))        
        return dispatch(resetListEquipments());
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(RedoList)