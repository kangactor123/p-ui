// export * from './object';
import { formatDate, getProjectId } from 'common/lib/utils';
import { saveDataByCsv } from 'common/lib/jsUtils';
import { Project, useProject } from 'modules/projects';

export * from './useDebounce';
export * from './useLocalStorage';

export const parseContent = <T = any>(columns: any[], datas: T[]) => {
  let content = '';
  for (const data of datas) {
    content +=
      columns
        .map((column: any) => {
          try {
            // data 내용중에 콤마가 있을 경우를 대비해서 더블커테이션 처리
            const value = column.accessor(data) === 'null' || !column.accessor(data) ? '' : column.accessor(data);
            return '"' + value + '"';
          } catch (error) {
            return '';
          }
        })
        .join(',') + '\n';
  }
  return content;
};

export const downloadReport = <T = any>(columns: any[], data: T[], name: string, projectName?: string) => {
  const targetColumns = columns.filter(
    (column: any) =>
      column.id !== 'assessmentReport' &&
      column.id !== 'surveyResult_isAction' &&
      column.id !== 'expander' &&
      column.id !== 'File Download',
  );
  const headers =
    targetColumns
      .filter((column: any) => column.Header && column.Header !== '')
      .map((column: any) => column.Header)
      .join(',') + '\n';
  const content = data.length ? headers + parseContent<T>(targetColumns, data) : headers;
  const fileName = `${projectName ? projectName + '_' : ''}${name}_${formatDate(
    new Date().getTime(),
    'YYYYMMDDHHMI',
  )}.csv`;
  saveDataByCsv(fileName, content);
};
