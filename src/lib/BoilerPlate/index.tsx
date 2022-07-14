import React from "react";

// type 은 인터페이스로 설정한다
interface Props {
  contents?: string;
}

function BoilerPlate({ contents = "hello world!" }: Props) {
  return <div>{contents}</div>;
}

export default BoilerPlate;
