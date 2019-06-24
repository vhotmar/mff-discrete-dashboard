import { CustomerComponent } from "../../../types";
import { positionCarousels } from "./positionCarousels";
import { positionInCircle } from "./positionInCircle";
import colors from "nice-color-palettes";

const BASE_COLORS = colors[2];

export const positionCustomers = (
  customers: CustomerComponent[],
  carousels: ReturnType<typeof positionCarousels>,
  customerRadius: number,
  gap: number,
  noCarouselCenter: { x: number; y: number }
) => {
  const noCarousel = [];
  const perCarousel: { [id: string]: CustomerComponent[] } = {};

  for (let customer of customers) {
    const { state } = customer;

    if (state.type === "Idle") noCarousel.push(customer);
    else {
      perCarousel[state.data] = perCarousel[state.data] || [];
      perCarousel[state.data].push(customer);
    }
  }

  let result: {
    center: { x: number; y: number };
    radius: number;
    item: CustomerComponent;
    color: string;
  }[] = [];

  for (let carouselId in perCarousel) {
    const carousel = carousels.find(
      carousel => carousel.item.config.id === Number(carouselId)
    );

    if (carousel == null) {
      for (let customer of perCarousel[carouselId]) {
        noCarousel.push(customer);
      }

      break;
    }

    const positionedCustomers = positionInCircle(perCarousel[carouselId], {
      center: carousel.center,
      radius: carousel.radius + gap + customerRadius,
      inCenter: false
    }).map(positioned => ({
      center: positioned.center,
      radius: customerRadius,
      item: positioned.item,
      color:
        positioned.item.state.type === "WaitingOnCarousel"
          ? BASE_COLORS[0]
          : BASE_COLORS[2]
    }));

    result.push(...positionedCustomers);
  }

  noCarousel.forEach((customer, i) => {
    result.push({
      center: {
        x: noCarouselCenter.x,
        y: noCarouselCenter.y + (customerRadius * 2 + gap) * i
      },
      radius: customerRadius,
      item: customer,
      color: BASE_COLORS[1]
    });
  });

  return result;
};
