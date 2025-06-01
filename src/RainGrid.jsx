import React, { useEffect, useState } from "react";

const ROWS = 15;
const COLS = 20;

const getRandomColor = () => {
  const colors = ["#00f", "#0ff", "#0f0", "#f0f", "#ff0", "#f00", "#aaa"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const createEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
};

const RainGrid = ({ rows = ROWS, cols = COLS }) => {
  const [grid, setGrid] = useState(() => createEmptyGrid(rows, cols));

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = createEmptyGrid(rows, cols);

        for (let col = 0; col < cols; col++) {
          if (Math.random() < 0.1) {
            newGrid[0][col] = getRandomColor();
          }

          for (let row = 1; row < rows; row++) {
            if (prevGrid[row - 1][col]) {
              newGrid[row][col] = prevGrid[row - 1][col];
            }
          }
        }

        return newGrid;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [rows, cols]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white p-6">
      <div className="w-full max-w-6xl p-4 bg-gray-900 shadow-2xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Falling Rain Pattern</h1>
        <div
          className="grid gap-1 mx-auto"
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`
          }}
        >
          {grid.flatMap((row, rowIndex) =>
            row.map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-6 h-6 rounded-sm"
                style={{ backgroundColor: color || "#111" }}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RainGrid;
