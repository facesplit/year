import { Html } from "@react-three/drei";
import ParticleField from "../components/ParticleField";
import { story } from "../data/story";

export const FINALE_DEPTH = -86;
const FINALE_TEXT_Z = 2.05;
const FINALE_PANEL_Z = FINALE_TEXT_Z - 0.16;
const FINALE_ARCH_Z = 0.72;
const FINALE_SIGN_Z = 1.22;
const FINALE_SIGN_Y = 2.24;

const finalePetalGuide = Array.from({ length: 34 }, (_, index) => {
  const side = index % 2 === 0 ? -1 : 1;
  const z = 9.5 - index * 0.58;
  const spread = Math.max(0.22, 2.2 - index * 0.05);
  return [side * spread, -1.58 + Math.sin(index * 0.62) * 0.06, z];
});

const finalePetalArch = Array.from({ length: 32 }, (_, index) => {
  const angle = Math.PI - (Math.PI * index) / 31;
  return [Math.cos(angle) * 2.58, -1.03 + Math.sin(angle) * 2.34, FINALE_ARCH_Z];
});

export default function Finale({ progress }) {
  if (progress < 0.86) return null;
  const restaurantName = story.finale.details.find((detail) => detail.label === "Ресторан")?.value ?? "Неделька";

  return (
    <group position={[0, 0, FINALE_DEPTH]}>
      <ParticleField count={3600} progress={progress} finale />
      <mesh name="finale-road" position={[0, -1.82, 3.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 18]} />
        <meshBasicMaterial color="#f5b7c8" transparent opacity={0.5} depthWrite={false} fog={false} />
      </mesh>
      <mesh name="finale-road-glow" position={[0, -1.86, 2.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.5, 20]} />
        <meshBasicMaterial color="#ffd6e1" transparent opacity={0.18} depthWrite={false} fog={false} />
      </mesh>
      {finalePetalGuide.map((position, index) => (
        <mesh key={`finale-petal-${index}`} name="finale-petal-guide" position={position} rotation={[0, 0, index * 0.44]} scale={[index % 3 === 0 ? 1.45 : 1, 0.62, 1]}>
          <circleGeometry args={[0.075 + (index % 4) * 0.012, 12]} />
          <meshBasicMaterial color={index % 2 ? "#ec6f9d" : "#f47bae"} transparent opacity={0.68} depthWrite={false} fog={false} />
        </mesh>
      ))}
      {finalePetalArch.map((position, index) => (
        <mesh key={`finale-arch-petal-${index}`} name="finale-petal-arch" position={position} rotation={[0, 0, index * 0.32]} scale={[index % 2 ? 1.18 : 0.88, 0.54, 1]} renderOrder={18}>
          <circleGeometry args={[0.1 + (index % 5) * 0.01, 14]} />
          <meshBasicMaterial color={index % 3 === 0 ? "#ffd3df" : "#f47bae"} transparent opacity={0.64} depthWrite={false} depthTest={false} fog={false} />
        </mesh>
      ))}
      <mesh name="finale-restaurant-sign" position={[0, FINALE_SIGN_Y, FINALE_SIGN_Z]} renderOrder={28}>
        <planeGeometry args={[2.75, 0.58]} />
        <meshBasicMaterial color="#fff1e8" transparent opacity={0.78} depthWrite={false} depthTest={false} fog={false} />
      </mesh>
      <Html transform sprite center position={[0, FINALE_SIGN_Y, FINALE_SIGN_Z + 0.08]} distanceFactor={6.2} zIndexRange={[50, 30]}>
        <div className="finale-restaurant-sign-html">{restaurantName}</div>
      </Html>
      <mesh name="finale-invitation-panel" position={[0, -0.12, FINALE_PANEL_Z]} renderOrder={24}>
        <planeGeometry args={[5.55, 2.2]} />
        <meshBasicMaterial color="#fff1e8" transparent opacity={0.5} depthWrite={false} depthTest={false} fog={false} />
      </mesh>
      <Html transform sprite center position={[0, -0.08, FINALE_TEXT_Z]} distanceFactor={6.2} zIndexRange={[40, 20]}>
        <div className="finale-invitation-html">
          <h2>{story.finale.title}</h2>
          <p>{story.finale.letter}</p>
          <div className="finale-details-html">
            {story.finale.details.map((detail) => (
              <span key={detail.label}>
                <strong>{detail.label}:</strong> {detail.value}
              </span>
            ))}
          </div>
        </div>
      </Html>
      <mesh position={[0, -1.45, -0.12]} scale={[1.18, 0.62, 1]}>
        <torusGeometry args={[0.95, 0.018, 16, 120]} />
        <meshStandardMaterial color="#f47bae" emissive="#f47bae" emissiveIntensity={1.4} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
