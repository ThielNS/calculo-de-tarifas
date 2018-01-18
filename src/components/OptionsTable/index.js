import React, { Component } from "react";
import ChooseDealership from "./ChooseDealership";
import RedoList from "./RedoList";
import "./optionsTable.less";

class OptionsTable extends Component {

    render() {
        return (
            <div className="flex-content _margin-bottom">
                <ChooseDealership />
                <RedoList />
            </div>
        )
    }
}
export default OptionsTable;
