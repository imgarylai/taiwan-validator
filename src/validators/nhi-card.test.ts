import { validateNHICard } from "./nhi-card";

describe("validateNHICard", () => {
  test("should validate correct NHI card numbers", () => {
    expect(validateNHICard("0000 1234 5678").isValid).toBe(true);
    expect(validateNHICard("000012345678").isValid).toBe(true);
    expect(validateNHICard("0000-1234-5678").isValid).toBe(true);
  });

  test("should reject invalid NHI card numbers", () => {
    expect(validateNHICard("00001234567").isValid).toBe(false); // Too short (11 digits)
    expect(validateNHICard("0000123456789").isValid).toBe(false); // Too long (13 digits)
    expect(validateNHICard("00001234567a").isValid).toBe(false); // Non-numeric
  });

  test("should reject empty or non-string inputs", () => {
    expect(validateNHICard("").isValid).toBe(false);
    // @ts-expect-error Testing invalid input type
    expect(validateNHICard(null).isValid).toBe(false);
  });
});
