import {useCallback, useEffect, useState} from "react";
import {generateGameBoard} from "../utils/generateGameBoard";

export interface Chip {
  value: number;
  state: "hidden" | "selected" | "reveled";
}

interface ChipData extends Chip {
  chipPosition: [number, number];
}

interface OnClickArgs {
  data: ChipData;
  chipPosition: [number, number];
  value: number;
}

const useGameBoard = () => {
  const [gameBoard, setGameBoard] = useState<number[][]>(generateGameBoard("4x4"));
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [selectedChips, setSelectedChips] = useState<ChipData[]>([]);
  const [computedBoardState, setComputedBoardState] = useState<Chip[][]>();
  const [boardFreeze, setBoardFreeze] = useState(false);

  const onFirstChipClick = useCallback(({data, chipPosition, value}: OnClickArgs) => {
    setComputedBoardState((prev) => {
      let stateCopy = prev?.map((row) => row.map((cell) => cell));

      if (stateCopy) {
        stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "selected"};
        return stateCopy;
      }

      return prev;
    });
    setSelectedChips((prev) => [...prev, data]);
  }, []);

  const onSecondChipClick = useCallback(
    ({chipPosition, value}: Omit<OnClickArgs, "data">) => {
      const firstSelectedChip = selectedChips[0];
      if (selectedChips[0].value === value) {
        setComputedBoardState((prev) => {
          let stateCopy = prev?.map((row) => row.map((cell) => cell));

          if (stateCopy) {
            stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "reveled"};
            stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
              value,
              state: "reveled",
            };
            return stateCopy;
          }
        });
        setSelectedChips([]);
      } else {
        setBoardFreeze(true);
        setComputedBoardState((prev) => {
          let stateCopy = prev?.map((row) => row.map((cell) => cell));

          if (stateCopy) {
            stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "selected"};
            stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
              value: firstSelectedChip.value,
              state: "selected",
            };
            return stateCopy;
          }
        });

        setTimeout(() => {
          setComputedBoardState((prev) => {
            let stateCopy = prev?.map((row) => row.map((cell) => cell));

            if (stateCopy) {
              stateCopy[chipPosition[0]][chipPosition[1]] = {value, state: "hidden"};
              stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
                value: firstSelectedChip.value,
                state: "hidden",
              };
              return stateCopy;
            }
          });

          setSelectedChips([]);
          setBoardFreeze(false);
        }, 1000);
      }
    },
    [selectedChips]
  );

  const onChipClick = useCallback(
    (_: React.MouseEvent<HTMLSpanElement, MouseEvent>, data: ChipData) => {
      const {chipPosition, state, value} = data;
      if (!computedBoardState) {
        return;
      }
      if (boardFreeze) {
        return;
      }

      if (selectedChips.length === 0) {
        if (state === "hidden") {
          onFirstChipClick({data, chipPosition, value});
        }
      } else if (selectedChips.length === 1) {
        if (state === "hidden") {
          onSecondChipClick({chipPosition, value});
        }
      } else {
        // this should not be an options
        return;
      }
    },
    [selectedChips, computedBoardState]
  );

  useEffect(() => {
    setComputedBoardState(
      gameBoard?.map((row) => {
        return row.map((chip) => ({value: chip, state: "hidden"}));
      })
    );
  }, [gameBoard]);

  return {
    gameBoard,
    setGameBoard,
    computedBoardState,
    time,
    setTime,
    moves,
    setMoves,
    onChipClick,
  };
};

export default useGameBoard;
