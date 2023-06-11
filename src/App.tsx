import {useState} from "react";
import styled from "@emotion/styled";
import Button from "./components/Button";
import GameScreen from "./components/GameScreen";

export default function () {
  // const [gameState, setGameState] = useState<"game" | "settings">("game");

  return (
    <MainWrapper>
      <Header>
        <Title>Memory game</Title>
        <ButtonsWrapper>
          <Button variant="primary">Restart</Button>
          <Button variant="secondary">New Game</Button>
        </ButtonsWrapper>
      </Header>

      <GameScreen />
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  width: 900px;
  max-width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 28spx;
  font-family: "Courier New", Courier, monospace;
`;
