const canvas = document.querySelector(".canvas");
const gridSizeInput = document.querySelector("#grid-size-input");
const gridSizeSpan = document.querySelector("#grid-size-span");
const colorSelector = document.querySelector("#pencil-color");
const colorBtn = document.querySelector("#color-btn");
const eraseBtn = document.querySelector("#erase-btn");
const clearBtn = document.querySelector("#clear-btn");

let brushColor = colorSelector.value;
let lastTargetElement = colorBtn;

const getGrid = () => Array.from(canvas.querySelectorAll("div"));
const changeBrushColor = (color) => (brushColor = color);

function changeGridSize(gridSize) {
  if (gridSize < 16 || gridSize > 50) {
    return;
  }

  deleteGrid();
  createGrid(gridSize);
}

function createGrid(gridSize = 16) {
  const canvasWidth = canvas.clientWidth;
  const totalSize = gridSize * gridSize;
  for (let i = 0; i < totalSize; i++) {
    const pixel = document.createElement("div");
    const pixelSize = `${canvasWidth / gridSize}px`;
    pixel.style.width = pixelSize;
    pixel.style.height = pixelSize;
    pixel.addEventListener("mousemove", (event) => {
      if (event.buttons == 1) {
        event.preventDefault();
        pixel.style.backgroundColor = brushColor;
      }
    });

    canvas.appendChild(pixel);
  }
}

function deleteGrid() {
  const pixels = getGrid();
  pixels.forEach((pixel) => pixel.remove());
}

function clearGrid() {
  const pixels = getGrid();
  pixels.forEach((pixel) => (pixel.style.backgroundColor = "#fff"));
}

function handleClick(e) {
  const targetElement = e.target;

  if (targetElement.id === "clear-btn") {
    clearGrid();
    return;
  }

  if (targetElement.id === "erase-btn") {
    changeBrushColor("#fff");
  } else {
    changeBrushColor(colorSelector.value);
  }

  lastTargetElement.classList.remove("active");
  targetElement.classList.add("active");

  lastTargetElement = targetElement;

  return;
}

gridSizeInput.addEventListener("input", () => {
  const gridSize = gridSizeInput.value;
  changeGridSize(gridSize);
  gridSizeSpan.textContent = `${gridSize} x ${gridSize}`;
});
colorBtn.addEventListener("click", handleClick);
eraseBtn.addEventListener("click", handleClick);
clearBtn.addEventListener("click", handleClick);
colorSelector.addEventListener("change", (e) => {
  if (colorBtn.classList.contains("active")) {
    changeBrushColor(e.target.value);
  }
});

createGrid();
