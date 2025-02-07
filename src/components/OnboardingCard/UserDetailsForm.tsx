import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Input,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuRotateCcw } from "react-icons/lu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup } from "@/components/ui/input-group";
import { handleMaxLength } from "@/shared/utils";
import { CorporationNumberInput } from "../CorporationNumberInput/CorporationNumberInput";
import type { ResponseError, UserDetail } from "@/shared/types";
import { useFetch } from "@/api";

const missingError = "This field is required";
const longError = "Should have less than 50 characters";

const userDetailSchema = z.object({
  firstName: z.string().trim().min(1, missingError).max(50, longError),
  lastName: z.string().trim().min(1, missingError).max(50, longError),
  phone: z
    .number({
      required_error: missingError,
      invalid_type_error: missingError,
    })
    .refine(
      (val) => `${val}`.length === 10,
      "Phone Number must be 10 digit long",
    ),
  corporationNumber: z
    .string()
    .trim()
    .min(1, missingError)
    .max(9, "Corporation Number must be 9 digit long"),
});

export function UserDetailsForm({
  handleBack,
}: {
  handleBack: Dispatch<SetStateAction<void>>;
}) {
  const formMethods = useForm<UserDetail>({
    resolver: zodResolver(userDetailSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const {
    queryData: sendUserDetails,
    data,
    isLoading,
    isError,
  } = useFetch<ResponseError>({
    isInitiallyTriggered: false,
  });

  function onSubmit(formData: UserDetail) {
    const transformedData = {
      ...formData,
      phone: `+1${formData.phone}`,
    };

    sendUserDetails({
      url: "profile-details",
      method: "POST",
      body: transformedData,
    });
  }

  return (
    <FormProvider {...formMethods}>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        data-state="open"
        _open={{
          animation: "fade-in 500ms ease-out",
        }}
        data-testid="user-details-form"
      >
        <Card.Header>
          <VStack mt="2" alignItems="flex-start">
            <HStack w="full" justify="space-between">
              <Button
                onClick={() => handleBack()}
                variant="plain"
                size="xs"
                padding="0"
              >
                <LuArrowLeft /> Return
              </Button>

              <Button
                onClick={() => reset()}
                variant="plain"
                size="xs"
                padding="0"
              >
                Reset <LuRotateCcw />
              </Button>
            </HStack>
            <Card.Title>User Details</Card.Title>
          </VStack>
        </Card.Header>
        <Card.Body gap="6">
          <SimpleGrid columns={[null, null, 2]} gap="4">
            <Field.Root
              invalid={Boolean(errors?.firstName)}
              data-testid="first-name-container"
            >
              <Field.Label>First Name</Field.Label>
              <Input {...register("firstName")} placeholder="John" />
              <Field.ErrorText>{errors?.firstName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              invalid={Boolean(errors?.lastName)}
              data-testid="last-name-container"
            >
              <Field.Label>Last Name</Field.Label>
              <Input {...register("lastName")} placeholder="Doe" />
              <Field.ErrorText>{errors?.lastName?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <Field.Root
            invalid={Boolean(errors?.phone)}
            data-testid="phone-number-container"
          >
            <Field.Label>Phone Number</Field.Label>
            <InputGroup w="full" flex="1" startElement="+1">
              <Input
                {...register("phone", { maxLength: 10, valueAsNumber: true })}
                type="tel"
                placeholder="1234567890"
                maxLength={10}
                onChange={handleMaxLength}
              />
            </InputGroup>
            <Field.ErrorText>{errors?.phone?.message}</Field.ErrorText>
          </Field.Root>

          <CorporationNumberInput />
        </Card.Body>
        <Card.Footer>
          <VStack width="full">
            <Button type="submit" width="full" disabled={isLoading}>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Submit <LuArrowRight />
                </>
              )}
            </Button>
            {(isError || data?.message) && (
              <Box
                as="span"
                color="red"
                fontSize="sm"
                data-testid="validation-error"
              >
                {data?.message ??
                  "Something went wrong when trying to send your data."}
              </Box>
            )}
          </VStack>
        </Card.Footer>
      </Box>
    </FormProvider>
  );
}
