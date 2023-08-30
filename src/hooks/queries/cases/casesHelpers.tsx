import { DoNotDisturb, TaskAlt } from '@mui/icons-material';
import {
  ICaseApiResponseData,
  ICasesFirstRowData,
} from '../../../types/casesTypes';
import { uppercaseFirstLetter } from '../../../utils/transformData';

export const mapApiResponseToFirstRow = ({
  first_name,
  last_name,
  case_number,
  contract_number,
  jmbg,
  pib,
  name,
  executors,
  lawyer_first_name,
  lawyer_last_name,
  lawyer_office_name,
  state,
  ssn,
  package: packageName,
  business_numbers,
  cession,
  principal,
  interest,
}: ICaseApiResponseData): ICasesFirstRowData => ({
  name: name
    ? uppercaseFirstLetter(name)
    : `${first_name ? uppercaseFirstLetter(first_name) : ''} ${
        last_name ? uppercaseFirstLetter(last_name) : ''
      }`,
  jmbg_pib: (jmbg ? jmbg : '') || (pib ? pib : ''),
  caseNumber: case_number,
  contractNumber: contract_number,
  executors,
  lawyer: lawyer_office_name
    ? `${lawyer_first_name ? uppercaseFirstLetter(lawyer_first_name) : ''} ${
        lawyer_last_name ? uppercaseFirstLetter(lawyer_last_name) : ''
      } (${uppercaseFirstLetter(lawyer_office_name)})`
    : `${lawyer_first_name ? uppercaseFirstLetter(lawyer_first_name) : ''} ${
        lawyer_last_name ? uppercaseFirstLetter(lawyer_last_name) : ''
      }`,
  ssn: ssn ?? '',
  package: packageName ?? '',
  state,
  businessNumbers: business_numbers,
  cession: cession ? (
    <TaskAlt color="success" />
  ) : (
    <DoNotDisturb color="error" />
  ),
  principal,
  interest,
});
