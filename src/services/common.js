import moment from "moment";
import randomSentence from "random-sentence";
import currencyFormatter from 'currency-formatter';

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
