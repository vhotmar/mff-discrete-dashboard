import { CarouselComponent } from "../../../types";
import { positionInCircle } from "./positionInCircle";

export const positionCarousels = (
  carousels: CarouselComponent[],
  center: { x: number; y: number },
  radius: number,
  carouselRadius: number
) => {
  return positionInCircle(carousels, {
    inCenter: true,
    center: center,
    radius: radius
  }).map(x => ({ center: x.center, item: x.item, radius: carouselRadius }));
};
