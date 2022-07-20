import React, { ReactElement, useMemo } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "@emotion/styled";

// }

/**
 * Link 태그는 Router 안에서만 활성화 됩니다.
 * Storybook 에서 작성하면
 * useHref() may be used only in the context of a <Router> component.
 * 해당 에러가 나옵니다.
 */

export interface IBlankLinkProps extends LinkProps {
  text: string;
  isLeftIcon?: boolean;
}

const Link = styled(RouterLink)`
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled(OpenInNewIcon)<{ isLeftIcon: boolean }>`
  margin-left: ${(props) => !props.isLeftIcon && "5px"};
  margin-right: ${(props) => props.isLeftIcon && "5px"};
  vertical-align: middle;
`;

function BlankLink(props: IBlankLinkProps): ReactElement {
  const { to, text, isLeftIcon = false } = props;
  const LinkIcon = useMemo(
    () => () => <Icon isLeftIcon={isLeftIcon} fontSize="small" />,
    [isLeftIcon]
  );
  return (
    <Link to={to} target="_blank">
      {isLeftIcon ? (
        <>
          <LinkIcon />
          {text}
        </>
      ) : (
        <>
          {text}
          <LinkIcon />
        </>
      )}
    </Link>
  );
}

export default BlankLink;
