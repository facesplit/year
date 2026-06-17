import { Html } from "@react-three/drei";
import { animalSprites } from "../data/animalSprites";
import { rangeProgress } from "../utils/animation";

const hillColors = ["#ffd8e5", "#f7c7d8", "#ffe8cd"];
const ANIMAL_PATH_START = 0.22;
const ANIMAL_PATH_WINDOW_END = 0.74;
export const animalPathSlots = Array.from({ length: 14 }, (_, index) => {
  const animal = animalSprites[index % animalSprites.length];
  return {
    ...animal,
    id: `animal-path-${index + 1}`,
    size: Math.round(animal.size * (index % 2 === 0 ? 0.92 : 0.78)),
  };
});
const roadSegments = Array.from({ length: 9 }, (_, index) => index);
const grassTufts = Array.from({ length: 18 }, (_, index) => index);
const flowers = Array.from({ length: 14 }, (_, index) => index);
export const lawnTrees = Array.from({ length: 6 }, (_, index) => index);
export const sideShrubs = Array.from({ length: 16 }, (_, index) => index);
export const sideLanterns = Array.from({ length: 4 }, (_, index) => index);
export const sideFireflies = Array.from({ length: 28 }, (_, index) => index);
const clouds = [
  [-4.2, 2.45, -24],
  [3.6, 2.75, -34],
  [-2.8, 2.95, -48],
];

export function getAnimalPathPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (7.2 + (index % 3) * 0.58), -3.45 + Math.sin(index * 0.9) * 0.06, -12 - index * 3];
}

export function getVisibleAnimalPathIndices(progress, total = animalPathSlots.length) {
  if (progress < ANIMAL_PATH_START || total <= 0) return [];
  const visibleCount = Math.floor(rangeProgress(progress, ANIMAL_PATH_START, ANIMAL_PATH_WINDOW_END) * (total - 1)) + 1;
  return Array.from({ length: Math.min(total, visibleCount) }, (_, index) => index);
}

export function getAnimalPathOpacity(progress, index) {
  return progress >= ANIMAL_PATH_START ? 1 : 0;
}

export function getHillLayerPosition(index) {
  return [index % 2 === 0 ? -1.8 : 1.8, -2.45 + index * 0.12, -22 - index * 14];
}

export function getGrassTuftPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (4.1 + (index % 3) * 0.35), -1.92 + Math.sin(index) * 0.08, -7 - index * 2.65];
}

export function getFlowerPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (2.65 + (index % 4) * 0.54), -1.78 + Math.cos(index * 0.6) * 0.07, -9 - index * 2.85];
}

export function getLawnTreePosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (2.9 + (index % 3) * 0.34), -2.18, -10 - index * 4.6];
}

export function getShrubPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (3.55 + (index % 4) * 0.34), -2.08 + Math.sin(index * 0.7) * 0.05, -7.5 - index * 2.8];
}

export function getLanternPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * 3.12, -2.08, -13 - index * 9.5];
}

export function getFireflyPosition(index) {
  const side = index % 2 === 0 ? -1 : 1;
  return [side * (4.7 + (index % 4) * 0.42), -0.86 + Math.sin(index * 0.82) * 0.22, -10 - index * 2.05];
}

