import {
  SystemConfig,
  CustomerConfig,
  CarouselConfig,
  DEFAULT_SYSTEM_CONFIG
} from "../../types";
import { useReducer } from "react";
import { PREDEFINED_CONFIGS } from "../../configs";

type State = {
  config: SystemConfig;
  latestCarouselId: number;
  latestCustomerId: number;
};

type Action =
  | { type: "ADD_CUSTOMER"; payload: CustomerConfig }
  | { type: "ADD_CAROUSEL"; payload: CarouselConfig }
  | { type: "REMOVE_CUSTOMER"; payload: number }
  | { type: "REMOVE_CAROUSEL"; payload: number }
  | { type: "UPDATE_CUSTOMER"; payload: CustomerConfig }
  | { type: "UPDATE_CAROUSEL"; payload: CarouselConfig }
  | { type: "SET_CONFIG"; payload: SystemConfig };

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_CAROUSEL":
      return {
        ...state,
        config: {
          ...state.config,
          carousels: [
            ...state.config.carousels,
            { ...action.payload, id: state.latestCarouselId + 1 }
          ]
        },
        latestCarouselId: state.latestCarouselId + 1
      };
    case "ADD_CUSTOMER":
      return {
        ...state,
        config: {
          ...state.config,
          customers: [
            ...state.config.customers,
            { ...action.payload, id: state.latestCustomerId + 1 }
          ]
        },
        latestCustomerId: state.latestCustomerId + 1
      };
    case "REMOVE_CAROUSEL":
      return {
        ...state,
        config: {
          customers: state.config.customers.map(customer => ({
            ...customer,
            carousels: customer.carousels.filter(
              carouselId => carouselId !== action.payload
            )
          })),
          carousels: state.config.carousels.filter(
            carousel => carousel.id !== action.payload
          )
        }
      };
    case "REMOVE_CUSTOMER":
      return {
        ...state,
        config: {
          ...state.config,
          customers: state.config.customers.filter(
            customer => customer.id !== action.payload
          )
        }
      };
    case "UPDATE_CAROUSEL":
      return {
        ...state,
        config: {
          ...state.config,
          carousels: state.config.carousels.map(carousel =>
            carousel.id === action.payload.id ? action.payload : carousel
          )
        }
      };
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        config: {
          ...state.config,
          customers: state.config.customers.map(customer =>
            customer.id === action.payload.id ? action.payload : customer
          )
        }
      };
    case "SET_CONFIG":
      return {
        ...state,
        config: action.payload,
        latestCarouselId: Math.max(
          0,
          ...action.payload.carousels.map(carousel => carousel.id)
        ),
        latestCustomerId: Math.max(
          0,
          ...action.payload.customers.map(customer => customer.id)
        )
      };
  }

  return state;
};

export const useConfigScreenReducer = () => {
  const [{ config }, dispatch] = useReducer(appReducer, {
    config: DEFAULT_SYSTEM_CONFIG,
    latestCarouselId: 1,
    latestCustomerId: 1
  });

  const onNewCustomer = (customer: CustomerConfig) =>
    dispatch({
      type: "ADD_CUSTOMER",
      payload: customer
    });

  const onNewCarousel = (carousel: CarouselConfig) =>
    dispatch({
      type: "ADD_CAROUSEL",
      payload: carousel
    });

  const onNewConfig = (configId: string) => {
    const config = PREDEFINED_CONFIGS.find(config => config.id === configId);

    if (config != null) {
      dispatch({
        type: "SET_CONFIG",
        payload: config.value
      });
    }
  };

  const onUpdateCustomer = (customer: CustomerConfig) =>
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: customer
    });

  const onUpdateCarousel = (carousel: CarouselConfig) =>
    dispatch({
      type: "UPDATE_CAROUSEL",
      payload: carousel
    });

  const onRemoveCustomer = (customer: number) =>
    dispatch({
      type: "REMOVE_CUSTOMER",
      payload: customer
    });

  const onRemoveCarousel = (carousel: number) =>
    dispatch({
      type: "REMOVE_CAROUSEL",
      payload: carousel
    });

  return {
    config,
    actions: {
      onNewCustomer,
      onNewCarousel,
      onNewConfig,
      onUpdateCustomer,
      onUpdateCarousel,
      onRemoveCarousel,
      onRemoveCustomer
    }
  };
};
