import React, { Component } from "react";
import { Button, DatePicker, Row, Col } from "antd";
import "./dateUse.less";

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
      convertMoment,
      convertDate,
      dateRender
    } = this.props;
    const { item, indexDate, disabledDate, renderTime } = this.props;
    const { loading } = this.state;

    return (
      <Row gutter={20}>
        <Col span={24} sm={10}>
          <RangePicker
            onChange={data => editUseOfMonth(data, indexDate, index)}
            dateRender={dateRender}
            disabledDate={disabledDate}
            format={formatDate}
            className="date-picker"
            defaultValue={[
              convertMoment(convertDate(item.dateInit), formatDate),
              convertMoment(convertDate(item.dateFinish), formatDate)
            ]}
          />
        </Col>
        <Col span={19} sm={12}>{renderTime(item.timeInit, item.timeFinish, indexDate)}</Col>
        <Col span={4} sm={2}>
          <Button
            type="danger"
            shape="circle"
            loading={loading}
            icon="delete"
            onClick={() => this.deleteDates()}
            className="_flex-shrink-none"
          />
        </Col>
      </Row>
    );
  };

  renderDatePicker = () => {
    const { editUseOfMonth, index, convertMoment, convertDate } = this.props;
    const { item, indexDate, disabledDate, renderTime } = this.props;
    const { loading } = this.state;

    return (
      <Row gutter={20}>
        <Col span={24} sm={10}>
          <DatePicker
            onChange={data => editUseOfMonth(data, indexDate, index)}
            disabledDate={disabledDate}
            format={formatDate}
            className="date-picker ant-col-24"
            defaultValue={convertMoment(convertDate(item.dateInit), formatDate)}
          />
        </Col>
        <Col span={19} sm={12}>
          {renderTime(item.timeInit, item.timeFinish, indexDate)}
        </Col>
        <Col span={4} sm={2}>
          <Button
            type="danger"
            shape="circle"
            loading={loading}
            icon="delete"
            onClick={() => this.deleteDates()}
            className="_flex-shrink-none"
          />
        </Col>
      </Row>
    );
  };

  render() {
    const { item } = this.props;
    const returnDate =
      item.dateInit === item.dateFinish
        ? this.renderDatePicker()
        : this.renderRangePiker();

    return <div style={{borderBottom: '1px solid #eee', paddingBottom: 20}}>{returnDate}</div>;
  }
}

export default DateUse;
