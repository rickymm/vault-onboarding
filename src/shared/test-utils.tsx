import { Provider } from "@/components/ui/provider";
import { type ReactElement } from "react";
import { render } from "@testing-library/react";

export function renderWithProviders(ui: ReactElement) {
  return render(<Provider>{ui}</Provider>);
}

export function noop() {}

// spinbutton = input[type="number"] that's a horrible name i know 🥲
export const inputNumberRole = "spinbutton";
