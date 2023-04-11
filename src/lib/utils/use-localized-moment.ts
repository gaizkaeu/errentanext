"use client";
import moment from "moment";
import 'moment/locale/es'  // without this line it didn't work

export function useLocalizedMoment() {

  moment.locale("es");
  return moment;
}