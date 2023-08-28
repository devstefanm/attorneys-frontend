import {
  IAddCaseForm,
  ICaseRequestData,
  IResponseObject,
} from '../../../types/casesTypes';
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
  responseObject: IResponseObject,
) => {
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
  businessNumbers: business_numbers,
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
  executor,
  firstName: first_name,
  interest,
  jmbg,
  lastName: last_name,
  lawyer,
  legalEntity,
  name,
  package: packageGroup,
  phoneNumbers: phone_numbers,
  pib,
  principal,
  ssnNumber,
  zipCode: zip_code,
}: IAddCaseForm): ICaseRequestData => {
  let city_id = null,
    client_id = null,
    court_id = null,
    executor_id = null,
    lawyer_id = null,
    ssn_number_id = null,
    package_id = null,
    closing_date = null,
    employer_id = null;

  if (typeof city !== 'string') city_id = city.id;
  if (typeof client !== 'string') client_id = client.id;
  if (typeof court !== 'string') court_id = court.id;
  if (typeof executor !== 'string') executor_id = executor.id;
  if (typeof lawyer !== 'string') lawyer_id = lawyer.id;
  if (typeof ssnNumber !== 'string') ssn_number_id = ssnNumber.id;
  if (typeof packageGroup !== 'string') package_id = packageGroup.id;
  if (typeof employer !== 'string') employer_id = employer.id;

  if (closingDate) closing_date = transformDateFormat(closingDate);

  const case_number = Number(caseNumber);
  const contract_number = Number(contractNumber);

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
      executor_id,
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
    executor_id,
    lawyer_id,
    ssn_number_id,
    package_id,
    phone_numbers,
    business_numbers,
    closing_date,
  };
};
