function generateRandom1MinCandles(startTime: number, count: number): {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}[] {
  const candles: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[] = [];
  let currentTime = startTime;
  let lastClose = Math.random();

  for (let i = 0; i < count; i++) {
    const open = lastClose;
    const close = open + (Math.random() - 0.5) * 0.0001;
    const high = Math.max(open, close) + Math.random() * 0.0001;
    const low = Math.min(open, close) - Math.random() * 0.0001;

    candles.push({
      time: currentTime,
      open: parseFloat(open.toFixed(6)),
      high: parseFloat(high.toFixed(6)),
      low: parseFloat(low.toFixed(6)),
      close: parseFloat(close.toFixed(6)),
    });

    lastClose = close;
    currentTime += 60; // Increment time by 1 minute (60 seconds)
  }

  return candles;
}

// Example usage:
const startTime = 1700316800; // Example start time
const oneMinCandles = generateRandom1MinCandles(startTime, 500);

export async function getCandles(projectId: string, options: { period: number; time: number; n: number }) {
  return oneMinCandles.filter((candle) => candle.time <= options.time).slice(0, options.n);
}