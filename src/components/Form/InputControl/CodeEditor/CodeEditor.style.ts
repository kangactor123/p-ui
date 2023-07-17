import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div<{ maxHeight: number }>`
  overflow: auto;
  display: flex;
  align-items: stretch;
  border: 1px solid rgba(109, 115, 129, 0.3);
  border-radius: 3px;
  max-height: ${({ maxHeight }) => maxHeight}px;
`;

export const cssCodeEditorLine = css`
  padding: 15px 10px;
  box-sizing: border-box;
  min-width: 50px;
  flex: none;
  font-weight: 600;
  font-size: 14px;
  background-color: rgba(134, 147, 201, 0.2);
  height: 100%;
  min-height: 90px; ;
`;

export const cssCodeEditorTextareaWrap = css`
  display: inline-block;
  vertical-align: top;
  flex: 1;
  padding: 15px 10px;
  min-height: 90px;
  cursor: text;
  min-width: calc(100% - 50px);
  box-sizing: border-box;
  height: 100%;
`;

export const cssCodeEditorTextarea = css`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  font-family: monospace;
  display: block;
  font-size: 14px;
  line-height: 20px;
  resize: none;
  color: #383a3f;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: pre;
  overflow: hidden;
  min-width: 100%;
  outline: none;
`;

export const cssCodeEditorNumbering = css`
  display: block;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(56, 58, 63, 0.6);
`;
