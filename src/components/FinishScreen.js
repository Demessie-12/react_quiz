import React from "react";

function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  numQuestions,
  dispatch,
}) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage > 80 && percentage < 100) emoji = "🎉";
  if (percentage > 50 && percentage < 80) emoji = "😊";
  if (percentage > 0 && percentage < 50) emoji = "🙃";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>ከ <strong>{numQuestions}</strong> ጥያቄዎች{" "}
        {points / 10} መልሰዋል ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        እንደገና ጀምር
      </button>
    </>
  );
}

export default FinishScreen;
