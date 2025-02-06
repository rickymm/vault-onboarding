import { useFetch } from "@/api";
import type { CorporationNumberResponse, UserDetail } from "@/shared/types";
import { Field, Input, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { handleMaxLength } from "@/shared/utils";
import { useFormContext } from "react-hook-form";

export function CorporationNumberInput() {
  const {
    setError,
    clearErrors,
    register,
    formState: { errors },
  } = useFormContext<UserDetail>();

  const {
    queryData: validateCorpNumber,
    data,
    isLoading: isValidating,
    isError: hasValidationError,
  } = useFetch<CorporationNumberResponse>({
    isInitiallyTriggered: false,
  });

  function validateCorporateNumber(corporationNumber: string) {
    const trimmedNumber = corporationNumber.trim();
    if (!trimmedNumber) return;

    validateCorpNumber({
      url: `corporation-number/${trimmedNumber}`,
    });
  }

  useEffect(() => {
    if (hasValidationError) {
      // Failed during request, doesn't mean the number is invalid
      setError("corporationNumber", {
        type: "manual",
        message: "Failed while validating corporation number",
      });
    }
  }, [hasValidationError, setError]);

  useEffect(() => {
    if (data) {
      if (!data.valid) {
        setError("corporationNumber", {
          type: "manual",
          message: data.message,
        });
      } else {
        clearErrors("corporationNumber");
      }
    }
  }, [data, setError, clearErrors]);

  return (
    <Field.Root
      invalid={Boolean(errors?.corporationNumber) || hasValidationError}
      data-testid="corporation-number-container"
    >
      <Field.Label>Corporation Number</Field.Label>
      <InputGroup
        w="full"
        flex="1"
        endElement={isValidating && <Spinner data-testid="spinner" />}
      >
        <Input
          {...register("corporationNumber", {
            onBlur: (e) => validateCorporateNumber(e.target.value),
          })}
          placeholder="123456789"
          maxLength={9}
          onChange={handleMaxLength}
          disabled={isValidating}
        />
      </InputGroup>
      <Field.ErrorText>{errors?.corporationNumber?.message}</Field.ErrorText>
    </Field.Root>
  );
}
