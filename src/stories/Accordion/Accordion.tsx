import React, { ReactElement, useCallback } from 'react';
import { css } from '@emotion/react';
import { IconArrow2DownBlack } from '../icons';
import { IAccordionProps } from './type';
import { AccordionDetails, AccordionPanel, AccordionSummary } from './style';

function Accordion({
  summaryProps: { iconPosition = 'start', useEdgeEndIcon = true, children: summaryChildren, ...summaryProps },
  detailsProps,
  children,
  name,
  defaultExpanded = true,
  onChange,
  ...props
}: IAccordionProps): ReactElement {
  const handleChange = useCallback(
    (event: React.SyntheticEvent, expanded: boolean) => {
      if (onChange instanceof Function) {
        onChange(name, expanded);
      }
    },
    [onChange, name],
  );

  return (
    <AccordionPanel defaultExpanded={defaultExpanded} onChange={handleChange} {...props}>
      <AccordionSummary
        css={css({
          '& .MuiAccordionSummary-content,& .MuiAccordionSummary-content.Mui-expanded': {
            marginLeft: iconPosition === 'end' ? '0px' : '6px',
          },
          flexDirection: iconPosition === 'end' ? undefined : 'row-reverse',
          '& .MuiAccordionSummary-expandIconWrapper': {
            transform: 'rotate(270deg)',
          },
        })}
        expandIcon={useEdgeEndIcon ? <IconArrow2DownBlack /> : null}
        {...summaryProps}
      >
        {summaryChildren}
      </AccordionSummary>
      <AccordionDetails {...detailsProps}>{children}</AccordionDetails>
    </AccordionPanel>
  );
}

export default Accordion;
