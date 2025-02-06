import { Card, Container, Show, VStack } from "@chakra-ui/react";
import { VaultLogo } from "@/components/VaultLogo";
import { useState } from "react";
import { WelcomeContent } from "./WelcomeContent";
import { UserDetailsForm } from "./UserDetailsForm";

type Steps = "welcome" | "userDetailsForm" | "done";
export function OnboardingCard() {
  const [step, setStep] = useState<Steps>("welcome");

  return (
    <Container
      as={VStack}
      gap="4"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
    >
      <VaultLogo />

      <Card.Root width={step === "welcome" ? "lg" : "xl"}>
        <Show when={step === "welcome"}>
          <WelcomeContent handleNext={() => setStep("userDetailsForm")} />
        </Show>
        <Show when={step === "userDetailsForm"}>
          <UserDetailsForm handleBack={() => setStep("welcome")} />
        </Show>
      </Card.Root>
    </Container>
  );
}
