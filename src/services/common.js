import randomSentence from "random-sentence";

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
