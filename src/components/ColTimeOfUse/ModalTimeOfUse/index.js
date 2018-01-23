import React, { Component } from 'react';
import { Modal as BoxModal, Radio, DatePicker, TimePicker } from 'antd';
import moment from "moment";
import './ModalTimeOfUse.less';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valueRadio: 'continuous',
      startDate: moment(),
      endDate: moment(),
      startTime: moment(),
      endTime: moment()
    }
  }

  handleRadio = e => {
    this.setState({
      valueRadio: e.target.value,
    })
  };

  handleDate = (date, dateString) => {
    if(Array.isArray(dateString)){
      this.setState({
        startDate: dateString[0],
        endDate: dateString[1],
      })
    } else {
      this.setState({
        startDate: dateString,
        endDate: dateString,
      })
    }
  };

  changeTime = (obj, text) => {
    console.log(text)
  };

  dateRender = current => {
    if(current.month() === 0) {
      return (
        <div className="ant-calendar-date">
          {current.date()}
        </div>
      )
    } else {
      return (
        <div className="ant-calendar-date" style={{color: '#eee'}}>
          {current.date()}
        </div>
      )
    }
  };

  disabledDate = current => {

    if(!current) return false;

    const cMonth = current.month();
    const mMonth = moment().month();
    const cYear = current.year();
    const mYear = moment().year();

    return cMonth < mMonth || cMonth !== mMonth || cYear !== mYear;

  };

  renderDatePicker = () => {

    const { RangePicker } = DatePicker;
    const { valueRadio, startDate, endDate, startTime, endTime } = this.state;
    const format = 'HH:mm';

    return (
      <div className="row _margin-top">
        {valueRadio === 'continuous' ? (
          <RangePicker
            onChange={this.handleDate}
            dateRender={this.dateRender}
            disabledDate={this.disabledDate}
            format="DD/MM/YYYY"
            className="_margin-right"
            defaultValue={[moment(startDate), moment(endDate)]}
          />
        ) : (
          <DatePicker
            onChange={this.handleDate}
            disabledDate={this.disabledDate}
            format="DD/MM/YYYY"
            className="_margin-right"
            defaultValue={moment(startDate)}
          />
        )}
        <TimePicker defaultValue={startTime} format={format} placeholder="Hora inicio" className="imput-time _margin-right" onChange={this.changeTime}/>
        <TimePicker defaultValue={endTime} format={format} placeholder="Hora fim" className="imput-time" onChange={this.changeTime}/>
      </div>
    )
  };

  render() {

    const { nameEquipment, visibleModal, closeModal } = this.props;
    const { valueRadio } = this.state;
    const RadioGroup = Radio.Group;
    const RadioButton = Radio.Button;

    return (
      <div className="modal-time-of-use">
        <BoxModal
          title={`Tempo de Uso - ${nameEquipment}`}
          style={{width: '600px'}}
          visible={visibleModal}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <RadioGroup defaultValue={valueRadio} size="small" onChange={this.handleRadio}>
            <RadioButton value="continuous">Uso Contínuo</RadioButton>
            <RadioButton value="daily">Uso Diário</RadioButton>
          </RadioGroup>
          {this.renderDatePicker()}
        </BoxModal>
      </div>
    )

  }
}

export default Modal;