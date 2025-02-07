import { Box, Container } from "@chakra-ui/react";
import { OnboardingCard } from "./components/OnboardingCard/OnboardingCard";
import { ColorModeButton } from "./components/ui/color-mode";

function App() {
  return (
    <Box position="relative">
      <ColorModeButton
        right="4"
        top="4"
        position="absolute"
        data-testid="color-mode-button"
      />
      <Container>
        <OnboardingCard />
      </Container>
    </Box>
  );
}

export default App;
