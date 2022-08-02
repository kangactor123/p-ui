import React, { ReactElement } from "react";

import { Switch, SwitchProps, styled as MUIStyled } from "@mui/material";
import styled from "@emotion/styled";

/**
 * AntSwitch Component
 * Props 의 ClassName 이 사용이 될까요?
 */

// const Ant = styled(Switch)`
//   color: #fff;
//   width: 40px;
//   height: 19px;
//   padding: 0;
//   display: flex;
//   justify-content: flex-start;
//   & .MuiButtonBase-root {
//     justify-content: flex-start;
//   }
// `;

const AntSwitchComponent = MUIStyled(Switch)<SwitchProps>({
  color: "#fff",
  width: 40,
  height: 19,
  padding: 0,
  display: "flex",
  justifyContent: "flex-start",
  "& .MuiButtonBase-root": {
    justifyContent: "flex-start",
  },
  "& .MuiSwitch-switchBase": {
    width: 30,
    height: 19,
    padding: 2,
    color: (props: any) => props.theme.color,
    // borderColor: theme.palette.primary.main,
    justifyContent: "flex-start",
    "& .Mui-checked": {
      transform: "translateX(12px)",
      color: "#4285f4",
      justifyContent: "flex-end",
      "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#D1D7E2",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    textAlign: "left",
    width: 40,
    height: 19,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#D1D7E2",
    // border: `1px solid ${theme.palette.grey[500]}`,
  },
});

const Wrapper = styled.div`
  display: inline-block;
  & .switch {
    display: inline-flex;
  }
  & .label {
    margin-left: 8px;
    display: inline-flex;
  }
`;

export interface IAntSwitchProps extends SwitchProps {
  label: string;
}

function AntSwitch(props: IAntSwitchProps): ReactElement {
  return (
    <Wrapper>
      <AntSwitchComponent className="switch" {...props} />
      <span className="label">{props.label}</span>
    </Wrapper>
  );
}

export default AntSwitch;