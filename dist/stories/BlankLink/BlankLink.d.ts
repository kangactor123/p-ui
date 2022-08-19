import { ReactElement } from "react";
import { LinkProps } from "react-router-dom";
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
declare function BlankLink(props: IBlankLinkProps): ReactElement;
export default BlankLink;
