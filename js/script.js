import {
  createGrid,
  changeGridSize,
  colorBrush,
  eraseBrush,
  clearGrid,
  setCurrentColor,
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const gridSizeInput = document.querySelector("#grid-size-input");
  const colorSelector = document.querySelector("#color-selector");
  const colorBtn = document.querySelector("#color-btn");
  const eraseBtn = document.querySelector("#erase-btn");
  const clearBtn = document.querySelector("#clear-btn");

  createGrid();
  gridSizeInput.addEventListener("input", changeGridSize);
  colorBtn.addEventListener("click", colorBrush);
  eraseBtn.addEventListener("click", eraseBrush);
  clearBtn.addEventListener("click", clearGrid);
  colorSelector.addEventListener("change", () =>
    setCurrentColor(colorSelector.value)
  );
});
