import { connect } from 'react-redux';
import ColTimeOfUse from "../components/ColTimeOfUse";
import {deleteDates} from "../actions/equipmentsAction";

const mapStateToProps = state => {
  return {
    getMonth: state.getMonth

  }
};

const mapDispatchToProps = {
  deleteDates
};

export default connect(mapStateToProps, mapDispatchToProps)(ColTimeOfUse)