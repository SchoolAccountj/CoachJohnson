import { useEffect, useRef } from "react";

interface ShinyHeadProps {
  intensity: number;
}

export function ShinyHead({ intensity = 0.5 }: ShinyHeadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = 300;
      canvas.height = 300;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawHead = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the basic head shape
      ctx.beginPath();
      ctx.arc(150, 150, 100, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD1B3";
      ctx.fill();

      // Draw the shine
      const gradient = ctx.createRadialGradient(120, 120, 10, 150, 150, 100);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.8})`);
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw receding hairline
      ctx.beginPath();
      ctx.moveTo(50, 100);
      ctx.quadraticCurveTo(150, 180, 250, 100);
      ctx.strokeStyle = "#4A4A4A";
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(drawHead);
    };

    drawHead();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      style={{ maxWidth: "300px", maxHeight: "300px" }}
    />
  );
}
