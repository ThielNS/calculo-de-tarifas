import {
  ADD_EQUIPMENT,
  EDIT_EQUIPMENTS,
  EDIT_USE_OF_MONTH,
  LIST_EQUIPMENTS,
  REMOVE_EQUIPMENTS,
  RESET_LIST_EQUIPMENTS
} from "../reducers/equipmentsReducer/constants";
import { get, post } from "../modules/request";

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS });
};

export const searchEquipments = name => dispatch => {
  //const limit = 5;

  return get(`equipments?name=${name}&limit=5`)
    .then(data => data)
    .catch(error => {
      console.error(error);
    });
};

export const addEquipment = data => dispatch => {
  let newData = { date: { useOfMonth: [] } };

  data.date.useOfMonth.map(item => {
    let { useOfMonth } = newData.date;
/* 
    let monthIndex = localStorage.getItem('monthIndex');
    console.log(monthIndex); */

    let dates = {
      dateInit: item.dateInit.format("YYYY-MM-DD"),
      dateFinish: item.dateFinish.format("YYYY-MM-DD"),
      timeInit: item.timeInit.format("HH:mm"),
      timeFinish: item.timeFinish.format("HH:mm")
    };

    useOfMonth.push(dates);

    return item;
  });

  newData.id = data.id;
  newData.power = data.power;
  newData.quantity = data.quantity;

  post("calculate", newData).then(response => {
    data.date.timeOfUse = response[0].timeOfUse;
    data.whiteTariff = response[0].whiteTariffEnergySpending;
    data.conventionalTariff = response[0].conventionalTariffEnergySpending;
    return dispatch({
      type: ADD_EQUIPMENT,
      data
    });
  });
};

export const removeEquipments = index => dispatch => {
  return dispatch({
    type: REMOVE_EQUIPMENTS,
    index: index
  });
};

//TODO: converter data

export const editEquipments = (dataItem, index) => dispatch => {
  post("calculate", dataItem).then(response => {
    dataItem.date.timeOfUse = response[0].timeOfUse;
    dataItem.whiteTariff = response[0].whiteTariffEnergySpending;
    dataItem.conventionalTariff = response[0].conventionalTariffEnergySpending;
    return dispatch({
      type: EDIT_EQUIPMENTS,
      dataItem,
      index
    });
  });
};

export const addUseOfMonth = (data, index) => dispatch => {
  const date = { useOfMonth: data.date.useOfMonth.concat(data.useOfMonth) };

  const item = { ...data, date };

  const { useOfMonth, ...dataItem } = item;

  post("calculate", dataItem).then(response => {
    dataItem.date.timeOfUse = response[0].timeOfUse;
    dataItem.whiteTariff = response[0].whiteTariffEnergySpending;
    dataItem.conventionalTariff = response[0].conventionalTariffEnergySpending;
    return dispatch({
      type: EDIT_EQUIPMENTS,
      dataItem,
      index
    });
  });
};

export const editUseOfMonth = (data, index) => dispatch => {
  return dispatch({
    type: EDIT_USE_OF_MONTH,
    data,
    index
  });
};

export const resetListEquipments = dispatch => {
  return {
    type: RESET_LIST_EQUIPMENTS
  };
};
