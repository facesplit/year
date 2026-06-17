import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";

const positions = [
  [-3.2, 1.1, -5],
  [2.8, -0.9, -6.5],
  [-1.2, -1.5, -8],
  [3.4, 1.4, -9.5],
];

export default function ChapterMemories({ progress }) {
  if (progress < 0.1 || progress > 0.31) return null;
  return story.openingMemories.map((memory, index) => (
    <MemoryPhoto
      key={memory.id}
      memory={memory}
      progress={progress}
      position={positions[index]}
      rotation={[0.08, index % 2 ? -0.3 : 0.22, 0]}
      range={[0.12 + index * 0.03, 0.3]}
      scale={0.72}
    />
  ));
}
