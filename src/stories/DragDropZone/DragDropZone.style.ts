import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const DropZone = styled.div`
  border: 1px dashed #0073ea;
  background-color: #fff;
  min-height: 116px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const disabledInput = css`
  display: none;
`;

export const TextArea = styled.div`
  color: #9195a1;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 10px;
`;

export const addFileBtn = css`
  background-color: #cce5ff;
  color: #323338;
`;

export const GuideText = styled.div`
  margin-top: 5px;
  color: #808080;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

export const SelectedFile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #c5c7d0;
  max-width: 300px;
  height: 32px;
  border-radius: 4px;
`;

export const FileInfo = styled.div`
  font-size: 14px;
  gap: 8px;
  line-height: 22px;
  font-weight: 400;
  color: #323338;
  display: flex;
  margin-right: 8px;
`;

export const FileTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
  white-space: nowrap;
`;

export const iconButtonContainer = css`
  padding: 0px;
`;
