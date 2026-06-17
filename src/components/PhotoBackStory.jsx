import { Html } from "@react-three/drei";

export default function PhotoBackStory({ memory, offsetX = 1.86 }) {
  return (
    <Html transform center distanceFactor={2.85} position={[offsetX, 0.28, 0.08]} rotation={[0, 0, 0]}>
      <article className="photo-story-callout">
        <span className="story-callout-line" aria-hidden="true" />
        <div className="story-callout-panel">
          <p className="photo-back-date">{memory.dateLabel}</p>
          <h3>{memory.title}</h3>
          <p>{memory.story}</p>
        </div>
      </article>
    </Html>
  );
}
