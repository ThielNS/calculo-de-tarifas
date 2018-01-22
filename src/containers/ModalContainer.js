import { connect } from 'react-redux';
import Modal from "../components/Modal";
import { toggleModal } from "../actions/modalAction";

const mapStateToProps = state => {
  return {
    modal: state.modalReducer
  }
};

const mapDispatchToProps = {
  toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal)