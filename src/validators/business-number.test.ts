import { validateBusinessNumber } from "./business-number";

describe("validateBusinessNumber", () => {
  describe("Valid Business Numbers", () => {
    test("should validate correct business numbers", () => {
      expect(validateBusinessNumber("12345676").isValid).toBe(true);
      expect(validateBusinessNumber("53212539").isValid).toBe(true);
      expect(validateBusinessNumber("04595257").isValid).toBe(true);
    });

    test("should validate business numbers with 7th digit = 7 (special case)", () => {
      // When 7th digit is 7, sum % 10 can be 0 or 1
      expect(validateBusinessNumber("12345676").isValid).toBe(true);
      expect(validateBusinessNumber("12345677").isValid).toBe(true);
    });
  });

  describe("Invalid Business Numbers", () => {
    test("should reject invalid business numbers", () => {
      expect(validateBusinessNumber("12345670").isValid).toBe(false); // Wrong checksum
      expect(validateBusinessNumber("12345671").isValid).toBe(false); // Wrong checksum
    });

    test("should reject incorrect length", () => {
      expect(validateBusinessNumber("1234567").isValid).toBe(false); // Too short
      expect(validateBusinessNumber("123456789").isValid).toBe(false); // Too long
    });

    test("should reject non-numeric input", () => {
      expect(validateBusinessNumber("1234567A").isValid).toBe(false);
      expect(validateBusinessNumber("ABCDEFGH").isValid).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should handle whitespace", () => {
      expect(validateBusinessNumber(" 12345676 ").isValid).toBe(true);
    });

    test("should reject empty or invalid input", () => {
      expect(validateBusinessNumber("").isValid).toBe(false);
      expect(validateBusinessNumber("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateBusinessNumber(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateBusinessNumber(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateBusinessNumber("1234567");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBe("統一編號必須為8位數字");

      const result2 = validateBusinessNumber("12345670");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("統一編號檢查碼錯誤");

      const result3 = validateBusinessNumber("");
      expect(result3.isValid).toBe(false);
      expect(result3.message).toBe("統一編號必須為非空字串");
    });
  });
});
