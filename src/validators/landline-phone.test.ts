import { validateLandlinePhone } from "./landline-phone";

describe("validateLandlinePhone", () => {
  test("should validate correct landline phone numbers", () => {
    // 10 digits total (2-digit area code + 8-digit local)
    expect(validateLandlinePhone("02-1234-5678").isValid).toBe(true);
    expect(validateLandlinePhone("(02) 1234 5678").isValid).toBe(true);
    expect(validateLandlinePhone("0212345678").isValid).toBe(true);
    expect(validateLandlinePhone("04-1234-5678").isValid).toBe(true);

    // 9 digits total (3-digit area code + 6-digit local, or 2-digit area code + 7-digit local)
    expect(validateLandlinePhone("03-123-4567").isValid).toBe(true);
    expect(validateLandlinePhone("037-123456").isValid).toBe(true);
    expect(validateLandlinePhone("082-123456").isValid).toBe(true);
    expect(validateLandlinePhone("0836-12345").isValid).toBe(true); // 4-digit area code + 5-digit local
  });

  test("should reject numbers with wrong lengths for the specific area code", () => {
    expect(validateLandlinePhone("02-123-4567").isValid).toBe(false); // 02 requires 10 digits, this is 9
    expect(validateLandlinePhone("03-1234-5678").isValid).toBe(false); // 03 requires 9 digits, this is 10
    expect(validateLandlinePhone("0836-123456").isValid).toBe(false); // 0836 requires 9 digits, this is 10
  });

  test("should reject invalid area codes", () => {
    expect(validateLandlinePhone("09-1234-5678").isValid).toBe(false); // 09 is mobile, not landline area code
    expect(validateLandlinePhone("01-1234-5678").isValid).toBe(false); // 01 is not a valid area code
  });

  test("should reject empty or non-string inputs", () => {
    expect(validateLandlinePhone("").isValid).toBe(false);
    // @ts-expect-error Testing invalid input type
    expect(validateLandlinePhone(null).isValid).toBe(false);
  });
});
