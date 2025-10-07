const CircularProcessBar = ({ percent = 0, size = 3, strokeWidth = 0.25, strokeColor = "green" }) => {
  const radius = size / 2 - strokeWidth;

  return (
    <div>
      <svg width={`${size}vw`} height={`${size}vw`}>
        <circle
          r={`${radius}vw`}
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          stroke="white"
          strokeWidth={`${strokeWidth}vw`}
        ></circle>
        <circle
          r={`${radius}vw`}
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          stroke={strokeColor}
          strokeWidth={`${strokeWidth}vw`}
          strokeDasharray={`${2 * Math.PI * radius}vw`}
          strokeDashoffset={`${((100 - percent) / 100) * 2 * Math.PI * radius}vw`}
          fill="none"
          transform="rotate(-90)"
          style={{ transformOrigin: "center" }}
          strokeLinecap="round"
        ></circle>
        <text
          x={`${size / 2}vw`}
          y={`${size / 2}vw`}
          alignmentBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize={"1.2vw"}
        >
          {percent}
        </text>
      </svg>
    </div>
  );
};
export default CircularProcessBar;
