import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import { IconTogCollapseGray, IconTogExpandGray } from '../icons';
import { IAccordionAction } from './type';

function AccordionAction<T>({ expanded, setExpanded }: IAccordionAction<T>): ReactElement {
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

  const icon = useMemo(() => (isAllCollapsed() ? <IconTogExpandGray /> : <IconTogCollapseGray />), [isAllCollapsed]);

  return <Button variant="text" onClick={handleClick} endIcon={icon} text={label} />;
}

export default AccordionAction;
