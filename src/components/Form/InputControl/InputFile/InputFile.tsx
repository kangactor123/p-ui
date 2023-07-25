import React, { ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { FieldValues, useController } from 'react-hook-form';
import { InputAdornment, TextField, TextFieldProps, ThemeProvider } from '@mui/material';
import { TControl } from '../../../../common/type';
import { isValidFileFormat } from '../../../../common/helper';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { CloseSmallIcon, IconFileUpload } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';
import useAlert from '../../../Dialog/hooks/useAlert';

export type TInputFileProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & {
    placeholder?: string;
  };

const FileInputWrap = styled.div`
  position: relative;
`;

const FileInput = styled(TextField)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0;
`;

const IconContainer = styled.span`
  position: relative;
  display: flex;
`;

const iconFileDelete = css`
  z-index: 11;
  cursor: pointer;
  position: relative;
`;

function InputFile<T extends FieldValues>({
  inputProps = {},
  variant = 'outlined',
  placeholder,
  name,
  control,
  rules,
  ...props
}: TInputFileProps<T>): ReactElement {
  const { t } = useTranslation();
  const accept = inputProps.accept;
  const theme = useContext(PlayceThemeContext);
  const [fileInputKey, setFileInputKey] = useState<number>(0);
  const reader = useMemo(() => new FileReader(), []);
  const {
    field: { onChange, ref, value },
  } = useController({ control, name, rules });

  reader.addEventListener('load', (event) => {
    if (event.target?.result) onChange(event.target.result);
  });

  const fileErrorDialog = useAlert({
    title: t('Error'),
    children: t('Unsupported file format.'),
  });

  const deleteFile = useCallback((handleChange: any) => {
    handleChange('');
    setFileInputKey((val) => val + 1);
  }, []);

  const onSelectFile = useCallback(
    (e: any) => {
      const file = e.target.files[0];

      if (isValidFileFormat(file.name, ['pem', 'ppk'])) {
        reader.readAsText(file);
      } else {
        fileErrorDialog.open();
      }
    },
    [fileErrorDialog, reader],
  );

  return (
    <ThemeProvider theme={theme}>
      <FileInputWrap>
        <FileInput
          key={fileInputKey}
          type="file"
          variant={variant}
          onChange={onSelectFile}
          inputProps={{ maxLength: 255, ...inputProps, accept }}
          ref={ref}
          disabled={Boolean(value)}
          {...props}
        />
        <TextField
          variant={variant}
          value={value}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconContainer>
                  {value ? (
                    <CloseSmallIcon onClick={() => deleteFile(onChange)} css={iconFileDelete} />
                  ) : (
                    <IconFileUpload />
                  )}
                </IconContainer>
              </InputAdornment>
            ),
          }}
        />
      </FileInputWrap>
    </ThemeProvider>
  );
}

export default InputFile;
