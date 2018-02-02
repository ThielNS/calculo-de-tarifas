import { connect } from "react-redux";
import { resetListEquipments } from "../actions/equipmentsAction";
import RedoList from "../components/OptionsTable/RedoList";

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    resetListEquipments: () => {
        return dispatch(resetListEquipments());
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(RedoList)