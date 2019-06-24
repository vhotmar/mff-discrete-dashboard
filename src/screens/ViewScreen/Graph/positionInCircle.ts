type PositionInCircleOptions = {
  inCenter?: boolean;
  center?: { x: number; y: number };
  radius?: number;
};

export type PositionedItem<T> = { center: { x: number; y: number }; item: T };

export const positionInCircle = <T>(
  data: T[],
  {
    inCenter = false,
    center = { x: 0, y: 0 },
    radius = 0
  }: PositionInCircleOptions = {}
): PositionedItem<T>[] => {
  if (data.length === 0) return [];
  if (data.length === 1 && inCenter)
    return [{ center: { x: center.x, y: center.y }, item: data[0] }];

  const step = (2 * Math.PI) / data.length;

  return data.map((item, i) => ({
    center: {
      x: Math.cos(step * i) * radius + center.x,
      y: Math.sin(step * i) * radius + center.y
    },
    item
  }));
};
