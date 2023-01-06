import React, { ReactElement, useCallback, useContext, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { InputAdornment, TextFieldProps } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { CloseSmallIcon, IconFileUpload } from '../../../icons';
import { PlayceThemeContext, ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { TextField, getInputStyleBySize } from '../TextField.style';

export type UploadFile =
  | {
      value: string;
      file: File;
    }
  | undefined;

export type TInputFileProps = TextFieldProps & {
  inputSize?: 'large' | 'medium' | 'small';
  onError?: (errorMsg: string | undefined) => void;
  onDeleteOld?: () => void;
  value?: UploadFile | string;
  oldFileName?: string;
  accept?: string;
  onChange: (event: { name: string; value?: string; files?: [] }) => void;
};

const FileInputWrap = styled.div<{ fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ fullWidth }) => fullWidth && '100%'};
`;

const FileInput = styled(TextField)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0;

  input {
    cursor: pointer;
  }
`;

const IconContainer = styled.span`
  position: relative;
  display: flex;
  padding-right: 12px;
`;

const iconFileDelete = css`
  z-index: 11;
  cursor: pointer;
  position: relative;
`;

function InputFile({
  id,
  name,
  value,
  oldFileName,
  inputProps = {},
  variant = 'outlined',
  onFocus,
  onBlur,
  onError,
  onChange,
  onDeleteOld,
  inputSize = Size.L,
  ...props
}: TInputFileProps): ReactElement {
  const { t } = useTranslation();
  const theme = useContext(PlayceThemeContext);
  const inputStyle = getInputStyleBySize(inputSize);

  const inputRef = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>();

  const fakeValue = typeof value === 'string' ? value : value?.value?.toString() || '';
  const fileValue =
    fakeValue && fileRef && fileRef?.current && fileRef.current.files ? fakeValue : '';

  const { fullWidth = false, accept } = props;

  const fileProps = {
    ...props,
    inputProps,
    value: fileValue,
  };
  const fakeProps = {
    ...props,
    // inputProps: otherInputProps,
    value: fakeValue,
  };

  const placeholder = t(props.placeholder || 'Upload key file');
  const handleFocus = useCallback(
    (event: any) => {
      setTimeout(() => {
        const event = new Event('focus');
        inputRef.current?.dispatchEvent(event);
      });
      if (onFocus instanceof Function) {
        onFocus(event);
      }
    },
    [onFocus],
  );
  useEffect(() => {
    if (onError instanceof Function) {
      if (
        onError instanceof Function &&
        accept &&
        fakeValue &&
        !new RegExp(`(${accept.replace(/,/g, '|')})$`, 'i').test(fakeValue)
      ) {
        onError(t('Only {{accept}} files are available.', { accept }));
      } else {
        onError(undefined);
      }
    }
  }, [accept, fakeValue, onError, t]);

  const handleBlur = useCallback(
    (event: any) => {
      const setTimeId = setTimeout(() => {
        const event = new Event('blur');
        inputRef.current?.dispatchEvent(event);
        clearTimeout(setTimeId);
      });
      if (onBlur instanceof Function) {
        onBlur(event);
      }
    },
    [onBlur],
  );

  const handleChange = useCallback(
    (event: any) => {
      const { target } = event;
      if (onChange instanceof Function) {
        onChange(target);
      }
    },
    [onChange],
  );

  const deleteFile = useCallback(() => {
    onChange({ name: name || '' });
  }, [onChange, name]);

  return (
    <ThemeProvider theme={theme}>
      <FileInputWrap>
        <FileInput
          id={id}
          name={name}
          variant={variant}
          inputRef={fileRef}
          type="file"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          {...fileProps}
        />
        <TextField
          inputRef={inputRef}
          {...fakeProps}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconContainer>
                  {value ? (
                    <CloseSmallIcon onClick={deleteFile} css={iconFileDelete} />
                  ) : (
                    <IconFileUpload width={20} height={20} />
                  )}
                </IconContainer>
              </InputAdornment>
            ),
            inputProps: { sx: inputStyle },
          }}
        />
        {/* {oldFileName &&
          (onDeleteOld ? (
            <Chip label={oldFileName} onDelete={onDeleteOld} deleteIcon={<IconClose />} />
          ) : (
            <Chip label={oldFileName} />
          ))} */}
      </FileInputWrap>
    </ThemeProvider>
  );
}

export default InputFile;
