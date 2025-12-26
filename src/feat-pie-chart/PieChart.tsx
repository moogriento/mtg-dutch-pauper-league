import { useState } from 'react';

type Slice = {
  label: string;
  value: number;
  color: string;
};

export function PieChart({
  data,
  size = 120,
}: {
  data: Slice[];
  size?: number;
}) {
  const [hovered, setHovered] = useState<{
    index: number;
    x: number;
    y: number;
  } | null>(null);

  const radius = size / 2;
  const center = radius;
  const total = data.reduce((s, d) => s + d.value, 0);

  let angle = 0;

  return (
    <div>
      <svg
        className="mb-4 mx-auto"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {data.map((slice, i) => {
          const sliceAngle = (slice.value / total) * Math.PI * 2;

          const x1 = center + radius * Math.cos(angle);
          const y1 = center + radius * Math.sin(angle);

          angle += sliceAngle;

          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);

          const largeArc = sliceAngle > Math.PI ? 1 : 0;

          return (
            <path
              key={i}
              d={`
              M ${center} ${center}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
              Z
            `}
              fill={slice.color}
              onMouseEnter={(e) =>
                setHovered({
                  index: i,
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              onMouseMove={(e) =>
                setHovered(
                  (prev) => prev && { ...prev, x: e.clientX, y: e.clientY }
                )
              }
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div
          className="pointer-events-none fixed z-50 px-2 py-1 text-xs rounded shadow-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 whitespace-nowrap"
          style={{
            top: hovered.y + 10,
            left: hovered.x + 10,
          }}
        >
          {data[hovered.index].label}:{' '}
          {(data[hovered.index].value * 100).toFixed(1)}%
        </div>
      )}

      <div>
        {data.map((slice, i) => (
          <div key={i} className="inline-flex items-center gap-1 text-sm mr-4">
            {/* Color dot */}
            <div
              className="w-3.5 h-3.5 rounded-full flex-shrink-0"
              style={{ background: slice.color }}
            />

            {/* Label and value */}
            <span className="whitespace-nowrap">
              {slice.label}:
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {(slice.value * 100).toFixed(1)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
