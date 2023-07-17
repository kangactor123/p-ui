import styled from '@emotion/styled';

export const FormRow = styled.div`
  margin-bottom: 20px;

  & .label {
    margin-bottom: 5px;
    & span {
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      color: #808080;
    }
  }
  & .required::after {
    content: '*';
    color: #e22134;
    vertical-align: middle;
    margin-left: 3px;
  }
`;
