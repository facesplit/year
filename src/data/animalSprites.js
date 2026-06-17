import animal1 from "../../assets/1.gif";
import animal2 from "../../assets/2.gif";
import animal3 from "../../assets/3.gif";
import animal4 from "../../assets/4.gif";
import animal5 from "../../assets/5.gif";
import animal6 from "../../assets/6.gif";
import animal7 from "../../assets/7.gif";

export const animalSprites = [animal1, animal2, animal3, animal4, animal5, animal6, animal7].map((src, index) => ({
  id: `animal-${index + 1}`,
  src,
  size: index % 3 === 0 ? 132 : index % 3 === 1 ? 112 : 96,
}));
