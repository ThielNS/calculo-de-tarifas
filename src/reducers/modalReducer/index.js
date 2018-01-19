import { TOGGLE_MODAL } from "./constants";

const showModal = false;

const modal = ( state = { showModal: showModal}, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:

      const { showModal } = action;
      return { showModal };

    default:
      return state;
  }
};

export default modal;