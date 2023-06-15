export const toHHMMSS = (numberInSeconds: number) => {
  let hours = numberInSeconds / 3600;
  let minutes = (numberInSeconds % 3600) / 60;
  let seconds = numberInSeconds % 60;

  return `${hours}:${minutes}:${seconds}`;
};
