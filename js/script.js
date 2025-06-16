import {
  createGrid,
  changeGridSize,
  colorBrush,
  rainbowBrush,
  eraseBrush,
  clearGrid,
  setCurrentColor,
} from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const gridSizeInput = document.querySelector("#grid-size-input");
  const colorSelector = document.querySelector("#color-selector");
  const colorBtn = document.querySelector("#color-btn");
  const rainbowBtn = document.querySelector("#rainbow-btn");
  const eraseBtn = document.querySelector("#erase-btn");
  const clearBtn = document.querySelector("#clear-btn");

  createGrid();
  gridSizeInput.addEventListener("input", changeGridSize);
  colorBtn.addEventListener("click", colorBrush);
  rainbowBtn.addEventListener("click", rainbowBrush);
  eraseBtn.addEventListener("click", eraseBrush);
  clearBtn.addEventListener("click", clearGrid);
  colorSelector.addEventListener("change", () =>
    setCurrentColor(colorSelector.value)
  );
});
