import { Card, Button } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

export function WelcomeContent({
  handleNext,
}: {
  handleNext: Dispatch<SetStateAction<void>>;
}) {
  return (
    <div data-testid="welcome-card">
      <Card.Body gap="2">
        <Card.Title mt="2">Onboarding Form</Card.Title>
        <Card.Description>Welcome to the Vault onboarding!</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button onClick={() => handleNext()}>Start</Button>
      </Card.Footer>
    </div>
  );
}
