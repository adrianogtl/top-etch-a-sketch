const canvas = document.querySelector(".canvas");
const resetBtn = document.querySelector("#reset-btn");
const colorSelector = document.querySelector("#pencil-color");
let paintBrushColor = colorSelector.value;

resetBtn.addEventListener("click", resetCanvas);
colorSelector.addEventListener("change", changePaintBrushColor);

function resetCanvas() {
  deleteGrid();
  let gridSize = 16;
  do {
    gridSize = parseInt(prompt("Grid size: (min: 16  max: 100)"));
  } while (isNaN(gridSize) || gridSize > 100 || gridSize < 16);
  createGrid(gridSize);
}

function changePaintBrushColor(e) {
  paintBrushColor = e.target.value;
}

function createGrid(gridSize = 16) {
  const totalSize = gridSize * gridSize;
  for (let i = 0; i < totalSize; i++) {
    const pixel = document.createElement("div");
    const pixelSize = `${800 / gridSize}px`;
    pixel.style.width = pixelSize;
    pixel.style.heigth = pixelSize;

    pixel.addEventListener("mouseenter", () => {
      pixel.style.backgroundColor = paintBrushColor;
    });

    canvas.appendChild(pixel);
  }
}

function deleteGrid() {
  const pixels = Array.from(canvas.querySelectorAll("div"));
  pixels.forEach((pixel) => pixel.remove());
}
createGrid();
