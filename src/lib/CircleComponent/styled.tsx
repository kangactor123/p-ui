import styled from "@emotion/styled";

export const Circle = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => props.color};
`;
