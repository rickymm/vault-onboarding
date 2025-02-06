import "@testing-library/jest-dom/vitest";
import { UserDetailsForm } from "../UserDetailsForm";
import { describe, it, expect, vi } from "vitest";
import { noop, renderWithProviders } from "@/shared/test-utils";
import { screen, within } from "@testing-library/react";
import { Card } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

import * as api from "@/api";

function renderUserDetailsForm(handleBack = noop) {
  return renderWithProviders(
    <Card.Root>
      <UserDetailsForm handleBack={handleBack} />
    </Card.Root>,
  );
}

const missingError = "This field is required";

describe("UserDetailsForm", () => {
  it("Should render components", () => {
    renderUserDetailsForm();

    expect(screen.getByTestId("user-details-form")).toBeVisible();
    expect(screen.getByRole("button", { name: "Return" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Reset" })).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 3, name: "User Details" }),
    ).toBeVisible();
    expect(screen.getByRole("textbox", { name: "First Name" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Last Name" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Phone Number" })).toBeVisible();
    expect(
      screen.getByRole("textbox", { name: "Corporation Number" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  it("Should trigger handleBack when 'Return' button is clicked", async () => {
    const user = userEvent.setup();
    const handleBackSpy = vi.fn();
    renderUserDetailsForm(handleBackSpy);

    expect(handleBackSpy).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Return" }));
    expect(handleBackSpy).toHaveBeenCalledOnce();
  });

  it("Should clear the fields when 'Reset' button is clicked", async () => {
    const user = userEvent.setup();
    renderUserDetailsForm();

    const form = {
      firstName: {
        value: "Penny",
        field: screen.getByRole("textbox", { name: "First Name" }),
      },
      lastName: {
        value: "Parker",
        field: screen.getByRole("textbox", { name: "Last Name" }),
      },
      phoneNumber: {
        value: "1234567890",
        field: screen.getByRole("textbox", { name: "Phone Number" }),
      },
      corporationNumber: {
        value: "123456789",
        field: screen.getByRole("textbox", {
          name: "Corporation Number",
        }),
      },
    };

    await user.type(form.firstName.field, form.firstName.value);
    await user.type(form.lastName.field, form.lastName.value);
    await user.type(form.phoneNumber.field, form.phoneNumber.value);
    await user.type(form.corporationNumber.field, form.corporationNumber.value);

    expect(form.firstName.field).toHaveValue(form.firstName.value);
    expect(form.lastName.field).toHaveValue(form.lastName.value);
    expect(form.phoneNumber.field).toHaveValue(form.phoneNumber.value);
    expect(form.corporationNumber.field).toHaveValue(
      form.corporationNumber.value,
    );

    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(form.firstName.field).toHaveValue("");
    expect(form.lastName.field).toHaveValue("");
    expect(form.phoneNumber.field).toHaveValue("");
    expect(form.corporationNumber.field).toHaveValue("");
  });

  describe("Fields Validation", () => {
    it("Should show field required error message for all the fields when submitting with empty form", async () => {
      const user = userEvent.setup();
      renderUserDetailsForm();

      expect(screen.queryByText(missingError)).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Submit" }));

      expect(await screen.findAllByText(missingError)).toHaveLength(4);
    });

    it("Should show field is required when 'First Name' is empty", async () => {
      const user = userEvent.setup();
      renderUserDetailsForm();

      expect(screen.queryByText(missingError)).not.toBeInTheDocument();

      await user.type(screen.getByRole("textbox", { name: "First Name" }), " ");
      await user.click(screen.getByRole("button", { name: "Submit" }));

      const firstNameContainer = within(
        screen.getByTestId("first-name-container"),
      );
      expect(firstNameContainer.getByText(missingError)).toBeVisible();
    });

    it("Should show field is required when 'Last Name' is empty", async () => {
      const user = userEvent.setup();
      renderUserDetailsForm();

      expect(screen.queryByText(missingError)).not.toBeInTheDocument();

      await user.type(screen.getByRole("textbox", { name: "Last Name" }), " ");
      await user.click(screen.getByRole("button", { name: "Submit" }));

      const lastNameContainer = within(
        screen.getByTestId("last-name-container"),
      );
      expect(lastNameContainer.getByText(missingError)).toBeVisible();
    });

    it("Should show field is required when 'Phone Number' is too short", async () => {
      const user = userEvent.setup();
      renderUserDetailsForm();

      expect(screen.queryByText(missingError)).not.toBeInTheDocument();

      await user.type(
        screen.getByRole("textbox", { name: "Phone Number" }),
        "123",
      );
      await user.click(screen.getByRole("button", { name: "Submit" }));

      const phoneNumberContainer = within(
        screen.getByTestId("phone-number-container"),
      );
      expect(
        phoneNumberContainer.getByText("Phone Number must be 10 digit long"),
      ).toBeVisible();
    });

    it("Should stop user type when 'Phone Number' reaches 10 digits", async () => {
      const user = userEvent.setup();
      renderUserDetailsForm();

      expect(screen.queryByText(missingError)).not.toBeInTheDocument();

      const valid = "1234567890";
      const extra = "101112";
      const phoneNumberElement = screen.getByRole("textbox", {
        name: "Phone Number",
      });
      await user.type(phoneNumberElement, valid + extra);

      expect(phoneNumberElement).toHaveValue(valid);
    });

    // it("Should show error message on 'Corporation Number' when validation returns as invalid", async () => {
    //   const errorMessage = "Invalid corporation number";
    //   vi.spyOn(api, "useFetch").mockImplementation(
    //     () =>
    //       ({
    //         data: { valid: false, message: errorMessage },
    //       }) as never,
    //   );
    //   renderUserDetailsForm();

    //   expect(await screen.findByText(errorMessage)).toBeVisible();
    // });
  });
});
