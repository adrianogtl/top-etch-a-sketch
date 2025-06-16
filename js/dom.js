const canvas = document.querySelector(".canvas");
const colorHistory = document.querySelector("#color-history");
const gridSizeSpan = document.querySelector("#grid-size-span");
const gridSizeInput = document.querySelector("#grid-size-input");
const colorSelector = document.querySelector("#color-selector");
const colorBtn = document.querySelector("#color-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const eraseBtn = document.querySelector("#erase-btn");

const colorHistorySizeLimit = 5;
let colorHistoryList = JSON.parse(localStorage.getItem("colorHistory")) || [];
let currentColor = colorSelector.value;
let isColorBtnActive = true;
let isRainbowBtnActive = false;
let hue = 0;

const getGrid = () => Array.from(canvas.querySelectorAll("div"));
const getNewGridSize = () => gridSizeInput.value;
const setCurrentColor = (currColor) => {
  if (!eraseBtn.classList.contains("active")) {
    currentColor = currColor;
  }
};
const updateColorHistory = (currColor) => {
  if (colorHistoryList.length === colorHistorySizeLimit) {
    colorHistoryList.shift();
    localStorage.setItem("colorHistory", JSON.stringify(colorHistoryList));
  }
  colorHistoryList.push(currColor);
  localStorage.setItem("colorHistory", JSON.stringify(colorHistoryList));
  renderColorHistoryList();
};
const renderColorHistoryList = () => {
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
const toggleActive = (curr) => {
  colorBtn.classList.remove("active");
  rainbowBtn.classList.remove("active");
  eraseBtn.classList.remove("active");
  curr.classList.add("active");
};
const getRainbowColor = () => {
  const hsl = `hsl(${hue}, 100%, 50%)`;

  if (hue === 360) {
    hue = 0;
    return;
  }

  hue++;
  return hsl;
};

if (colorHistoryList) {
  renderColorHistoryList();
}

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

      pixel.style.backgroundColor = isRainbowBtnActive
        ? getRainbowColor()
        : currentColor;

      if (!colorHistoryList.includes(currentColor) && isColorBtnActive) {
        updateColorHistory(currentColor);
      }
    });
    pixel.addEventListener("mousemove", (event) => {
      if (event.buttons == 1) {
        event.preventDefault();

        pixel.style.backgroundColor = isRainbowBtnActive
          ? getRainbowColor()
          : currentColor;

        if (!colorHistoryList.includes(currentColor) && isColorBtnActive) {
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
  isColorBtnActive = true;
  isRainbowBtnActive = false;
  currentColor = colorSelector.value;
  toggleActive(colorBtn);
}

function rainbowBrush() {
  isColorBtnActive = false;
  isRainbowBtnActive = true;
  toggleActive(rainbowBtn);
}

function eraseBrush(e) {
  isColorBtnActive = false;
  isRainbowBtnActive = false;
  currentColor = "#fff";
  toggleActive(eraseBtn);
}

function clearGrid() {
  const pixels = getGrid();
  pixels.forEach((pixel) => (pixel.style.backgroundColor = "#fff"));
  colorHistoryList = [];
  localStorage.removeItem("colorHistory");
  renderColorHistoryList();
}

export {
  createGrid,
  changeGridSize,
  colorBrush,
  rainbowBrush,
  eraseBrush,
  clearGrid,
  setCurrentColor,
};
