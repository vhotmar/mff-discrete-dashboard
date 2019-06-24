import React from "react";
import { SystemConfig } from "../../types";
import { PREDEFINED_CONFIGS } from "../../configs";
import {
  Container,
  Segment,
  Header,
  Dropdown,
  Divider,
  Grid,
  Card,
  Button
} from "semantic-ui-react";
import { useConfigScreenReducer } from "./reducer";
import { CustomerInfo } from "./CustomerInfo";
import { NewCustomerButton } from "./NewCustomerButton";
import { CarouselInfo } from "./CarouselInfo";
import { NewCarouselButton } from "./NewCarouselButton";

type ConfigScreenProps = {
  onSubmit: (config: SystemConfig) => void;
};

export const ConfigScreen = ({ onSubmit }: ConfigScreenProps) => {
  const { config, actions } = useConfigScreenReducer();

  return (
    <Container>
      <Segment basic>
        <Header as="h1">Customize Config</Header>
      </Segment>
      <Segment basic>
        <Header as="h2">Predefined configs</Header>
        <Dropdown
          button
          text="Config"
          options={PREDEFINED_CONFIGS.map(config => ({
            key: config.id,
            text: config.name,
            value: config.id
          }))}
          onChange={(ev, data) => actions.onNewConfig(String(data.value))}
        />
      </Segment>
      <Divider />
      <Segment basic>
        <Grid columns={2}>
          <Grid.Row divided>
            <Grid.Column>
              <Header as="h4">Customers</Header>
              <Card.Group itemsPerRow={2}>
                {config.customers.map(customer => (
                  <CustomerInfo
                    key={customer.id}
                    carousels={config.carousels}
                    value={customer}
                    onChange={actions.onUpdateCustomer}
                    onRemove={actions.onRemoveCustomer}
                  />
                ))}
              </Card.Group>
              <Divider />
              <NewCustomerButton
                carousels={config.carousels}
                onNewCustomer={actions.onNewCustomer}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h4">Carousels</Header>
              <Card.Group itemsPerRow={2}>
                {config.carousels.map(carousel => (
                  <CarouselInfo
                    key={carousel.id}
                    value={carousel}
                    onChange={actions.onUpdateCarousel}
                    onRemove={actions.onRemoveCarousel}
                  />
                ))}
              </Card.Group>
              <Divider />
              <NewCarouselButton onNewCarousel={actions.onNewCarousel} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment basic>
        <Button onClick={() => onSubmit(config)} color="green" size="big">
          RUN
        </Button>
      </Segment>
    </Container>
  );
};
