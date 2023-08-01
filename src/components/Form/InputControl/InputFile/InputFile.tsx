import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { Chip, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { CloseSmallIcon, IconClose, IconFileUpload } from '../../../icons';
import { ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';

export type UploadFile =
  | {
      value: string;
      file: File;
    }
  | undefined;

export type TInputFileProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  onError?: (errorMsg: string | undefined) => void;
  onDeleteOld?: () => void;
  oldFileName?: string;
  value?: UploadFile | string;
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

const iconFileDelete = css`
  z-index: 11;
  cursor: pointer;
  position: relative;
`;

const inputWrap = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const chipStyle = css`
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  padding: 3px;
`;

function InputFile({
  id,
  name,
  value,
  oldFileName,
  onFocus,
  onBlur,
  onError,
  onChange,
  onDeleteOld,
  placeholder = 'Upload key file',
  size = Size.M,
  fullWidth = false,
  accept,
  ...fileInputProps
}: TInputFileProps): ReactElement {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>();

  const fakeValue = typeof value === 'string' ? value : value?.value?.toString() || '';
  const fileValue =
    fakeValue && fileRef && fileRef?.current && fileRef.current.files ? fakeValue : '';

  const fileProps = {
    ...fileInputProps,
    value: fileValue,
  };
  const fakeProps = {
    ...fileInputProps,
    value: fakeValue,
  };

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
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
    (event: React.FocusEvent<HTMLInputElement>) => {
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

  const handleDeleteFile = useCallback(() => {
    onChange({ name: name || '' });
  }, [onChange, name]);

  return (
    <ThemeProvider>
      <FileInputWrap fullWidth={fullWidth}>
        <div css={inputWrap}>
          <FileInput
            size={size}
            id={id}
            name={name}
            inputRef={fileRef}
            type="file"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            {...fileProps}
          />
          <TextField
            size={size}
            inputRef={inputRef}
            placeholder={placeholder}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disableRipple>
                    {value ? (
                      <CloseSmallIcon onClick={handleDeleteFile} css={iconFileDelete} />
                    ) : (
                      <IconFileUpload width={20} height={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...fakeProps}
          />
          {oldFileName &&
            (onDeleteOld ? (
              <Chip
                css={chipStyle}
                label={oldFileName}
                onDelete={onDeleteOld}
                deleteIcon={<IconClose />}
              />
            ) : (
              <Chip label={oldFileName} />
            ))}
        </div>
      </FileInputWrap>
    </ThemeProvider>
  );
}

export default InputFile;
