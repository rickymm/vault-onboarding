import { OnboardingCard } from "../OnboardingCard";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/shared/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function renderOnboardingCard() {
  return renderWithProviders(<OnboardingCard />);
}

describe("OnboardingCard", () => {
  it("Should render Welcome content first", () => {
    renderOnboardingCard();

    expect(screen.getByTestId("welcome-card")).toBeVisible();
    expect(screen.getByRole("button", { name: "Start" })).toBeVisible();
  });

  it("Should show User Details form when 'Start' button is clicked", async () => {
    const user = userEvent.setup();
    renderOnboardingCard();

    expect(screen.getByTestId("welcome-card")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.getByTestId("user-details-form")).toBeVisible();
  });
});
