import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";
import { smoothstep } from "../utils/animation";
import { getHeartPosition, getScatterPosition, mixPosition } from "../utils/curves";

export const HEART_ASSEMBLY_START = 0.78;
export const HEART_ASSEMBLY_END = 0.875;
export const HEART_PHOTO_RANGE = [0.78, 0.875];

export default function HeartAssembly({ progress }) {
  if (progress < HEART_ASSEMBLY_START || progress > HEART_ASSEMBLY_END) return null;
  const assemble = smoothstep(0.79, 0.84, progress);
  return story.memories.map((memory, index) => {
    const scatter = getScatterPosition(index, story.memories.length);
    const heart = getHeartPosition(index, story.memories.length);
    return (
      <MemoryPhoto
        key={`heart-${memory.id}`}
        memory={memory}
        progress={progress}
        position={mixPosition(scatter, heart, assemble)}
        rotation={[0, 0, 0]}
        range={HEART_PHOTO_RANGE}
        scale={0.32 + assemble * 0.1}
      />
    );
  });
}
