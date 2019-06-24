import { SystemConfig } from "./types";

// People should arrive at the start of the simulation and immediately create
// queue in front of the only carousel number 1. There are 4 people for 1 carousel
// of capacity 2 so it should take 2 rides to complete.
// Customers should be out of the park in time 40.
// Simulation should end in 50
export const BASIC_SCENARIO_1: SystemConfig = {
  carousels: [
    {
      id: 1,
      min_capacity: 2,
      capacity: 2,
      run_time: 10,
      wait_time: 10,
      extend_time: 10
    }
  ],
  customers: [
    {
      id: 1,
      arrival_time: 0,
      carousels: [1]
    },
    {
      id: 2,
      arrival_time: 0,
      carousels: [1]
    },
    {
      id: 3,
      arrival_time: 0,
      carousels: [1]
    },
    {
      id: 4,
      arrival_time: 0,
      carousels: [1]
    }
  ]
};

export const BASIC_SCENARIO_2: SystemConfig = {
  carousels: [
    {
      id: 1,
      min_capacity: 1,
      capacity: 1,
      run_time: 1,
      wait_time: 1,
      extend_time: 1
    }
  ],
  customers: [
    {
      id: 1,
      arrival_time: 0,
      carousels: [1]
    },
    {
      id: 2,
      arrival_time: 0,
      carousels: [1]
    },
    {
      id: 3,
      arrival_time: 5,
      carousels: [1]
    },
    {
      id: 4,
      arrival_time: 5,
      carousels: [1]
    }
  ]
};

export const DEFAULT: SystemConfig = {
  carousels: [
    {
      id: 1,
      min_capacity: 5,
      capacity: 10,
      run_time: 10,
      wait_time: 10,
      extend_time: 30
    },
    {
      id: 2,
      min_capacity: 5,
      capacity: 10,
      run_time: 10,
      wait_time: 10,
      extend_time: 30
    }
  ],
  customers: [
    {
      id: 1,
      arrival_time: 10,
      carousels: [1, 2]
    },
    {
      id: 2,
      arrival_time: 1,
      carousels: [1]
    }
  ]
};

export const PREDEFINED_CONFIGS = [
  {
    id: "default",
    name: "Default",
    value: DEFAULT
  },
  {
    id: "basic-1",
    name: "Long line",
    value: BASIC_SCENARIO_1
  },
  {
    id: "basic-1",
    name: "Carousel idle",
    value: BASIC_SCENARIO_2
  }
];
