import { WelcomeContent } from "../WelcomeContent";
import { describe, it, expect, vi } from "vitest";
import { noop, renderWithProviders } from "@/shared/test-utils";
import { screen } from "@testing-library/react";
import { Card } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

function renderWelcomeContent(handleNext = noop) {
  return renderWithProviders(
    <Card.Root>
      <WelcomeContent handleNext={handleNext} />
    </Card.Root>,
  );
}

describe("WelcomeContent", () => {
  it("Should render components", () => {
    renderWelcomeContent();

    expect(screen.getByTestId("welcome-card")).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 3, name: "Onboarding Form" }),
    ).toBeVisible();
    expect(screen.getByText("Welcome to the Vault onboarding!")).toBeVisible();
    expect(screen.getByRole("button", { name: "Start" })).toBeVisible();
  });

  it("Should trigger handleNext when 'Start' button is clicked", async () => {
    const user = userEvent.setup();
    const handleNextSpy = vi.fn();
    renderWelcomeContent(handleNextSpy);

    expect(handleNextSpy).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Start" }));
    expect(handleNextSpy).toHaveBeenCalledOnce();
  });
});
