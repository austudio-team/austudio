import { getPeaks } from "./utils";
import audioMap from "./AudioMap";
import { RootState } from "@redux/reducers";
import store from "@redux";

const canvasMap: {
  [audioId: string]: {
    [zoom: string]: string,
  };
} = {};

let channel = 0;

const drawRect = (canvas: HTMLCanvasElement, peaks: number[], width: number) => {
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (ctx) {
    // ctx.fillStyle = theme.colors.N600;
    // ctx.fillRect(0, 0, width, 104);
    // ctx.translate(0, 100);

    const height = 104;
    const halfHight = height / 2;
    const absmaxHalf = 1 / halfHight;
    const points: [number, number][] = [];
    for(let i = 0; i < peaks.length; i++) {
      // if (peaks[i] > 0) {
      //   ctx.strokeStyle = "#ffffff";
      //   ctx.strokeRect(num, 100, 1, peaks[i]*100);
      //   num++;
      // }
      const peak1 = peaks[i] || 0;
      const peak2 = peaks[i + 1] || 0;
      // 波峰波谷乘上系数
      const h1 = Math.round(peak1 / absmaxHalf);
      const h2 = Math.round(peak2 / absmaxHalf);
      points.push([i, halfHight - h1]);
      points.push([i, halfHight - h2]);
    }

    for(let i = 0; i < points.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 0.25, points[i][1]);
      ctx.lineTo(i * 0.25, points[i + 1][1]);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.closePath();
    }
  }
}

const generateCanvas = (audioId: string, scale: number) => {
  const { library }: RootState = store.getState();
  const audio = library.audioInfo[audioId];
  const width = audio.length * scale;
  const peaks = getPeaks(audioMap[audioId].audioBuffer, channel, width);
  const canvas = document.createElement('canvas');
  canvas.height = 104;
  canvas.width = width;
  document.body.appendChild(canvas);
  drawRect(canvas, peaks, width);
  const data = canvas.toDataURL();
  if (!canvasMap[audioId]) canvasMap[audioId] = {};
  canvasMap[audioId][(1000 * scale).toFixed(2)] = data;
  canvas.remove();
}

export const getCanvas = (audioId: string, scale: number): string => {
  if (!canvasMap[audioId] || !canvasMap[audioId][(1000 * scale).toFixed(2)]) {
    generateCanvas(audioId, scale);
  }
  return canvasMap[audioId][(1000 * scale).toFixed(2)];
}