export default function NaturePath({ progress = 0 }) {
  const visibleAnimalIndices = getVisibleAnimalPathIndices(progress);
  const animalSpritesLayer = visibleAnimalIndices.map((index) => {
    const animal = animalPathSlots[index];
    const opacity = getAnimalPathOpacity(progress, index);
    return (
      <Html key={animal.id} transform sprite center position={getAnimalPathPosition(index)} distanceFactor={2.25} zIndexRange={[1, 0]}>
        <img className="animal-sprite" src={animal.src} alt="" style={{ width: `${animal.size}px`, opacity, transition: "opacity 720ms ease" }} />
      </Html>
    );
  });

  if (progress > 0.76) return <group>{animalSpritesLayer}</group>;

  return (
    <group>
      <group name="nature-sky">
        <mesh name="nature-sun" position={[4.8, 3.2, -42]} scale={[0.72, 0.72, 0.72]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#ffd4a3" transparent opacity={0.88} depthWrite={false} fog={false} />
        </mesh>
        {clouds.map((position, index) => (
          <group key={`cloud-${index}`} name="nature-cloud" position={position} scale={[1 + index * 0.18, 0.62, 0.2]}>
            <mesh position={[-0.55, 0, 0]}>
              <sphereGeometry args={[0.72, 24, 12]} />
              <meshBasicMaterial color="#fff4ed" transparent opacity={0.78} depthWrite={false} fog={false} />
            </mesh>
            <mesh position={[0.12, 0.15, 0]}>
              <sphereGeometry args={[0.9, 24, 12]} />
              <meshBasicMaterial color="#fff4ed" transparent opacity={0.74} depthWrite={false} fog={false} />
            </mesh>
            <mesh position={[0.82, -0.02, 0]}>
              <sphereGeometry args={[0.62, 24, 12]} />
              <meshBasicMaterial color="#fff4ed" transparent opacity={0.68} depthWrite={false} fog={false} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh position={[0, -2.34, -30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 68]} />
        <meshBasicMaterial color="#ffd6e1" transparent opacity={0.64} depthWrite={false} fog={false} />
      </mesh>
      <mesh name="nature-ground" position={[0, -2.38, -32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 76]} />
        <meshBasicMaterial color="#f7d4c2" transparent opacity={0.68} depthWrite={false} fog={false} />
      </mesh>
      {roadSegments.map((index) => (
        <mesh key={`road-${index}`} name="nature-road" position={[Math.sin(index * 0.72) * 0.72, -2.24, -8 - index * 5.2]} rotation={[-Math.PI / 2, 0, Math.sin(index * 0.5) * 0.08]}>
          <planeGeometry args={[2.8 + (index % 2) * 0.35, 6.4]} />
          <meshBasicMaterial color="#f5b7c8" transparent opacity={0.64} depthWrite={false} fog={false} />
        </mesh>
      ))}
      <Html transform center position={[0, -2.28, -18]} rotation={[-Math.PI / 2, 0, 0]} distanceFactor={8}>
        <span className="nature-ground-glow" />
      </Html>
      {hillColors.map((color, index) => (
        <mesh key={color} position={getHillLayerPosition(index)} scale={[7.8 + index * 1.4, 1.18 + index * 0.16, 0.24]}>
          <sphereGeometry args={[1, 32, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.68 - index * 0.07} depthWrite={false} fog={false} />
        </mesh>
      ))}
      {lawnTrees.map((index) => (
        <group key={`lawn-tree-${index}`} name="nature-lawn-tree" position={getLawnTreePosition(index)} scale={[0.74, 0.74, 0.74]}>
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.055, 0.08, 0.56, 8]} />
            <meshBasicMaterial color="#b9826d" transparent opacity={0.78} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0, 0.72, 0]} scale={[0.82, 0.76, 0.28]}>
            <sphereGeometry args={[0.58, 20, 10]} />
            <meshBasicMaterial color={index % 2 ? "#f3a6bd" : "#b9ddb4"} transparent opacity={0.78} depthWrite={false} fog={false} />
          </mesh>
        </group>
      ))}
      {sideLanterns.map((index) => (
        <group key={`lantern-${index}`} name="nature-lantern" position={getLanternPosition(index)} scale={[0.74, 0.74, 0.74]}>
          <mesh position={[0, 0.16, 0]} scale={[0.56, 0.22, 0.56]}>
            <sphereGeometry args={[0.34, 18, 10]} />
            <meshStandardMaterial color="#ffd8a8" emissive="#f47bae" emissiveIntensity={1.15} transparent opacity={0.78} depthWrite={false} fog={false} />
          </mesh>
          {[-0.56, 0, 0.56].map((offset) => (
            <mesh key={`garland-${index}-${offset}`} name="nature-garland-light" position={[offset, 0.32 - Math.abs(offset) * 0.08, 0.02]}>
              <sphereGeometry args={[0.07, 10, 6]} />
              <meshBasicMaterial color={offset === 0 ? "#fff0a8" : "#f47bae"} transparent opacity={0.8} depthWrite={false} fog={false} />
            </mesh>
          ))}
        </group>
      ))}
      {grassTufts.map((index) => {
        const position = getGrassTuftPosition(index);
        return (
          <group key={`grass-${index}`} name="nature-grass" position={position} scale={[0.45, 0.45, 0.45]}>
            <mesh rotation={[0, 0, -0.24]}>
              <coneGeometry args={[0.09, 0.52, 5]} />
              <meshBasicMaterial color="#a9d7a2" fog={false} />
            </mesh>
            <mesh position={[0.13, 0.04, 0]} rotation={[0, 0, 0.18]}>
              <coneGeometry args={[0.08, 0.46, 5]} />
              <meshBasicMaterial color="#8fcf95" fog={false} />
            </mesh>
          </group>
        );
      })}
      {sideShrubs.map((index) => (
        <group key={`shrub-${index}`} name="nature-shrub" position={getShrubPosition(index)} scale={[0.56, 0.56, 0.56]}>
          <mesh scale={[1.2, 0.46, 0.34]}>
            <sphereGeometry args={[0.56, 18, 8]} />
            <meshBasicMaterial color={index % 3 === 0 ? "#f2a5bd" : "#a8d9a5"} transparent opacity={0.72} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0.22, 0.13, 0.02]} scale={[0.62, 0.34, 0.22]}>
            <sphereGeometry args={[0.36, 14, 8]} />
            <meshBasicMaterial color="#ffd8e5" transparent opacity={0.7} depthWrite={false} fog={false} />
          </mesh>
        </group>
      ))}
      {flowers.map((index) => {
        const position = getFlowerPosition(index);
        return (
          <group key={`flower-${index}`} name="nature-flower" position={position} scale={[0.34, 0.34, 0.34]}>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.015, 0.02, 0.38, 6]} />
              <meshBasicMaterial color="#8fcf95" fog={false} />
            </mesh>
            <mesh position={[0, 0.43, 0]}>
              <sphereGeometry args={[0.12, 16, 8]} />
              <meshBasicMaterial color={index % 2 ? "#ec6f9d" : "#fff1a6"} fog={false} />
            </mesh>
          </group>
        );
      })}
      {sideFireflies.map((index) => (
        <mesh key={`firefly-${index}`} name="nature-firefly" position={getFireflyPosition(index)} scale={[1 + (index % 3) * 0.2, 1, 1]}>
          <sphereGeometry args={[0.04, 8, 6]} />
          <meshBasicMaterial color={index % 2 ? "#fff0a8" : "#f47bae"} transparent opacity={0.78} depthWrite={false} fog={false} />
        </mesh>
      ))}
      {animalSpritesLayer}
    </group>
  );
}
