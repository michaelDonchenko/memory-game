import styled from "@emotion/styled";

interface StatsFooter {
  numberOfPlayers: 1 | 2;
  time: number;
  moves: number;
}

const StatsFooter: React.FC<StatsFooter> = ({numberOfPlayers, time, moves}) => {
  return numberOfPlayers === 1 ? (
    <Wrapper>
      <StatBox>
        <SpaceAroundWrapper>
          <span style={{color: "#6790a0"}}>Time</span>
          <span style={{fontSize: "24px"}}>{time}</span>
        </SpaceAroundWrapper>
      </StatBox>
      <StatBox>
        <SpaceAroundWrapper>
          <span style={{color: "#6790a0"}}>Moves</span>
          <span style={{fontSize: "24px"}}>{moves}</span>
        </SpaceAroundWrapper>
      </StatBox>
    </Wrapper>
  ) : (
    <Wrapper></Wrapper>
  );
};

export default StatsFooter;

const Wrapper = styled.footer`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  gap: 10px;
`;

const StatBox = styled.div<{isActive?: boolean}>`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  border-radius: 12px;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #31485a;
  background-color: #dfe6ec;
`;

const SpaceAroundWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
