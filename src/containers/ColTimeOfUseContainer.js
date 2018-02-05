import { connect } from 'react-redux';
import ColTimeOfUse from "../components/ColTimeOfUse";

const mapStateToProps = state => {
  return {
    getMonth: state.getMonth

  }
};

export default connect(mapStateToProps)(ColTimeOfUse)