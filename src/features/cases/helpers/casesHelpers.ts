import { IOption } from '../../../components/FilterComponent';
import {
  IAddCaseForm,
  ICaseRequestData,
  ICaseResponseObject,
  IEditedCaseFormData,
  IViewCaseApiResponseData,
} from '../../../types/casesTypes';
import { IClientResponseObject } from '../../../types/clientsTypes';
import { IAutocompleteOption } from '../../../types/universalTypes';
import {
  camelToSnake,
  reverseDateFormat,
  transformDateFormat,
} from '../../../utils/transformData';

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
  status,
  oldPayment,
  ourTaxes,
  warningPrice,
  enteringDate,
  lawyerHandOverDate,
  comment,
  limitationObjection: limitation_objection,
}: IAddCaseForm): ICaseRequestData => {
  let city_id = null,
    client_id = null,
    court_id = null,
    executor_ids: (number | null)[] = [],
    lawyer_id = null,
    ssn_number_id = null,
    package_id = null,
    closing_date = null,
    employer_id = null,
    entering_date = null,
    lawyer_hand_over_date = null;

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
  if (typeof employer !== 'string') employer_id = employer?.id;

  if (closingDate) closing_date = transformDateFormat(closingDate);
  if (enteringDate) entering_date = transformDateFormat(enteringDate);
  if (lawyerHandOverDate)
    lawyer_hand_over_date = transformDateFormat(lawyerHandOverDate);

  const case_number = caseNumber;
  const contract_number = contractNumber;
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
      status,
      old_payment: oldPayment ? Number(oldPayment) : null,
      our_taxes: ourTaxes ? Number(ourTaxes) : null,
      warning_price: warningPrice ? Number(warningPrice) : null,
      entering_date,
      lawyer_hand_over_date,
      comment,
      limitation_objection,
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
    status,
    old_payment: oldPayment ? Number(oldPayment) : null,
    our_taxes: ourTaxes ? Number(ourTaxes) : null,
    warning_price: warningPrice ? Number(warningPrice) : null,
    entering_date,
    lawyer_hand_over_date,
    comment,
    limitation_objection,
  };
};

