import { getPeaks } from "./utils";
import audioMap from "./AudioMap";
import { RootState } from "@redux/reducers";
import store from "@redux";

const canvasMap: {
  [audioId: string]: string;
} = {};

let zoom = 100;


const drawRect = (canvas: HTMLCanvasElement, peaks: number[], width: number) => {
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = "#555555";
    ctx.fillRect(0, 0, width, 104);
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
      ctx.moveTo(i, points[i][1]);
      ctx.lineTo(i, points[i + 1][1]);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.closePath();
    }
  }
}

const generateCanvas = (audioId: string) => {
  const { library }: RootState = store.getState();
  const audio = library.audioInfo[audioId];
  const width = audio.length / zoom;
  const peaks = getPeaks(audioMap[audioId].audioBuffer, 10, width);
  const canvas = document.createElement('canvas');
  canvas.height = 104;
  canvas.width = width;
  document.body.appendChild(canvas);
  drawRect(canvas, peaks, width);
  const data = canvas.toDataURL();
  canvasMap[audioId] = data;
  canvas.remove();
}

export const getCanvas = (audioId: string): string => {
  if (!canvasMap[audioId]) {
    generateCanvas(audioId);
  }
  return canvasMap[audioId];
}
