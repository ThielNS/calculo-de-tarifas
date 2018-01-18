import React, { Component } from "react";
//import ChooseDistribuitors from "./ChooseDistribuitors";
import RedoList from "./RedoList";
import PowerDistribuitorContainer from "../../containers/PowerDistribuitorContainer"
import "./optionsTable.less";

class OptionsTable extends Component {

    render() {
        return (
            <div className="flex-content _margin-bottom">
                <PowerDistribuitorContainer />
                <RedoList />
            </div>
        )
    }
}
export default OptionsTable;
