import React from "react";

const sentimentColor = {
  POSITIVE: "lightgreen",
  NEGATIVE: "pink",
  NEUTRAL: "lightgray",
};

const Highlighted = ({ text, sentiment, entities }) => {
  const entityText = entities.map((e) => e.text);
  const parts = text.split(new RegExp(`(${entityText.join("|")})`, "g"));
  return (
    <div
      style={{
        color: `${sentimentColor[sentiment]}`,
        display: "inline",
      }}>
      {parts.map((part) => {
        const matchingEntity = entities.find((e) => e.text === part);

        if (matchingEntity) {
          return (
            <p
              title={matchingEntity.entity_type}
              key={part}
              style={{ fontWeight: "bolder", display: "inline" }}>
              {part}
            </p>
          );
        }
        return part;
      })}
    </div>
  );
};

export default Highlighted;
