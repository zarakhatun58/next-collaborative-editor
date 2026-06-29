"use client";

interface Props {
  x: number;
  y: number;
  name: string;
  color: string;
}

export default function Cursor({
  x,
  y,
  name,
  color,
}: Props) {
  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: x,
        top: y,
      }}
    >

      <svg
        width="20"
        height="20"
      >
        <path
          fill={color}
          d="M0 0L0 18L5 13L9 20L12 18L8 11L16 11Z"
        />
      </svg>

      <div
        className="rounded-lg px-2 py-1 text-xs text-white"
        style={{
          background: color,
        }}
      >
        {name}
      </div>

    </div>
  );
}