export const mapCaseApiResponseToEditCaseForm = (
  data: IViewCaseApiResponseData,
): IAddCaseForm => {
  const {
    is_legal,
    first_name,
    last_name,
    jmbg,
    name,
    pib,
    employed,
    employer,
    executors,
    cession,
    address,
    email,
    zip_code,
    city,
    case_number,
    contract_number,
    closing_date,
    business_numbers,
    lawyer,
    client,
    court,
    ssn_number,
    package: packageName,
    principal,
    interest,
    phone_numbers,
    state,
    status,
    old_payment,
    our_taxes,
    warning_price,
    entering_date,
    lawyer_hand_over_date,
    comment,
    limitation_objection,
  } = data;

  if (is_legal) {
    return {
      address,
      email,
      cession,
      name,
      pib,
      legalEntity: is_legal,
      executors:
        executors && executors.length > 0
          ? executors.map((executor) => ({
              id: executor.id,
              name: `${executor.first_name} ${executor.last_name}`,
            }))
          : [{ id: null, name: '' }],
      phoneNumbers:
        phone_numbers && phone_numbers.length > 0 ? phone_numbers : [''],
      zipCode: zip_code,
      city: city?.id ? { id: city.id, name: city.name } : '',
      caseNumber: case_number,
      contractNumber: contract_number,
      closingDate: closing_date ? reverseDateFormat(closing_date) : null,
      businessNumbers:
        business_numbers && business_numbers.length > 0
          ? business_numbers.map((businessNumber) => businessNumber.number)
          : [''],
      lawyer: lawyer?.id
        ? {
            id: lawyer.id,
            name: `${lawyer.first_name} ${lawyer.last_name}`,
          }
        : '',
      client: client?.id ? { id: client.id, name: client.name } : '',
      court: court?.id ? { id: court.id, name: court.name } : '',
      ssnNumber: ssn_number?.id
        ? { id: ssn_number.id, name: String(ssn_number.ssn) }
        : '',
      package: packageName?.id
        ? { id: packageName.id, name: packageName.package_name }
        : '',
      principal: principal.toString(),
      interest: interest.toString(),
      state: state || 'active',
      status,
      comment,
      oldPayment: old_payment ? old_payment.toString() : '',
      ourTaxes: our_taxes ? our_taxes.toString() : '',
      warningPrice: warning_price ? warning_price.toString() : '',
      enteringDate: entering_date ? reverseDateFormat(entering_date) : null,
      lawyerHandOverDate: lawyer_hand_over_date
        ? reverseDateFormat(lawyer_hand_over_date)
        : null,
      limitationObjection: limitation_objection || false,
    };
  }

  return {
    address,
    email,
    cession,
    jmbg,
    employed,
    legalEntity: is_legal,
    firstName: first_name,
    lastName: last_name,
    employer: employer?.id ? { id: employer.id, name: employer.name } : '',
    executors:
      executors && executors.length > 0
        ? executors.map((executor) => ({
            id: executor.id,
            name: `${executor.first_name} ${executor.last_name}`,
          }))
        : [{ id: null, name: '' }],
    phoneNumbers:
      phone_numbers && phone_numbers.length > 0 ? phone_numbers : [''],
    zipCode: zip_code,
    city: city?.id ? { id: city.id, name: city.name } : '',
    caseNumber: case_number,
    contractNumber: contract_number,
    closingDate: closing_date ? reverseDateFormat(closing_date) : null,
    businessNumbers:
      business_numbers && business_numbers.length > 0
        ? business_numbers.map((businessNumber) => businessNumber.number)
        : [''],
    lawyer: lawyer?.id
      ? {
          id: lawyer.id,
          name: `${lawyer.first_name} ${lawyer.last_name}`,
        }
      : '',
    client: client?.id ? { id: client.id, name: client.name } : '',
    court: court?.id ? { id: court.id, name: court.name } : '',
    ssnNumber: ssn_number?.id
      ? { id: ssn_number.id, name: String(ssn_number.ssn) }
      : '',
    package: packageName?.id
      ? { id: packageName.id, name: packageName.package_name }
      : '',
    principal: principal.toString(),
    interest: interest.toString(),
    state: state || 'active',
    status,
    comment,
    oldPayment: old_payment ? old_payment.toString() : '',
    ourTaxes: our_taxes ? our_taxes.toString() : '',
    warningPrice: warning_price ? warning_price.toString() : '',
    enteringDate: entering_date ? reverseDateFormat(entering_date) : null,
    lawyerHandOverDate: lawyer_hand_over_date
      ? reverseDateFormat(lawyer_hand_over_date)
      : null,
    limitationObjection: limitation_objection || false,
  };
};

