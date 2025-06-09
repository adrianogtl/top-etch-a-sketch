const canvas = document.querySelector(".canvas");
const gridSizeInput = document.querySelector("#grid-size-input");
const gridSizeSpan = document.querySelector("#grid-size-span");
const clearBtn = document.querySelector("#clear-btn");
const colorSelector = document.querySelector("#pencil-color");

const getGrid = () => Array.from(canvas.querySelectorAll("div"));

let paintBrushColor = colorSelector.value;

function changePaintBrushColor(element) {
  paintBrushColor = element.target.value;
}

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
        pixel.style.backgroundColor = paintBrushColor;
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

gridSizeInput.addEventListener("input", () => {
  const gridSize = gridSizeInput.value;
  changeGridSize(gridSize);
  gridSizeSpan.textContent = `${gridSize} x ${gridSize}`;
});
clearBtn.addEventListener("click", clearGrid);
colorSelector.addEventListener("change", changePaintBrushColor);

createGrid();
