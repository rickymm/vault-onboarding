import "@testing-library/jest-dom/vitest";
import { CorporationNumberInput } from "./CorporationNumberInput";
import { describe, it, expect, vi, afterEach } from "vitest";
import { renderWithProviders } from "@/shared/test-utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { type PropsWithChildren } from "react";
import * as api from "@/api";

function WithFormProvider({ children }: PropsWithChildren) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function renderCorporationNumberInput() {
  return renderWithProviders(
    <WithFormProvider>
      <CorporationNumberInput />
    </WithFormProvider>,
  );
}

describe("CorporationNumberInput", () => {
  it("Should render the input with a label", () => {
    renderCorporationNumberInput();

    expect(screen.getByLabelText("Corporation Number")).toBeVisible();
    expect(screen.getByPlaceholderText("123456789"));
  });

  it("Should stop user type when 'Corporation Number' reaches 9 digits", async () => {
    const user = userEvent.setup();
    renderCorporationNumberInput();

    expect(
      screen.queryByText("This field is required"),
    ).not.toBeInTheDocument();

    const valid = "123456789";
    const extra = "101112";
    const corporationNumberElement = screen.getByRole("textbox", {
      name: "Corporation Number",
    });
    await user.type(corporationNumberElement, valid + extra);

    expect(corporationNumberElement).toHaveValue(valid);
  });

  it("Should show a spinner when validating the Corporation Number", async () => {
    vi.spyOn(api, "useFetch").mockImplementation(
      () =>
        ({
          isLoading: true,
        }) as never,
    );
    renderCorporationNumberInput();

    const corporationNumberContainer = within(
      screen.getByTestId("corporation-number-container"),
    );

    expect(corporationNumberContainer.getByTestId("spinner")).toBeVisible();
  });

  // This test is in UserDetails.test.tsx > 'Fields Validation' >
  // > 'Should show error message on 'Corporation Number' when validation returns as invalid'
  // not sure why it's failing when running here but working there
  // might be because it's the component that contains the main FormProvider and not a mocked one
  it.todo("Should show error message when validation fails for no reason");

  it("Should call api on blur of the field", async () => {
    const queryDataSpy = vi.fn();
    vi.spyOn(api, "useFetch").mockImplementation(
      () =>
        ({
          queryData: queryDataSpy,
        }) as never,
    );

    const user = userEvent.setup();

    renderCorporationNumberInput();

    expect(queryDataSpy).not.toHaveBeenCalled();

    const corpNumber = "123";
    const blur = "[tab]";
    await user.type(
      screen.getByRole("textbox", { name: "Corporation Number" }),
      corpNumber + blur,
    );

    expect(queryDataSpy).toHaveBeenCalledOnce();
    expect(queryDataSpy).toHaveBeenCalledWith({
      url: `corporation-number/${corpNumber}`,
    });
  });
});
