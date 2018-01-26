
import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS } from "../reducers/equipmentsReducer/constants";
import { get, post } from "../modules/request";

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS })
};

export const searchEquipments = name => dispatch => {

  // const limit = 5;

  return get(`equipments?name={name}&limit={limit}`)
    .then(data => data)
    .catch(error => {
      console.error(error);
    })
};

export const addEquipment = data => dispatch => {

  let newData = { date: { useOfMonth: [] } };


  data.date.useOfMonth.map((item) => {

    let { useOfMonth } = newData.date;

    let dates = {
      dateInit: item.dateInit.format('YYYY-MM-DD'),
      dateFinish: item.dateFinish.format('YYYY-MM-DD'),
      timeInit: item.timeInit.format('HH:mm'),
      timeFinish: item.timeFinish.format('HH:mm')
    };

    useOfMonth.push(dates);

    return item
  });

  newData.id = data.id;
  newData.power = data.power;
  newData.quantity = data.quantity;

  post('calculate', newData)
    .then(response => {
      data.date.timeOfUse = response[0].timeOfUse;
      data.whiteTariff = response[0].whiteTariffEnergySpending;
      data.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: ADD_EQUIPMENT,
        data
      })
    });


};

export const removeEquipments = index => dispatch => {
  console.log(index);
  return dispatch({
    type: REMOVE_EQUIPMENTS,
    index: index
  })
};