import { Text } from "@react-three/drei";
import MemoryPhoto from "../components/MemoryPhoto";
import { story } from "../data/story";
import { smoothstep } from "../utils/animation";

export const CALENDAR_DEPTH = -52;
export const CALENDAR_SCALE = 1.08;

export function getCalendarOpacity(progress) {
  if (progress < 0.63) return 0;
  if (progress <= 0.74) return 1;
  return Math.max(0, 1 - smoothstep(0.74, 0.84, progress));
}

export default function CalendarScene({ progress }) {
  if (progress < 0.63 || progress > 0.84) return null;
  const open = smoothstep(0.66, 0.74, progress);
  const opacity = getCalendarOpacity(progress);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <group position={[0, 0, CALENDAR_DEPTH]} rotation={[-0.08, 0, 0]} scale={CALENDAR_SCALE}>
      <mesh>
        <boxGeometry args={[9.15, 6.35, 0.12]} />
        <meshBasicMaterial color="#ffc8d8" transparent opacity={opacity} depthWrite={false} fog={false} />
      </mesh>
      <Text position={[0, 2.35, 0.28]} fontSize={0.5} color="#4b2238" anchorX="center" fillOpacity={opacity} material-fog={false} material-depthTest={false}>
        Май 2025
      </Text>
      {days.map((day, index) => {
        const x = -3.38 + (index % 7) * 1.12;
        const y = 1.56 - Math.floor(index / 7) * 0.86;
        const selected = day === 3;
        return (
          <group key={day} position={[x, y, selected ? 0.22 + open * 0.55 : 0.12]}>
            <mesh>
              <boxGeometry args={[0.78, 0.56, 0.05]} />
              <meshBasicMaterial color={selected ? "#f3a6bd" : "#fff8f2"} transparent opacity={opacity} depthWrite={false} fog={false} />
            </mesh>
            <Text position={[0, -0.02, 0.14]} fontSize={0.22} color="#4b2238" anchorX="center" fillOpacity={opacity} material-fog={false} material-depthTest={false}>
              {String(day)}
            </Text>
          </group>
        );
      })}
      <group position={[2.35, -0.98 + open * 0.44, -0.35 + open * 0.48]} scale={0.28 + open * 0.08}>
        <MemoryPhoto memory={story.memories[5]} progress={progress} position={[0, 0, 0]} range={[0.58, 0.68]} scale={0.72} enableFlip={false} />
      </group>
    </group>
  );
}
