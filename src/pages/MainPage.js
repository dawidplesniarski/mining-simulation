import React from 'react';
import styled from "styled-components";
import MinersView from "../components/views/MinersView";
import BlocksView from "../components/views/BlocksView";

const MainView = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.button`
  border: 0;
  background-color: #FFF;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  width: 100%;
  height: 90%;
`;

const MainPage = () => {

    return (
        <MainView>
            <RowWrapper>
                <BlocksView />
                <MinersView />
            </RowWrapper>
        </MainView>
    );
};

export default MainPage;
