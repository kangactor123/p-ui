import { ButtonProps } from '@mui/material';
import React, { ReactElement, useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import { AddSmallIcon, RemoveIcon } from '../icons';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IAccordionAction<T> {
  expanded: T;
  setExpanded: React.Dispatch<React.SetStateAction<T>>;
  buttonProps?: ButtonProps;
  iconPosition?: 'start' | 'end';
}

function AccordionAction<T>({
  expanded,
  setExpanded,
  buttonProps = { variant: 'text', color: 'primary', size: 'small' },
  iconPosition = 'start',
}: IAccordionAction<T>): ReactElement {
  const { t } = useTranslation();
  const theme = useContext(PlayceThemeContext);
  const isAllCollapsed = useCallback(() => {
    return expanded && !Object.keys(expanded).some((key) => expanded[key as keyof T]);
  }, [expanded]);

  const handleClick = useCallback(() => {
    const newExpanded = { ...expanded };
    const isCollapsed = isAllCollapsed();
    Object.keys(expanded).forEach((key) => {
      newExpanded[key as keyof T] = isCollapsed as unknown as T[keyof T];
    });

    if (setExpanded instanceof Function) {
      setExpanded(newExpanded);
    }
  }, [expanded, isAllCollapsed, setExpanded]);

  const label = useMemo(
    () => (isAllCollapsed() ? t('Expand All') : t('Collapse All')),
    [isAllCollapsed, t],
  );

  const icon = useMemo(
    () => (isAllCollapsed() ? <AddSmallIcon /> : <RemoveIcon />),
    [isAllCollapsed],
  );

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handleClick}
        sx={{ color: '#999999' }}
        {...(iconPosition === 'start' ? { ...{ startIcon: icon } } : { ...{ endIcon: icon } })}
        {...buttonProps}
      >
        {label}
      </Button>
    </ThemeProvider>
  );
}

export default AccordionAction;
