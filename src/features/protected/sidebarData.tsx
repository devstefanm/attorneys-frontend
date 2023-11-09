import {
  AccountBalance,
  Balance,
  CurrencyExchange,
  FolderShared,
  Gavel,
  Handshake,
  LockReset,
  Policy,
} from '@mui/icons-material';
import { INavItem } from '../../types/universalTypes';

export const navItems: INavItem[] = [
  {
    id: 1,
    icon: <Policy />,
    name: 'entities.cases',
    path: '/cases',
    condition: true,
  },
  {
    id: 2,
    icon: <CurrencyExchange />,
    name: 'entities.transactions',
    path: '/transactions',
    condition: true,
  },
  {
    id: 3,
    icon: <Gavel />,
    name: 'entities.executors',
    path: '/executors',
    condition: false,
  },
  {
    id: 4,
    icon: <Balance />,
    name: 'entities.lawyers',
    path: '/lawyers',
    condition: false,
  },
  {
    id: 5,
    icon: <FolderShared />,
    name: 'entities.ssnNumbersAndPackages',
    path: '/ssn_numbers-and-packages',
    condition: false,
  },
  {
    id: 6,
    icon: <Handshake />,
    name: 'entities.clientsAndEmployers',
    path: '/clients-and-employers',
    condition: false,
  },
  {
    id: 7,
    icon: <AccountBalance />,
    name: 'entities.courtsAndCities',
    path: '/courts-and-cities',
    condition: false,
  },
  {
    id: 8,
    icon: <LockReset />,
    name: 'changePassword',
    path: '/change-password',
    condition: false,
  },
];
