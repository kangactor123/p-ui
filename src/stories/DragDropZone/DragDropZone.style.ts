import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const DropZone = styled.div`
  border: dashed 1px #979797;
  background-color: rgba(137, 149, 174, 0.07);
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const disabledInput = css`
  display: none;
`;

export const TextArea = styled.div`
  color: #8995ae;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  text-align: center;
  margin-bottom: 20px;
`;

export const addFileBtn = css`
  min-width: 69px;
  min-height: 32px;
  background-color: #e8f3fd;
  font-size: 14px;
  color: #228be6;
  padding: 0;
  text-transform: none;
  box-shadow: none;
  &:hover {
    color: #58657f;
    box-shadow: none;
    background-color: #dbdee4;
  }
  &:disabled {
    color: rgba(88, 101, 127, 0.5);
    box-shadow: none;
    background-color: rgba(219, 222, 228, 0.5);
  }
`;

export const GuideText = styled.div`
  margin-top: 8px;
  color: #8995ae;
  font-size: 13px;
`;

export const SelectedFile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
  background-color: rgba(137, 149, 174, 0.07);
  padding: 2px 10px;
  border: 1px solid #979797;
  max-width: 300px;
`;

export const FileInfo = styled.div`
  font-size: 13px;
  gap: 8px;
  color: #191f28;
  display: flex;
`;

export const FileTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 192px;
  white-space: nowrap;
`;

export const iconButtonContainer = css`
  width: 24px;
  height: 24px;
`;

export const closeIcon = css`
  width: 15px;
`;
