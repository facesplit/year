import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";

export default function ChapterIntro({ progress }) {
  const visible = progress < 0.22;
  if (!visible) return null;
  return <MemoryPhoto memory={story.heroMemory} progress={progress} position={[2.05, -0.28, -1.25]} rotation={[0.02, -0.18, 0]} range={[0, 0.12]} scale={1.45} />;
}
