import {
  AppBar,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { LayoutProps } from '..';
import { ErrorBoundary } from '../../ErrorBoundary';
import * as React from 'react';
import { languageOptionsData } from '../nav/languageOptionsData';

export type HeaderProps = LayoutProps & {
  pageLabel: string;
};

const Header = (props: HeaderProps) => {
  const { pageLabel, openSidebar, toggleOpenSidebar } = props;

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  return (
    <ErrorBoundary>
      <React.Suspense>
        <AppBar
          position="absolute"
          className={`z-[9999] ${openSidebar ? 'left-60' : ''} transition-all`}
        >
          <Toolbar className="transition-all">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleOpenSidebar}
              className={`mr-9 ${openSidebar ? 'hidden' : ''} transition-all`}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="grow"
            >
              {t(pageLabel)}
            </Typography>
            <Select
              labelId="demo-simple-select-standard-label"
              variant="standard"
              id="demo-simple-select-standard"
              value={currentLanguage}
              className={`w-10 flex ${openSidebar ? 'mr-60' : ''}`}
              onChange={(event) =>
                i18n.changeLanguage(event.target.value as string)
              }
              label={t('language')}
              MenuProps={{
                className: 'mt-4',
              }}
              inputProps={{ IconComponent: () => null, className: 'px-2' }}
            >
              {languageOptionsData.map((option) => (
                <MenuItem
                  key={option.id}
                  className="margin-auto px-2"
                  value={option.name}
                >
                  {option.icon}
                </MenuItem>
              ))}
            </Select>
          </Toolbar>
        </AppBar>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Header };
