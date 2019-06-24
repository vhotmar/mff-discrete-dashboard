import { number } from "prop-types";

export interface CarouselConfig {
  id: number;
  min_capacity: number;
  capacity: number;
  run_time: number;
  wait_time: number;
  extend_time: number;
}

export const DEFAULT_CAROUSEL_CONFIG: CarouselConfig = {
  id: 0,
  min_capacity: 0,
  capacity: 0,
  run_time: 0,
  wait_time: 0,
  extend_time: 0
};

export interface CustomerConfig {
  id: number;
  arrival_time: number;
  carousels: number[];
}

export const DEFAULT_CUSTOMER_CONFIG: CustomerConfig = {
  id: 0,
  arrival_time: 0,
  carousels: []
};

export interface SystemConfig {
  carousels: CarouselConfig[];
  customers: CustomerConfig[];
}

export const DEFAULT_SYSTEM_CONFIG: SystemConfig = {
  carousels: [],
  customers: []
};

export type CustomerDispatcherEvent = { type: "Tick" };
export type CustomerEvent = { type: "RideStarted" } | { type: "RideEnded" };
export type CarouselEvent =
  | { type: "CustomerArrived" }
  | { type: "StandardWaitEnded"; data: number }
  | { type: "ExtendedWaitEnded"; data: number }
  | { type: "EndRide" }
  | { type: "Start" };

export type ParkSystemEvent =
  | { type: "CustomerDispatcherEvent"; data: CustomerDispatcherEvent }
  | { type: "CustomerEvent"; data: CustomerEvent };

export interface DiscreteSystemEvent {
  from_address: number;
  to_address: number;
  time: number;
  message: ParkSystemEvent;
}

export interface CustomerDispatcher {
  carousels: { [key: string]: number };
  customer_configs: CustomerConfig[];
}

export type CustomerComponentState =
  | { type: "WaitingOnCarousel"; data: number }
  | { type: "OnCarousel"; data: number }
  | { type: "Idle" };

export interface CustomerComponentCarouselInfo {
  id: number;
  address: number;
}

export interface CustomerComponent {
  state: CustomerComponentState;
  carousels: CustomerComponentCarouselInfo[];
  config: CustomerConfig;
  started_waiting_on: number;
  number_of_rides: number;
  total_waiting_time: number;
  total_time: number;
}

export type CarouselComponentState =
  | { type: "Idle"; data: CarouselComponentState }
  | { type: "StandardWaiting" }
  | { type: "ExtendedWaiting" }
  | { type: "Starting"; data: number }
  | { type: "Running" };

export interface CarouselComponentCustomerInfo {
  arrival_time: number;
  address: number;
}

export interface CarouselComponent {
  config: CarouselConfig;
  state: CarouselComponentState;
  customers_inner_queue: CarouselComponentCustomerInfo[];
  customers_outer_queue: CarouselComponentCustomerInfo[];
  customers_on_ride: CarouselComponentCustomerInfo[];
  cycle: number;
  rides: number;
  avg_customers_on_ride: number;
  max_customers_queue_len: number;
  idle_time: number;
  idle_started: number;
}

export type ParkSystemComponent =
  | {
      type: "CustomerDispatcher";
      data: CustomerDispatcher;
    }
  | { type: "Customer"; data: CustomerComponent }
  | { type: "Carousel"; data: CarouselComponent };

export interface DiscreteSystem {
  current_time: number;
  events: DiscreteSystemEvent[];
  components: { [key: string]: ParkSystemComponent };
}

export interface TickResponse {
  system: DiscreteSystem;
  events: DiscreteSystemEvent[];
}
