import { validatePassport } from "./passport";

describe("validatePassport", () => {
  test("should validate correct passport numbers", () => {
    expect(validatePassport("312345678").isValid).toBe(true);
    expect(validatePassport("123456789").isValid).toBe(true);
  });

  test("should reject invalid passport numbers", () => {
    expect(validatePassport("12345678").isValid).toBe(false); // Too short (8 digits)
    expect(validatePassport("1234567890").isValid).toBe(false); // Too long (10 digits)
    expect(validatePassport("12345678a").isValid).toBe(false); // Non-numeric
  });

  test("should reject empty or non-string inputs", () => {
    expect(validatePassport("").isValid).toBe(false);
    // @ts-expect-error Testing invalid input type
    expect(validatePassport(null).isValid).toBe(false);
  });
});
