"use client";
import moment from "moment";
import 'moment/locale/es'  // without this line it didn't work

import { useLocale } from "next-intl";

export function useLocalizedMoment() {
  const locale = useLocale();

  moment.locale(locale);
  return moment;
}