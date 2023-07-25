import React, { ReactElement, ReactNode, useContext } from 'react';
import { FormRow as Wrapper } from './FormRow.style';
import { cx } from '@emotion/css';
import { SerializedStyles } from '@emotion/react';
import ValidationMessage from '../../ValidationMessage';
import { PlayceThemeContext, ThemeProvider } from '../../../providers';

export interface IFormRowProps {
  label: string;
  children: ReactNode; //InputNode
  displayLabel?: boolean;
  required?: boolean;
  display?: boolean;
  inputBoxCss?: SerializedStyles;
  helperMessage?: string | null;
  className?: SerializedStyles;
}

function FormRow(props: IFormRowProps): ReactElement {
  const {
    className,
    label,
    children,
    displayLabel = true,
    display = true,
    required = false,
    helperMessage,
    inputBoxCss,
  } = props;
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      {display ? (
        <Wrapper css={className}>
          {displayLabel ? (
            <div className={cx('label')}>
              <span className={cx({ required })}>{label}</span>
            </div>
          ) : null}
          <div css={inputBoxCss}>{children}</div>
          {helperMessage ? <ValidationMessage text={helperMessage} isError={true} /> : null}
        </Wrapper>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

export default FormRow;