export const mapEditCaseFormToRequestData = ({
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
  name,
  package: packageGroup,
  phoneNumbers,
  pib,
  principal,
  ssnNumber,
  zipCode: zip_code,
  state,
  status,
  oldPayment,
  ourTaxes,
  warningPrice,
  enteringDate,
  lawyerHandOverDate,
  comment,
  limitationObjection,
}: IEditedCaseFormData): Partial<ICaseRequestData> => {
  const requestData: Partial<ICaseRequestData> = {};

  if (city !== undefined) {
    if (typeof city !== 'string') {
      requestData.city_id = city.id || null;
    } else if (city === '') {
      requestData.city_id = null;
    }
  }
  if (client !== undefined) {
    if (typeof client !== 'string') {
      requestData.client_id = client.id || null;
    } else if (client === '') {
      requestData.client_id = null;
    }
  }
  if (court !== undefined) {
    if (typeof court !== 'string') {
      requestData.court_id = court.id || null;
    } else if (court === '') {
      requestData.court_id = null;
    }
  }

  if (executors !== undefined) {
    if (executors.length > 0) {
      requestData.executor_ids = executors
        .filter((executor) => executor.id !== 0 && executor.id !== null)
        .map((executor) => executor.id);
    } else {
      requestData.executor_ids = [];
    }
  }

  if (lawyer !== undefined) {
    if (typeof lawyer !== 'string') {
      requestData.lawyer_id = lawyer.id || null;
    } else if (lawyer === '') {
      requestData.lawyer_id = null;
    }
  }
  if (ssnNumber !== undefined) {
    if (typeof ssnNumber !== 'string') {
      requestData.ssn_number_id = ssnNumber.id || null;
    } else if (ssnNumber === '') {
      requestData.ssn_number_id = null;
    }
  }
  if (packageGroup !== undefined) {
    if (typeof packageGroup !== 'string') {
      requestData.package_id = packageGroup.id || null;
    } else if (packageGroup === '') {
      requestData.package_id = null;
    }
  }
  if (employer !== undefined) {
    if (typeof employer !== 'string') {
      requestData.employer_id = employer.id || null;
    } else if (employer === '') {
      requestData.employer_id = null;
    }
  }

  if (closingDate !== undefined)
    requestData.closing_date = closingDate
      ? transformDateFormat(closingDate)
      : null;
  if (enteringDate !== undefined)
    requestData.entering_date = enteringDate
      ? transformDateFormat(enteringDate)
      : null;
  if (lawyerHandOverDate !== undefined)
    requestData.lawyer_hand_over_date = lawyerHandOverDate
      ? transformDateFormat(lawyerHandOverDate)
      : null;

  if (caseNumber !== undefined) requestData.case_number = caseNumber || null;
  if (contractNumber !== undefined)
    requestData.contract_number = contractNumber || null;

  if (phoneNumbers !== undefined) {
    if (phoneNumbers.length > 0) {
      requestData.phone_numbers = phoneNumbers?.filter(
        (phoneNumber) => phoneNumber.length > 5,
      );
    } else {
      requestData.phone_numbers = [''];
    }
  }

  if (businessNumbers !== undefined) {
    if (businessNumbers.length > 0) {
      requestData.business_numbers = businessNumbers?.filter(
        (businessNumber) => businessNumber.length > 0,
      );
    } else {
      requestData.business_numbers = [''];
    }
  }

  if (name !== undefined) requestData.name = name || null;
  if (pib !== undefined) requestData.pib = pib || null;
  if (first_name !== undefined) requestData.first_name = first_name || null;
  if (last_name !== undefined) requestData.last_name = last_name || null;
  if (employed !== undefined) requestData.employed = employed;
  if (jmbg !== undefined) requestData.jmbg = jmbg || null;
  if (state !== undefined) requestData.state = state || null;
  if (comment !== undefined) requestData.comment = comment || null;
  if (status !== undefined) requestData.status = status || null;
  if (limitationObjection !== undefined)
    requestData.limitation_objection = limitationObjection || null;
  if (address !== undefined) requestData.address = address || null;
  if (cession !== undefined) requestData.cession = cession;
  if (email !== undefined) requestData.email = email || null;
  if (zip_code !== undefined) requestData.zip_code = zip_code || null;
  if (principal !== undefined)
    requestData.principal = Number(principal) || null;
  if (interest !== undefined) requestData.interest = Number(interest) || null;
  if (oldPayment !== undefined)
    requestData.old_payment = Number(oldPayment) || null;
  if (ourTaxes !== undefined) requestData.our_taxes = Number(ourTaxes) || null;
  if (warningPrice !== undefined)
    requestData.warning_price = Number(warningPrice) || null;

  return requestData;
};

export const mapClientToFilterOption = ({
  id,
  name,
}: IClientResponseObject): IOption => {
  return { id: id as number, label: name, value: id as number };
};

export const mapChecklistTrueFieldsToReqProps = (
  checklistValues: any,
): string[] => {
  return Object.keys(checklistValues)
    .filter((key) => checklistValues[key] === true)
    .map((key) => camelToSnake(key));
};
