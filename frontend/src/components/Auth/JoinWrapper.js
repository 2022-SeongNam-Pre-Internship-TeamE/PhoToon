import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 580px;

`;

// 로고
const LogoWrapper = styled.div`
    background: white;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;

const Logo = styled(Link)`
    color: black;
    font-size: 2.4rem;
    letter-spacing: 5px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`;

const JoinWrapper = ({children}) => (
    
    <Positioner>
        <ShadowedBox >
            <LogoWrapper >
                <Logo to="/Join">SIGN UP</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
    
);

export default JoinWrapper;