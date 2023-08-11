import { CurrencyExchange, Gavel, Policy } from '@mui/icons-material';
import { INavItem } from '../../types/universalTypes';

export const navItems: INavItem[] = [
  {
    id: 1,
    icon: <Policy />,
    name: 'entities.cases',
    path: '/cases',
  },
  {
    id: 2,
    icon: <CurrencyExchange />,
    name: 'entities.transactions',
    path: '/transactions',
  },
  {
    id: 3,
    icon: <Gavel />,
    name: 'entities.lawyers',
    path: '/lawyers',
  },
  // {
  //   id: 4,
  //   icon: <Gavel />,
  //   name: 'entities.courts',
  //   path: '/courts',
  // },
];
