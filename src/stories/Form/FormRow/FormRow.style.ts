import styled from '@emotion/styled';

export const FormRow = styled.div`
  & .label {
    margin-bottom: 7px;
    & span {
      font-size: 13px;
      line-height: 1.54;
      color: rgba(56, 58, 63, 0.8);
    }
  }
  & .required::after {
    content: '*';
    color: #228be7;
    vertical-align: middle;
    margin-left: 3px;
  }
  margin-bottom: 25px;
`;
