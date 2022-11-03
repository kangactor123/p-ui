import React, { ReactElement, startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import {
  cssCodeEditorLine,
  cssCodeEditorNumbering,
  cssCodeEditorTextarea,
  cssCodeEditorTextareaWrap,
  Wrapper,
} from './CodeEditor.style';

export type TCodeEditorProps<T extends FieldValues> = TControl<T> & {
  defaultValue?: string;
  lineHeight?: number;
  maxHeight?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function CodeEditor<T extends FieldValues>({
  name,
  rules,
  control,
  defaultValue,
  onChange,
  lineHeight = 20,
  maxHeight = 230,
}: TCodeEditorProps<T>): ReactElement {
  const [line, setLine] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const wrapDiv = useRef<HTMLDivElement>(null);
  const {
    field: { value, onChange: onControllChange },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onControllChange(event);
      if (onChange instanceof Function) {
        onChange(event);
      }

      if (textarea.current) {
        textarea.current.style.width = '0';
        textarea.current.style.height = '0';
      }

      startTransition(() => {
        if (textarea.current) {
          const scrollWidth = textarea.current.scrollWidth;
          const scrollHeight = textarea.current.scrollHeight;
          const lineNumber = Math.round(scrollHeight / lineHeight);

          textarea.current.style.width = `${scrollWidth}px`;
          textarea.current.style.height = `${scrollHeight}px`;

          setLine(lineNumber);

          if (wrapDiv.current) {
            wrapDiv.current.scrollTop = scrollHeight;
          }
        }
      });
    },
    [onControllChange, onChange, lineHeight],
  );

  useEffect(() => {
    setNumbers(() => {
      const arr = [];
      for (let i = 1; i <= line; i++) {
        arr.push(i);
      }
      return arr;
    });
  }, [line]);

  useEffect(() => {
    if (defaultValue) {
      const lineLength = defaultValue.split('\n').length;
      setLine(lineLength);
    }
  }, [defaultValue]);

  return (
    <Wrapper maxHeight={maxHeight} ref={wrapDiv}>
      <div css={cssCodeEditorLine}>
        {numbers.map((num, index) => (
          <span key={index} css={cssCodeEditorNumbering}>
            {num}
          </span>
        ))}
      </div>
      <label css={cssCodeEditorTextareaWrap}>
        <textarea ref={textarea} maxLength={32672} css={cssCodeEditorTextarea} value={value} onChange={handleChange} />
      </label>
    </Wrapper>
  );
}

export default CodeEditor;
