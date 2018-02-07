import React, { Component } from "react";
import { Icon, Button, DatePicker } from "antd";

const formatDate = "DD/MM/YYYY";

class DateUse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  deleteDates() {
    const { listEquipments, index, indexDate, deleteDates } = this.props;
    this.setState({
      loading: true
    });
    deleteDates(listEquipments, index, indexDate);
  }

  renderRangePiker = () => {
    const { RangePicker } = DatePicker;
    const {
      editUseOfMonth,
      index,
      deleteDates,
      listEquipments,
      convertMoment,
      convertDate,
      dateRender
    } = this.props;
    const { item, indexDate, disabledDate, renderTime } = this.props;
    const { loading } = this.state;

    return (
      <div className="row">
        <RangePicker
          onChange={data => editUseOfMonth(data, indexDate, index)}
          dateRender={dateRender}
          disabledDate={disabledDate}
          format={formatDate}
          className="_margin-right"
          defaultValue={[
            convertMoment(convertDate(item.dateInit), formatDate),
            convertMoment(convertDate(item.dateFinish), formatDate)
          ]}
        />
        {renderTime(item.timeInit, item.timeFinish, indexDate)}
        <Button
          type="danger"
          shape="circle"
          loading={loading}
          icon="delete"
          onClick={() => this.deleteDates()}
          className='_margin-left _flex-shrink-none'
        />
      </div>
    );
  };

  renderDatePicker = () => {
    const { editUseOfMonth, index, convertMoment, convertDate } = this.props;
    const { item, indexDate, disabledDate, renderTime } = this.props;
    const { loading } = this.state;

    return (
      <div className="row">
        <DatePicker
          onChange={data => editUseOfMonth(data, indexDate, index)}
          disabledDate={disabledDate}
          format={formatDate}
          className="_margin-right"
          defaultValue={convertMoment(convertDate(item.dateInit), formatDate)}
        />
        {renderTime(item.timeInit, item.timeFinish, indexDate)}
        <Button
          type="danger"
          shape="circle"
          loading={loading}
          icon="delete"
          onClick={() => this.deleteDates()}
          className='_margin-left _flex-shrink-none'
        />
      </div>
    );
  };

  render() {
    const { item } = this.props;
    const returnDate =
      item.dateInit === item.dateFinish
        ? this.renderDatePicker()
        : this.renderRangePiker();

    return <div>{returnDate}</div>;
  }
}

export default DateUse;
