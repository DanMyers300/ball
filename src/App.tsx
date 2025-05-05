import { useState, useEffect } from "react";

const App = () => {
  const [location, setLocation] = useState([100, 100]);
  const [velocity, setVelocity] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState([0, 0]);

  const gravity = 0.5;
  const bounceFactor = 0.8;
  const ballSize = 48;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePosition([e.clientX, e.clientY]);
    setVelocity([0, 0]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const [lastX, lastY] = lastMousePosition;
      const currentX = e.clientX;
      const currentY = e.clientY;

      const deltaX = currentX - lastX;
      const deltaY = currentY - lastY;

      setVelocity([deltaX, deltaY]);
      setLocation([currentX, currentY]);
      setLastMousePosition([currentX, currentY]);
    }
  };

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setLocation(([x, y]) => {
          let [vx, vy] = velocity;

          vy += gravity;

          let newX = x + vx;
          let newY = y + vy;

          if (newY >= window.innerHeight - ballSize) {
            newY = window.innerHeight - ballSize;
            vy = -vy * bounceFactor;
          }

          if (newY <= 0) {
            newY = 0;
            vy = -vy * bounceFactor;
          }

          if (newX >= window.innerWidth - ballSize) {
            newX = window.innerWidth - ballSize;
            vx = -vx * bounceFactor;
          }

          if (newX <= 0) {
            newX = 0;
            vx = -vx * bounceFactor;
          }

          setVelocity([vx, vy]);

          return [newX, newY];
        });
      }, 16);

      return () => clearInterval(interval);
    }
  }, [isDragging, velocity]);

  return (
    <>
      <main
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="w-screen h-screen bg-black relative"
      >
        <div
          style={{
            position: "absolute",
            top: `${location[1]}px`,
            left: `${location[0]}px`,
          }}
          className="bg-red-700 w-12 h-12 rounded-full"
        ></div>
      </main>
    </>
  );
};

export default App;

