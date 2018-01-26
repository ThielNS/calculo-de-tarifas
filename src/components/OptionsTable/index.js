import React, { Component } from "react";
//import ChooseDistribuitors from "./ChooseDistribuitors";
import RedoList from "./RedoList";
import ChooseMonthly from "./ChooseMonthly";
import PowerDistribuitorContainer from "../../containers/PowerDistribuitorContainer";
import ChooseMonthlyContainer from "../../containers/ChooseMonthlyContainer";
import "./optionsTable.less";

class OptionsTable extends Component {

    render() {
        return (
            <div className="flex-content _margin-bottom">
                <PowerDistribuitorContainer />
                <ChooseMonthlyContainer />
                <RedoList />
            </div>
        )
    }
}
export default OptionsTable;
