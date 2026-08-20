import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let t = 0;
    let frame = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const step = 40;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Linhas da grade
      ctx.strokeStyle = "rgba(57,155,89,0.12)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Pontos nas interseções
      ctx.fillStyle = "rgba(91,196,122,0.2)";
      for (let x = 0; x <= width; x += step) {
        for (let y = 0; y <= height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Brilho varrendo da esquerda para a direita
      const sweepX = (Math.sin(t * 0.5) * 0.5 + 0.5) * (width + 300) - 150;
      const sweepW = 220;
      const sweep = ctx.createLinearGradient(sweepX - sweepW, 0, sweepX + sweepW, 0);
      sweep.addColorStop(0, "transparent");
      sweep.addColorStop(0.4, "rgba(91,196,122,0.07)");
      sweep.addColorStop(0.5, "rgba(91,196,122,0.14)");
      sweep.addColorStop(0.6, "rgba(91,196,122,0.07)");
      sweep.addColorStop(1, "transparent");
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, width, height);

      // Ponto brilhante acompanhando o brilho
      const py = height * 0.42 + Math.sin(t * 0.7) * height * 0.08;
      const glow = ctx.createRadialGradient(sweepX, py, 0, sweepX, py, 140);
      glow.addColorStop(0, "rgba(91,196,122,0.15)");
      glow.addColorStop(0.5, "rgba(91,196,122,0.05)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Segundo brilho, menor, movimento inverso
      const s2x = (Math.sin(t * 0.3 + Math.PI) * 0.5 + 0.5) * (width + 200) - 100;
      const s2y = height * 0.65 + Math.cos(t * 0.5) * height * 0.06;
      const glow2 = ctx.createRadialGradient(s2x, s2y, 0, s2x, s2y, 90);
      glow2.addColorStop(0, "rgba(57,155,89,0.1)");
      glow2.addColorStop(1, "transparent");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = () => {
      t += 0.006;
      draw();
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) {
      draw();
    } else {
      loop();
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
