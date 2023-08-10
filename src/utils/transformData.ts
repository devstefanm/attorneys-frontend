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
