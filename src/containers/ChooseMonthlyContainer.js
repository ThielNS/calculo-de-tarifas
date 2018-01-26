import { connect } from "react-redux";
import ChooseMonthly from "../components/OptionsTable/ChooseMonthly";

const mapStateToProps = state => {
    return {
         listMonths: state.listMonthly,
    }
}

const mapDispatchToProps = () => dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMonthly)