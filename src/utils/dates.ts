import { format, formatDistance, formatRelative, isValid } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const locales = {
  fr,
  en: enUS,
};

export const formatDate = (
  date: Date | string | number,
  formatStr: string = 'PP',
  locale: keyof typeof locales = 'en'
): string => {
  const dateObj = new Date(date);
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  return format(dateObj, formatStr, { locale: locales[locale] });
};

export const getRelativeTime = (
  date: Date | string | number,
  locale: keyof typeof locales = 'en'
): string => {
  const dateObj = new Date(date);
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: locales[locale],
  });
};

export const getRelativeTimeFromNow = (
  date: Date | string | number,
  locale: keyof typeof locales = 'en'
): string => {
  const dateObj = new Date(date);
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  return formatRelative(dateObj, new Date(), { locale: locales[locale] });
};