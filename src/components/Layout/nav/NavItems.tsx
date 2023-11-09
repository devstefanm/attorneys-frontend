import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { INavItem } from '../../../types/universalTypes';
import { ErrorBoundary } from '../../ErrorBoundary';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useValidateUser from '../../../hooks/utils/useValidateUser';

type Props = {
  navItems: INavItem[];
};

const NavItems = (props: Props) => {
  const { navItems } = props;

  const { role } = useValidateUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ErrorBoundary>
      <React.Suspense>
        {navItems.map((item) =>
          role?.toLowerCase() === 'visitor' ? (
            item.condition === true && (
              <ListItemButton
                className="max-h-12"
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                key={item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  className="[&>span]:text-sm"
                  primary={t(item.name)}
                />
              </ListItemButton>
            )
          ) : (
            <ListItemButton
              className="max-h-12"
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              key={item.id}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                className="[&>span]:text-sm"
                primary={t(item.name)}
              />
            </ListItemButton>
          ),
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { NavItems };
