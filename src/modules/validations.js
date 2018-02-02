import moment from "moment";

const formatHours = 'HH:mm';

export const validateHours = (hourInit, hourFinish) => {
  const timeInit = moment(hourInit, formatHours).valueOf();
  const timeFinish = moment(hourFinish, formatHours).valueOf();

  console.log(timeInit)
  console.log(timeFinish)
  console.log((timeFinish-timeInit));
  return timeInit >= timeFinish;
};