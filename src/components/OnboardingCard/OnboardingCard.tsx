import { Card, Show, VStack } from "@chakra-ui/react";
import { VaultLogo } from "@/components/VaultLogo";
import { useState } from "react";
import { WelcomeContent } from "./WelcomeContent";
import { UserDetailsForm } from "./UserDetailsForm";

type Steps = "welcome" | "userDetailsForm" | "done";
export function OnboardingCard() {
  const [step, setStep] = useState<Steps>("welcome");

  return (
    <VStack gap="4" alignItems="center" justifyContent="center" h="100vh">
      <VaultLogo />

      <Card.Root
        width={{ base: "sm", md: step === "userDetailsForm" ? "xl" : "lg" }}
      >
        <Show when={step === "welcome"}>
          <WelcomeContent handleNext={() => setStep("userDetailsForm")} />
        </Show>
        <Show when={step === "userDetailsForm"}>
          <UserDetailsForm handleBack={() => setStep("welcome")} />
        </Show>
      </Card.Root>
    </VStack>
  );
}
