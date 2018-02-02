import moment from "moment";

const formatHours = 'HH:mm';

export const validateHours = (hourInit, hourFinish) => {
  const timeInit = moment(hourInit, formatHours).valueOf();
  const timetFinish = moment(hourFinish, formatHours).valueOf();

  console.log(timeInit >= timetFinish)

  return timeInit >= timetFinish;
};