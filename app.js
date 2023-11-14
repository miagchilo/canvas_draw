const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let isMouseDown = false;
let drawingMethod = "pencil";
let shapeHeight = 100;

const getMousePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseXPosition = event.clientX - rect.left;
  const mouseYPosition = event.clientY - rect.top;
  return { mouseXPosition, mouseYPosition };
};

const drawTriangle = (x, y) => {
  canvasContext.beginPath();
  canvasContext.moveTo(x, y - shapeHeight / 2);
  canvasContext.lineTo(x - shapeHeight / 2, y + shapeHeight / 2);
  canvasContext.lineTo(x + shapeHeight / 2, y + shapeHeight / 2);
  canvasContext.closePath();
  canvasContext.stroke();
};

const drawCircle = (x, y) => {
  canvasContext.beginPath();
  canvasContext.arc(x, y, shapeHeight / 2, 0, Math.PI * 2);
  canvasContext.closePath();
  canvasContext.stroke();
};

const drawRectangle = (x, y) => {
  canvasContext.beginPath();
  canvasContext.rect(x - shapeHeight / 2, y - shapeHeight / 2, shapeHeight, shapeHeight);
  canvasContext.closePath();
  canvasContext.stroke();
};

canvas.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  if (drawingMethod === "pencil") {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    canvasContext.beginPath();
    canvasContext.moveTo(mouseXPosition, mouseYPosition);
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (drawingMethod === "pencil" && isMouseDown) {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    canvasContext.lineTo(mouseXPosition, mouseYPosition);
    canvasContext.stroke();
  }
});

canvas.addEventListener("mouseup", (event) => {
  isMouseDown = false;
  if (drawingMethod !== "pencil") {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    switch (drawingMethod) {
      case "triangle":
        drawTriangle(mouseXPosition, mouseYPosition);
        break;
      case "circle":
        drawCircle(mouseXPosition, mouseYPosition);
        break;
      case "rectangle":
        drawRectangle(mouseXPosition, mouseYPosition);
        break;
      default:
        break;
    }
  } else {
    canvasContext.beginPath();
  }
});

const colorButton = document.getElementById("colorPicker");
colorButton.addEventListener("input", () => {
  canvasContext.strokeStyle = colorButton.value;
});

const widthButton = document.getElementById("widthPicker");
widthButton.addEventListener("input", () => {
  canvasContext.lineWidth = widthButton.value;
});

const shapeSizeInput = document.getElementById("shapeSize");
shapeSizeInput.addEventListener("input", () => {
  shapeHeight = parseInt(shapeSizeInput.value);
});

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
});

// Button event listeners for drawing methods
const circleButton = document.getElementById("circleButton");
circleButton.addEventListener("click", () => {
  drawingMethod = "circle";
});

const triangleButton = document.getElementById("triangleButton");
triangleButton.addEventListener("click", () => {
  drawingMethod = "triangle";
});

const squareButton = document.getElementById("squareButton");
squareButton.addEventListener("click", () => {
  drawingMethod = "rectangle";
});

const pencilButton = document.getElementById("pencilButton");
pencilButton.addEventListener("click", () => {
  drawingMethod = "pencil";
});

const drawMandala = () => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numCircles = 12; // Number of circles in the mandala
  
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < numCircles; i++) {
      const radius = Math.min(canvas.width, canvas.height) * (i + 1) / (numCircles * 2);
      const startAngle = 0;
      const endAngle = 2 * Math.PI;
      const rotation = i % 2 === 0 ? 0 : Math.PI / numCircles;
  
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, radius, startAngle, endAngle);
      canvasContext.closePath();
  
      canvasContext.save();
      canvasContext.translate(centerX, centerY);
      canvasContext.rotate(rotation);
      canvasContext.translate(-centerX, -centerY);
  
      canvasContext.stroke();
      canvasContext.restore();
    }
  };
  
  const mandalaButton = document.getElementById("mandalaButton");
  mandalaButton.addEventListener("click", () => {
    drawMandala();
  });
  const drawTree = (x, y, length, angle, depth) => {
    if (depth === 0) {
      return;
    } else {
      const newX = x + length * Math.cos(angle);
      const newY = y + length * Math.sin(angle);
  
      canvasContext.beginPath();
      canvasContext.moveTo(x, y);
      canvasContext.lineTo(newX, newY);
      canvasContext.lineWidth = depth;
      canvasContext.stroke();
  
      // Recursively draw branches
      drawTree(newX, newY, length * 0.7, angle - 0.3, depth - 1);
      drawTree(newX, newY, length * 0.7, angle + 0.3, depth - 1);
    }
  };
  
  const fractalTreeButton = document.getElementById("fractalTreeButton");
  fractalTreeButton.addEventListener("click", () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const startX = canvas.width / 2;
    const startY = canvas.height - 20;
    const startLength = 80;
    const startAngle = -Math.PI / 2;
  
    drawTree(startX, startY, startLength, startAngle, 10);
  });