import {
  IAddCaseForm,
  ICaseRequestData,
  ICaseResponseObject,
} from '../../../types/casesTypes';
import { IAutocompleteOption } from '../../../types/universalTypes';
import { transformDateFormat } from '../../../utils/transformData';

export const mapStatusToBorderColor = (status: string): string => {
  switch (status) {
    case 'active':
      return '#22c55e';
    case 'closed':
      return '#9ca3af';
    default:
      return '';
  }
};

export const mapApiResponseToAutocompleteOptions = (
  responseObject: ICaseResponseObject,
): IAutocompleteOption<string> => {
  const {
    id,
    first_name,
    last_name,
    name: responseName,
    package_name,
    ssn,
  } = responseObject;
  let name = '';
  if (responseName) {
    name = responseName;
  }

  if (first_name) {
    name = `${first_name} ${last_name ?? ''}`;
  }

  if (package_name) {
    name = package_name;
  }

  if (ssn) {
    name = ssn;
  }

  return {
    id,
    name,
  };
};

export const mapAddCaseFormToRequestData = ({
  address,
  businessNumbers,
  caseNumber,
  cession,
  city,
  client,
  closingDate,
  contractNumber,
  court,
  email,
  employed,
  employer,
  executors,
  firstName: first_name,
  interest,
  jmbg,
  lastName: last_name,
  lawyer,
  legalEntity,
  name,
  package: packageGroup,
  phoneNumbers,
  pib,
  principal,
  ssnNumber,
  zipCode: zip_code,
}: IAddCaseForm): ICaseRequestData => {
  let city_id = null,
    client_id = null,
    court_id = null,
    executor_ids: (number | null)[] = [],
    lawyer_id = null,
    ssn_number_id = null,
    package_id = null,
    closing_date = null,
    employer_id = null;

  if (typeof city !== 'string') city_id = city.id;
  if (typeof client !== 'string') client_id = client.id;
  if (typeof court !== 'string') court_id = court.id;
  if (typeof executors !== null)
    executor_ids = executors
      .map((executor) => executor.id)
      .filter((id) => id !== null);
  if (typeof lawyer !== 'string') lawyer_id = lawyer.id;
  if (typeof ssnNumber !== 'string') ssn_number_id = ssnNumber.id;
  if (typeof packageGroup !== 'string') package_id = packageGroup.id;
  if (typeof employer !== 'string') employer_id = employer.id;

  if (closingDate) closing_date = transformDateFormat(closingDate);

  const case_number = Number(caseNumber);
  const contract_number = Number(contractNumber);
  const phone_numbers = phoneNumbers.filter(
    (phoneNumber) => phoneNumber.length > 5,
  );
  const business_numbers = businessNumbers.filter(
    (businessNumber) => businessNumber.length > 0,
  );

  if (legalEntity) {
    return {
      name,
      pib,
      address,
      cession,
      email,
      zip_code,
      case_number,
      contract_number,
      principal: Number(principal),
      interest: Number(interest),
      city_id,
      client_id,
      court_id,
      executor_ids,
      lawyer_id,
      ssn_number_id,
      package_id,
      phone_numbers,
      business_numbers,
      closing_date,
    };
  }

  return {
    first_name,
    last_name,
    employed,
    employer_id,
    jmbg,
    address,
    cession,
    email,
    zip_code,
    case_number,
    contract_number,
    principal: Number(principal),
    interest: Number(interest),
    city_id,
    client_id,
    court_id,
    executor_ids,
    lawyer_id,
    ssn_number_id,
    package_id,
    phone_numbers,
    business_numbers,
    closing_date,
  };
};
