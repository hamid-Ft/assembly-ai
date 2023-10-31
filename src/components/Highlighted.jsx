/* eslint-disable react/prop-types */
const sentimentColor = {
  POSITIVE: "lightgreen",
  NEGATIVE: "pink",
  NEUTRAL: "lightgry",
};

const Highlighted = ({ text, sentiment, entities }) => {
  //text= " Ted Confrence was great!"
  //entities = [{text:"Ted Confrence" , entitiy_type : "event "}]

  const entityText = entities.map((e) => e.text);
  const parts = text.split(new RegExp(`(${entityText.join("|")})`, "g"));
  return (
    <div style={{ backgroundColor: `${sentimentColor[sentiment]}` }}>
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
