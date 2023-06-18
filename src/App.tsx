import styled from "@emotion/styled";
import Button from "./components/buttons/Button";
import GameScreen from "./components/GameScreen";
import useGameBoard from "./hooks/useGameBoard";
import {useCallback, useState} from "react";
import SettingsScreen from "./components/SettingsScreen";
import useSettings from "./hooks/useSettings";
import StatsFooter from "./components/StatsFooter";
import {GameType} from "./utils/generateGameBoard";

export type mode = "game" | "settings";

export default function () {
  const [mode, setMode] = useState<mode>("game");
  const {onDifficultyChange, onNumberOfPlayersChange, difficulty, numberOfPlayers} = useSettings();
  const {
    onRestart,
    computedBoardState,
    onChipClick,
    time,
    setTime,
    setStartTimer,
    moves,
    setMoves,
    onNewGame,
  } = useGameBoard({
    difficulty,
  });

  const onSettingsClick = useCallback(() => {
    setMode("settings");
  }, [mode]);

  const handleRestart = useCallback(() => {
    onRestart();
    setMode("game");
    setStartTimer(false);
    setTime(0);
    setMoves(0);
  }, [mode]);

  const handleBackToGame = useCallback(() => {
    setMode("game");
  }, [mode]);

  const handleNewGame = useCallback(() => {
    onNewGame(difficulty);
    setMode("game");
    setStartTimer(false);
    setTime(0);
    setMoves(0);
  }, [mode, difficulty]);

  const handleDifficultyChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, gameType: GameType) => {
      onDifficultyChange(_, gameType);
      setStartTimer(false);
      setTime(0);
      setMoves(0);
    },
    []
  );

  const handleNumberOFPlayersChange = useCallback(
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, players: 2 | 1) => {
      onNumberOfPlayersChange(_, players);
      setStartTimer(false);
      setTime(0);
      setMoves(0);
    },
    []
  );

  return (
    <MainWrapper>
      <StyledHeader>
        <Title onClick={handleBackToGame}>Memory game</Title>
        <ButtonsWrapper>
          <Button onClick={handleRestart} variant="primary">
            Restart
          </Button>
          <Button onClick={onSettingsClick} variant="secondary">
            Settings
          </Button>
        </ButtonsWrapper>
      </StyledHeader>
      {mode === "game" ? (
        <GameScreen computedBoardState={computedBoardState} onChipClick={onChipClick} />
      ) : (
        <SettingsScreen
          onDifficultyChange={handleDifficultyChange}
          onNumberOfPlayersChange={handleNumberOFPlayersChange}
          difficulty={difficulty}
          numberOfPlayers={numberOfPlayers}
          handleBackToGame={handleBackToGame}
          handleNewGame={handleNewGame}
        />
      )}

      {mode === "game" ? (
        <StatsFooter numberOfPlayers={numberOfPlayers} time={time} moves={moves} />
      ) : null}
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
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
`;
