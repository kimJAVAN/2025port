import React, { useEffect, useRef } from "react";

export default function WavyRing({ size = 200, stroke = "#fff" }) {
  const pathRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let rafId;

    const randomOffsets = Array.from({ length: 91 }, () => Math.random() * 100);

    const animate = () => {
      frame += 0.05; 
      const points = [];
      const baseRadius = size / 2 - 10;
      const amplitude = 10; 

      for (let i = 0; i <= 360; i += 4) {
        const angle = (i * Math.PI) / 180;
        const index = i / 4;

        const offset =
          Math.sin(frame + randomOffsets[index]) * amplitude;

        const x = size / 2 + (baseRadius + offset) * Math.cos(angle);
        const y = size / 2 + (baseRadius + offset) * Math.sin(angle);
        points.push([x, y]);
      }

      let d = `M${points[0][0]},${points[0][1]}`;
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i][0] + points[i + 1][0]) / 2;
        const yc = (points[i][1] + points[i + 1][1]) / 2;
        d += ` Q${points[i][0]},${points[i][1]} ${xc},${yc}`;
      }
      d += ` Q${points[points.length - 1][0]},${points[points.length - 1][1]} ${points[0][0]},${points[0][1]} Z`;

      pathRef.current.setAttribute("d", d);

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [size]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: "visible" }}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
