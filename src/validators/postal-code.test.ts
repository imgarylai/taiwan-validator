import { validatePostalCode } from "./postal-code";

describe("validatePostalCode", () => {
  test("should validate correct postal codes", () => {
    // 3 digits
    expect(validatePostalCode("100").isValid).toBe(true);
    expect(validatePostalCode(100).isValid).toBe(true);
    
    // 5 digits
    expect(validatePostalCode("100-01").isValid).toBe(true);
    expect(validatePostalCode("10001").isValid).toBe(true);
    
    // 6 digits
    expect(validatePostalCode("100001").isValid).toBe(true);
    expect(validatePostalCode("100-001").isValid).toBe(true);
  });

  test("should reject invalid postal codes", () => {
    expect(validatePostalCode("001").isValid).toBe(false); // First digit cannot be 0
    expect(validatePostalCode("10").isValid).toBe(false); // Too short
    expect(validatePostalCode("1000").isValid).toBe(false); // 4 digits is not valid
    expect(validatePostalCode("1000001").isValid).toBe(false); // Too long (7 digits)
  });

  test("should reject empty or null inputs", () => {
    // @ts-expect-error Testing invalid input type
    expect(validatePostalCode(null).isValid).toBe(false);
    // @ts-expect-error Testing invalid input type
    expect(validatePostalCode(undefined).isValid).toBe(false);
  });
});
