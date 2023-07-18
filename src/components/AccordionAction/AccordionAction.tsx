import { ButtonProps } from '@mui/material';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import { AddSmallIcon, RemoveIcon } from '../icons';

interface IAccordionAction<T> {
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

  const label = useMemo(() => (isAllCollapsed() ? t('Expand All') : t('Collapse All')), [isAllCollapsed, t]);

  const icon = useMemo(() => (isAllCollapsed() ? <AddSmallIcon /> : <RemoveIcon />), [isAllCollapsed]);

  return (
    <Button
      onClick={handleClick}
      sx={{ color: '#999999' }}
      {...(iconPosition === 'start' ? { ...{ startIcon: icon } } : { ...{ endIcon: icon } })}
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

export default AccordionAction;
