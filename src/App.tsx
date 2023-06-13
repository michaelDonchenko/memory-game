import styled from "@emotion/styled";
import Button from "./components/Button";
import GameScreen from "./components/GameScreen";
import useGameBoard from "./hooks/useGameBoard";

export default function () {
  const {onRestart, computedBoardState, onChipClick} = useGameBoard();

  return (
    <MainWrapper>
      <StyledHeader>
        <Title>Memory game</Title>
        <ButtonsWrapper>
          <Button onClick={onRestart} variant="primary">
            Restart
          </Button>
          <Button onClick={() => {}} variant="secondary">
            New Game
          </Button>
        </ButtonsWrapper>
      </StyledHeader>
      <GameScreen computedBoardState={computedBoardState} onChipClick={onChipClick} />
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

const StyledHeader = styled.header`
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
