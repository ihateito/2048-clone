"use strict";

class gameField {
  constructor(size = 4) {
    this.size = size;
    this.field = {};
    this.trash = {};
    this.score = 0;
  }

  addCell() {
    const empty = [];
    for (let i = 1; i <= this.size; i++) {
      for (let j = 1; j <= this.size; j++) {
        if (!this.field[`${i}${j}`]) {
          empty.push({ i, j });
        }
      }
    }

    if (!empty.length) return null;

    const spot = empty[Math.floor(Math.random() * empty.length)];
    const value = generateValue();
    const newCell = typeof Cell === "function" ? new Cell(spot.i, spot.j, value) : new cell(spot.i, spot.j, value);
    this.field[`${spot.i}${spot.j}`] = newCell;
    return newCell;
  }

  moveAxisX(fromJ, toJ, step) {
    let shift = false;
    for (let i = 1; i <= this.size; i++) {
      let idFirstEmptyCell;
      for (let j = fromJ; j !== toJ + step; j += step) {
        const cellKey = `${i}${j}`;
        if (cellKey in this.field) {
          if (idFirstEmptyCell !== undefined) {
            const emptyCellKey = `${i}${idFirstEmptyCell}`;
            this.field[emptyCellKey] = this.field[cellKey];
            this.field[emptyCellKey].j = idFirstEmptyCell;
            delete this.field[cellKey];
            idFirstEmptyCell += step;
            shift = true;
          }
        } else if (idFirstEmptyCell === undefined) {
          idFirstEmptyCell = j;
        }
      }
    }
    return shift;
  }

  moveAxisY(fromI, toI, step) {
    let shift = false;
    for (let j = 1; j <= this.size; j++) {
      let idFirstEmptyCell;
      for (let i = fromI; i !== toI + step; i += step) {
        const cellKey = `${i}${j}`;
        if (cellKey in this.field) {
          if (idFirstEmptyCell !== undefined) {
            const emptyCellKey = `${idFirstEmptyCell}${j}`;
            this.field[emptyCellKey] = this.field[cellKey];
            this.field[emptyCellKey].i = idFirstEmptyCell;
            delete this.field[cellKey];
            idFirstEmptyCell += step;
            shift = true;
          }
        } else if (idFirstEmptyCell === undefined) {
          idFirstEmptyCell = i;
        }
      }
    }
    return shift;
  }

  sumCellAxisX(fromJ, toJ, step) {
    let shift = false;
    for (let i = 1; i <= this.size; i++) {
      for (let j = fromJ; j !== toJ + step; j += step) {
        const cellKey = `${i}${j}`;
        const prevCellKey = `${i}${j + step}`;
        if (cellKey in this.field && prevCellKey in this.field) {
          if (this.field[cellKey].value === this.field[prevCellKey].value) {
            this.field[prevCellKey].value *= 2;
            this.score += this.field[prevCellKey].value;
            this.trash[Object.keys(this.trash).length] = this.field[cellKey].div;
            delete this.field[cellKey];
            j += step;
            shift = true;
          }
        }
      }
    }
    return shift;
  }

  sumCellAxisY(fromI, toI, step) {
    let shift = false;
    for (let j = 1; j <= this.size; j++) {
      for (let i = fromI; i !== toI + step; i += step) {
        const cellKey = `${i}${j}`;
        const prevCellKey = `${i + step}${j}`;
        if (cellKey in this.field && prevCellKey in this.field) {
          if (this.field[cellKey].value === this.field[prevCellKey].value) {
            this.field[prevCellKey].value *= 2;
            this.score += this.field[prevCellKey].value;
            this.trash[Object.keys(this.trash).length] = this.field[cellKey].div;
            delete this.field[cellKey];
            i += step;
            shift = true;
          }
        }
      }
    }
    return shift;
  }
}
