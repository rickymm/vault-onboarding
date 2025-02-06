import { Provider } from "@/components/ui/provider";
import { render as rtlRender } from "@testing-library/react";

export function renderWithProviders(ui: React.ReactNode) {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: React.PropsWithChildren) => (
      <Provider>{props.children}</Provider>
    ),
  });
}

export function noop() {}

// When you do screen.getByRole('')
// spinbutton = input[type="number"] that's a horrible name i know 🥲
export const inputNumberRole = "spinbutton";
