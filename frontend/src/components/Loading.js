import React from "react";
import styled from "styled-components";

export const Loading = () => {
  return (
    <LoadingBackground>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src="images/loading.gif" alt="로딩중" width="8%" />
    </LoadingBackground>
  );
};

const LoadingBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  // background: transparent;
  background: rgba(253, 221, 200, 0.7);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// background: #ffffffb7;

const LoadingText = styled.div`
  font: 2rem font;
  text-align: center;
`;

export default Loading;
