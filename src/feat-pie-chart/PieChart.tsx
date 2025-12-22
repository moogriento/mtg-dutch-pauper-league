import styles from './PieChart.module.css';

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
  const radius = size / 2;
  const center = radius;
  const total = data.reduce((s, d) => s + d.value, 0);

  let angle = 0;

  return (
    <div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
            />
          );
        })}
      </svg>
      <div>
        {data.map((slice, i) => (
          <div key={i} className={styles['legend-item']}>
            <div
              className={styles['legend-circle']}
              style={{ background: slice.color }}
            />
            {slice.label}: {(slice.value * 100).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
}
