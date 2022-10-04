import React, { ReactElement } from 'react';
import { Translation as ITranslation } from 'react-i18next';

export interface ITranslationProps {
  //Todo: define props
  message: string;
  options?: Record<string, any>;
}

export function Translation({ message, options }: ITranslationProps): ReactElement {
  return <ITranslation>{(t: any) => t(message, options)}</ITranslation>;
}

export default function t(message: string, options?: Record<string, any>): ReactElement {
  return <Translation message={message} options={options} />;
}
