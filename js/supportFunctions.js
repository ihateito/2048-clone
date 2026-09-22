"use strict";

const CELL_SPACE = 20;
const CELL_SIDE_LENGTH = 100;

const COLOR_MAP = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#ec6544",
  128: "#e44d29",
  256: "#edcf72",
  512: "#c8a145",
  1024: "#a8832b",
  2048: "#86aa9c",
  4096: "#a6c",
  8192: "#791e6f"
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateValue = () => (Math.random() < 0.9 ? 2 : 4);

const getPosTop = (i, j) => CELL_SPACE + i * (CELL_SPACE + CELL_SIDE_LENGTH);
const getPosLeft = (i, j) => CELL_SPACE + j * (CELL_SPACE + CELL_SIDE_LENGTH);

function getNumberCellFontSize(number) {
  if (number <= 64) return `${0.6 * CELL_SIDE_LENGTH}px`;
  if (number <= 512) return `${0.5 * CELL_SIDE_LENGTH}px`;
  if (number <= 8192) return `${0.4 * CELL_SIDE_LENGTH}px`;
  return `${0.3 * CELL_SIDE_LENGTH}px`;
}

const getNumberCellBgColor = (number) => COLOR_MAP[number] || "black";

const getNumberCellFontColor = (number) => (number <= 4 ? "#776e65" : "white");

function canMoveX(fieldObj) {
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j < size; j++) {
      const current = fieldObj[`${i}${j}`];
      const next = fieldObj[`${i}${j + 1}`];
      if (current && next && current.value === next.value) {
        return true;
      }
    }
  }
  return false;
}

function canMoveY(fieldObj) {
  for (let j = 1; j <= size; j++) {
    for (let i = 1; i < size; i++) {
      const current = fieldObj[`${i}${j}`];
      const next = fieldObj[`${i + 1}${j}`];
      if (current && next && current.value === next.value) {
        return true;
      }
    }
  }
  return false;
}
