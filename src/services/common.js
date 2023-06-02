import moment from "moment";
import randomSentence from "random-sentence";
import currencyFormatter from "currency-formatter";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function getRandomText(options = { words: 5, min: 4, max: 9 }) {
  return randomSentence(options);
}

export function getRandomAvatar(options = { size: "81" }) {
  return `https://i.pravatar.cc/${options?.size}?${getRandomInt(50)}`;
}

export function getRandomColor() {
  let simbolos, color;
  simbolos = "0123456789ABCDEF";
  color = "#";

  for (let i = 0; i < 6; i++) {
    color = color + simbolos[Math.floor(Math.random() * 16)];
  }

  return color;
}

function HSLtoRGB(h, s, l) {
  let r, g, b;

  const rd = (a) => {
    return Math.floor(Math.max(Math.min(a * 256, 255), 0));
  };

  const hueToRGB = (m, n, o) => {
    if (o < 0) o += 1;
    if (o > 1) o -= 1;
    if (o < 1 / 6) return m + (n - m) * 6 * o;
    if (o < 1 / 2) return n;
    if (o < 2 / 3) return m + (n - m) * (2 / 3 - o) * 6;
    return m;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  r = hueToRGB(p, q, h + 1 / 3);
  g = hueToRGB(p, q, h);
  b = hueToRGB(p, q, h - 1 / 3);

  return [rd(r), rd(g), rd(b)];
}

export function getRandomPastelColor() {
  const colors = {
    bgColor: "",
    txtColor: "",
    btnColor: "",
    btnFocus: "",
  };
  const hBase = Math.random();
  const newH = Math.floor(hBase * 360);
  const newL = Math.floor(Math.random() * 16) + 75;

  colors.bgColor = `hsl(${newH}, 100%, ${newL}%)`;
  colors.txtColor = `hsl(${newH}, 100%, 5%)`;
  colors.btnColor = `hsl(${newH}, 100%, 98%)`;
  colors.btnFocus = `hsl(${newH}, 100%, 95%)`;

  const [r, g, b] = HSLtoRGB(hBase, 1, newL * 0.01);

  return `rgb(${r}, ${g}, ${b})`;
}

export function getFormatedDate(date) {
  return moment(date).format("yyyy-MM-DD");
}

export const formatQuantity = (
  value = 0,
  options = { precision: 2, code: "", decimal: ".", thousand: "," }
) => {
  const { precision = 2, code = "", decimal = ".", thousand = "," } = options;
  return currencyFormatter.format(value, {
    code,
    decimal,
    thousand,
    precision,
  });
};

export async function toDataUrl(url) {
  let img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = url;
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
}
