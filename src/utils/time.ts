const padNumber = (n: number, length = 2) => {
  return String.prototype.padStart.call(n, length, '0');
}

export const millisecondToString = (millisecond: number, needMs = true) => {
  let t = millisecond;
  const ms = Math.floor(millisecond % 1000);
  t = Math.floor(t / 1000);
  const s = t % 60;
  t = Math.floor(t / 60);
  const m = t % 60;
  t = Math.floor(t / 60);
  const h = t % 60;
  t = Math.floor(t / 60);
  return `${h}:${padNumber(m)}:${padNumber(s)}${needMs ? `:${padNumber(ms, 3)}` : ''}`;
}

export const currentTime = {
  time: 0,
}
