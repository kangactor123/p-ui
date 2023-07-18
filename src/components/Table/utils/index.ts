/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
// export * from './object';

import { TFunction } from 'react-i18next';
import { Column } from 'react-table';
import dayjs from 'dayjs';
import { exceptFilterColumnIds } from '../Table';

export * from './useDebounce';
export * from './useLocalStorage';

export const parseContent = <T extends object>(
  columns: Column<T>[],
  datas: T[],
  t: TFunction,
): string => {
  let content = '';
  for (const data of datas) {
    content +=
      columns
        .filter((column: Column<T>) => column.Header && column.Header !== '')
        .map((column: any) => {
          try {
            // data 내용중에 콤마가 있을 경우를 대비해서 더블커테이션 처리
            const _value = column.accessor(data);
            const value =
              typeof _value !== 'object'
                ? _value === 'null'
                  ? ''
                  : _value
                : !_value
                ? ''
                : Array.isArray(_value)
                ? _value.reduce((pre: string, cur: any) => {
                    const msg = Object.prototype.hasOwnProperty.call(cur?.props, 'message')
                      ? t(cur.props.message, cur.props.options)
                      : cur;
                    return pre.concat(msg);
                  }, '')
                : Object.prototype.hasOwnProperty.call(_value?.props, 'message')
                ? t(_value?.props?.message, _value?.props?.options)
                : _value;

            return '"' + value + '"';
          } catch (error) {
            return '';
          }
        })
        .join(',') + '\n';
  }
  return content;
};

// CSV 파일 이름 포맷이 아직 정해지지 않아서 임시로 Custom Name 인지 체크해서 분기로 처리
export const downloadReport = <T extends object>(
  columns: Column<T>[],
  data: T[],
  name: string,
  t: TFunction,
) => {
  const targetColumns = columns.filter(
    (column: Column<T>) => !exceptFilterColumnIds.includes(column.id || '') && !/_isAction$/i.test(column.id || ''),
  );
  const headers =
    targetColumns
      .filter((column: Column<T>) => column.Header && column.Header !== '')
      .map((column: any) => {
        const _header = column.Header;
        const header = Object.prototype.hasOwnProperty.call(_header?.props || {}, 'message')
          ? t(_header?.props?.message, _header?.props?.options)
          : _header;

        return header;
      })
      .join(',') + '\n';
  const content = data.length ? headers + parseContent<T>(targetColumns, data, t) : headers;
  // const fileName = `ApplicationMigrator_${name}_${dayjs().format('YYYYMMDDHHmm')}.csv`;
  const fileName = `${name}_data`;
  saveDataByCsv(`${fileName}_${dayjs().format('YYYYMMDDHHmm')}.csv`, content);
};

export const saveDataByCsv = (fileName: string, content: string) => {
  const blob = new Blob(['\ufeff' + content]);
  const uncodedUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', uncodedUrl);
  link.setAttribute('download', fileName);
  link.click();
};
