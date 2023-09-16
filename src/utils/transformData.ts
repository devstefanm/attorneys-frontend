import moment from 'moment';
import { ITableSearchable } from '../types/universalTypes';

export const uppercaseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const camelToSnake = (camelCaseString: string) =>
  camelCaseString.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);

export const snakeToCamel = (snakeCaseString: string) =>
  snakeCaseString.replace(/_([a-z])/g, (_match, letter) =>
    letter.toUpperCase(),
  );

export const mapSearchToQueryParam = (search: ITableSearchable) => {
  const { key, value } = search;
  return { [camelToSnake(key)]: value };
};

export const transformDateFormat = (
  inputDate: string | Date | moment.Moment,
): string | null => {
  // Parse the input date using Moment.js with the expected input format
  const parsedDate = moment(inputDate, 'DD. MM. YYYY');

  // Check if the parsed date is valid
  if (parsedDate.isValid()) {
    // Format the date as YYYY-MM-DD
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    return formattedDate;
  }

  // Return null if the input date is not in the expected format or is invalid
  return null;
};

export const reverseDateFormat = (
  inputDate: string | null,
): moment.Moment | null => {
  if (inputDate === null) {
    return null;
  }

  // Parse the input date using Moment.js with the expected input format
  const parsedDate = moment(inputDate, 'YYYY-MM-DD');

  // Check if the parsed date is valid
  if (parsedDate.isValid()) {
    // Return the parsed date as a moment.Moment object
    return parsedDate;
  }

  // Return the input date as a string if it's not in the expected format or is invalid
  return null;
};
