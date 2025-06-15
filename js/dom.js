const canvas = document.querySelector(".canvas");
const colorHistory = document.querySelector("#color-history");
const gridSizeSpan = document.querySelector("#grid-size-span");
const gridSizeInput = document.querySelector("#grid-size-input");
const colorSelector = document.querySelector("#color-selector");
const colorBtn = document.querySelector("#color-btn");
const eraseBtn = document.querySelector("#erase-btn");

const colorHistorySizeLimit = 5;
let colorHistoryList = [];
let currentColor = colorSelector.value;
let lastColor = currentColor;
let isEraser = false;

const getGrid = () => Array.from(canvas.querySelectorAll("div"));
const getNewGridSize = () => gridSizeInput.value;
const setCurrentColor = (currColor) => {
  if (!eraseBtn.classList.contains("active")) {
    lastColor = currentColor;
    currentColor = currColor;
  }
};
const updateColorHistory = (currColor) => {
  if (colorHistoryList.length === colorHistorySizeLimit) {
    colorHistoryList.shift();
  }
  colorHistoryList.push(currColor);

  colorHistory.innerText = "History: ";
  colorHistoryList.forEach((color) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = color;
    box.addEventListener("click", () => {
      setCurrentColor(color);
      colorSelector.value = color;
    });
    colorHistory.appendChild(box);
  });
};
const toggleActive = () => {
  colorBtn.classList.toggle("active");
  eraseBtn.classList.toggle("active");
};

function createGrid(gridSize = 16) {
  const canvasWidth = canvas.clientWidth;
  const gridArea = gridSize ** 2;

  for (let i = 0; i < gridArea; i++) {
    const pixel = document.createElement("div");
    const pixelSize = `${canvasWidth / gridSize}px`;
    pixel.style.width = pixelSize;
    pixel.style.height = pixelSize;
    pixel.classList.add("pixel");
    pixel.addEventListener("click", (event) => {
      event.preventDefault();
      pixel.style.backgroundColor = currentColor;

      if (!colorHistoryList.includes(currentColor) && !isEraser) {
        updateColorHistory(currentColor);
      }
    });
    pixel.addEventListener("mousemove", (event) => {
      if (event.buttons == 1) {
        event.preventDefault();
        pixel.style.backgroundColor = currentColor;

        if (!colorHistoryList.includes(currentColor) && !isEraser) {
          updateColorHistory(currentColor);
        }
      }
    });

    canvas.appendChild(pixel);
  }
}

function deleteGrid() {
  const pixels = getGrid();
  pixels.forEach((pixel) => pixel.remove());
}

function changeGridSize() {
  const newGridSize = getNewGridSize();
  if (newGridSize < 16 || newGridSize > 50) {
    return;
  }
  deleteGrid();
  createGrid(newGridSize);
  gridSizeSpan.textContent = `${newGridSize} x ${newGridSize}`;
}

function colorBrush() {
  if (eraseBtn.classList.contains("active")) {
    isEraser = false;
    currentColor = colorSelector.value;
    toggleActive();
  }
}

function eraseBrush(e) {
  if (colorBtn.classList.contains("active")) {
    isEraser = true;
    currentColor = "#fff";
    toggleActive();
  }
}

function clearGrid() {
  const pixels = getGrid();
  pixels.forEach((pixel) => (pixel.style.backgroundColor = "#fff"));
}
export {
  createGrid,
  changeGridSize,
  colorBrush,
  eraseBrush,
  clearGrid,
  setCurrentColor,
};
