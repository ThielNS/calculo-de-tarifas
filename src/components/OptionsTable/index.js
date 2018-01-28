import React, { Component } from "react";
import PowerDistribuitorContainer from "../../containers/PowerDistribuitorContainer";
import ChooseMonthlyContainer from "../../containers/ChooseMonthlyContainer";
import RedoListEquipmentsContainer from "../../containers/RedoListEquipmentsContainer";
import "./optionsTable.less";

class OptionsTable extends Component {

    render() {
        return (
            <div className="flex-content _margin-bottom">
                <PowerDistribuitorContainer />
                <ChooseMonthlyContainer />
                <RedoListEquipmentsContainer />
            </div>
        )
    }
}
export default OptionsTable;
