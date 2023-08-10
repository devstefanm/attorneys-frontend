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
  lawyer_first_name,
  lawyer_last_name,
  lawyer_office_name,
  status,
  ssn,
  package: packageName,
  client_name,
  court_name,
  cession,
  principal,
  interest,
}: ICaseApiResponseData): ICasesFirstRowData => ({
  name: name
    ? uppercaseFirstLetter(name)
    : `${first_name ? uppercaseFirstLetter(first_name) : ''} ${
        last_name ? uppercaseFirstLetter(last_name) : ''
      }`,
  jmbg_pib: (jmbg ? jmbg : '') ?? (pib ? pib : ''),
  caseNumber: case_number,
  contractNumber: contract_number,
  lawyer: lawyer_office_name
    ? uppercaseFirstLetter(lawyer_office_name)
    : `${lawyer_first_name ? uppercaseFirstLetter(lawyer_first_name) : ''} ${
        lawyer_last_name ? uppercaseFirstLetter(lawyer_last_name) : ''
      }`,
  ssn: ssn ?? '',
  package: packageName ?? '',
  status,
  client: client_name ?? '',
  cession: cession ? (
    <TaskAlt color="success" />
  ) : (
    <DoNotDisturb color="error" />
  ),
  principal,
  interest,
  court: court_name,
});
