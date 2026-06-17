import MemoryPhoto, { getPhotoOpacity } from "../components/MemoryPhoto";
import { story } from "../data/story";
import { rangeProgress } from "../utils/animation";

const FLIGHT_PHOTO_RANGE_DURATION = 0.13;

function getFlightMemoryRangeStart(index) {
  return 0.26 + index * 0.025;
}

export function getFlightCorridorPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (2.25 + (index % 3) * 0.52), Math.sin(index * 0.72) * 1.05, -10 - index * 2.12];
}

export function getActiveFlightMemoryIndex(progress, total) {
  if (progress < 0.28 || progress > 0.61) return -1;
  const segment = (0.61 - 0.28) / Math.max(1, total);
  return Math.min(total - 1, Math.max(0, Math.floor((progress - 0.28) / segment)));
}

export function getVisibleFlightMemoryIndices(progress, total) {
  if (total <= 0) return [];
  return Array.from({ length: total }, (_, index) => index).filter((index) => {
    const start = getFlightMemoryRangeStart(index);
    const local = rangeProgress(progress, start, start + FLIGHT_PHOTO_RANGE_DURATION);
    return getPhotoOpacity(local) > 0.015;
  });
}

export default function ChapterFlight({ progress }) {
  if (progress < 0.24) return null;
  const activeIndex = getActiveFlightMemoryIndex(progress, story.memories.length);
  const visibleIndices = getVisibleFlightMemoryIndices(progress, story.memories.length);
  if (visibleIndices.length === 0) return null;

  return visibleIndices.map((index) => {
    const memory = story.memories[index];
    const start = getFlightMemoryRangeStart(index);
    return (
      <MemoryPhoto
        key={memory.id}
        memory={memory}
        progress={progress}
        showStory={index === activeIndex}
        enableFlip={false}
        position={getFlightCorridorPosition(index)}
        rotation={[0, index % 2 ? -0.22 : 0.22, 0]}
        range={[start, start + 0.13]}
        scale={0.82}
      />
    );
  });
}
