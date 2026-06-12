import { validateUniformInvoice } from "./uniform-invoice";

describe("validateUniformInvoice", () => {
  test("should validate correct invoice numbers", () => {
    expect(validateUniformInvoice("AB-12345678").isValid).toBe(true);
    expect(validateUniformInvoice("ab-12345678").isValid).toBe(true);
    expect(validateUniformInvoice("AB12345678").isValid).toBe(true);
    expect(validateUniformInvoice("AB 12345678").isValid).toBe(true);
  });

  test("should reject invalid invoice numbers", () => {
    expect(validateUniformInvoice("A-12345678").isValid).toBe(false); // Only 1 letter
    expect(validateUniformInvoice("ABC-12345678").isValid).toBe(false); // 3 letters
    expect(validateUniformInvoice("AB-1234567").isValid).toBe(false); // 7 digits
    expect(validateUniformInvoice("AB-123456789").isValid).toBe(false); // 9 digits
    expect(validateUniformInvoice("1234567890").isValid).toBe(false); // No letters
  });

  test("should reject empty or non-string inputs", () => {
    expect(validateUniformInvoice("").isValid).toBe(false);
    // @ts-expect-error Testing invalid input type
    expect(validateUniformInvoice(null).isValid).toBe(false);
  });
});
