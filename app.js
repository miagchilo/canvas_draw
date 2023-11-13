const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let isMouseDown = false;

const getMousePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseXPosition = event.clientX - rect.left;
  const mouseYPosition = event.clientY - rect.top;
  return { mouseXPosition, mouseYPosition };
};

const drawLine = (x, y) => {
  if (!isMouseDown) return;

  canvasContext.lineTo(x, y);
  canvasContext.stroke();
};

canvas.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  const { mouseXPosition, mouseYPosition } = getMousePosition(event);
  canvasContext.beginPath();
  canvasContext.moveTo(mouseXPosition, mouseYPosition);
});

canvas.addEventListener("mousemove", (event) => {
  const { mouseXPosition, mouseYPosition } = getMousePosition(event);
  drawLine(mouseXPosition, mouseYPosition);
});

canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
  canvasContext.beginPath(); // start a new path for the next drawing interaction
});

// Optional: Add these styles for a smoother line
canvasContext.lineCap = "round";
canvasContext.lineWidth = 5;

// Add a color picker
const colorButton = document.getElementById("colorPicker");
colorButton.addEventListener("input", () => {
  canvasContext.strokeStyle = colorButton.value;
});

// Add a range input for pencil width
const widthButton = document.getElementById("widthPicker");
widthButton.addEventListener("input", () => {
  canvasContext.lineWidth = widthButton.value;
});

// Initialize canvas and controls
const init = () => {
  canvasContext.strokeStyle = colorButton.value;
  canvasContext.lineWidth = widthButton.value;
};

// Reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  init();
});

// Save button
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", () => {
  saveImage();
});

// Initialize on page load
init();
