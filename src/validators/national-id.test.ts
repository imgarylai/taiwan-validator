import { validateNationalId, parseNationalId } from "./national-id";

describe("validateNationalId", () => {
  describe("Validation", () => {
    test("should validate correct National IDs", () => {
      // These are example format IDs (not real person IDs)
      expect(validateNationalId("A123456789").isValid).toBe(true);
      expect(validateNationalId("F223456786").isValid).toBe(true);
      expect(validateNationalId("O123456782").isValid).toBe(true);
    });

    test("should reject invalid National IDs", () => {
      expect(validateNationalId("A123456788").isValid).toBe(false); // Wrong checksum
      expect(validateNationalId("A323456789").isValid).toBe(false); // Invalid gender code
      expect(validateNationalId("A12345678").isValid).toBe(false); // Too short
      expect(validateNationalId("A1234567890").isValid).toBe(false); // Too long
      expect(validateNationalId("AA23456786").isValid).toBe(false); // 2-letter legacy format is not a National ID
    });

    test("should handle case insensitive input", () => {
      expect(validateNationalId("a123456789").isValid).toBe(true);
      expect(validateNationalId("f223456786").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateNationalId(" A123456789 ").isValid).toBe(true);
    });
  });

  describe("Parser (parseNationalId)", () => {
    test("should parse correct National IDs with gender and region", () => {
      const parsed1 = parseNationalId("A123456789");
      expect(parsed1.isValid).toBe(true);
      expect(parsed1.gender).toBe("male");
      expect(parsed1.region).toBe("臺北市");

      const parsed2 = parseNationalId("F223456786");
      expect(parsed2.isValid).toBe(true);
      expect(parsed2.gender).toBe("female");
      expect(parsed2.region).toBe("新北市");
    });

    test("should return isValid: false for invalid IDs", () => {
      const parsed = parseNationalId("A123456788");
      expect(parsed.isValid).toBe(false);
      expect(parsed.gender).toBeUndefined();
      expect(parsed.region).toBeUndefined();
      expect(parsed.message).toBe("無效的身分證字號");
    });

    test("should return isValid: false for empty or non-string inputs", () => {
      const parsed1 = parseNationalId("");
      expect(parsed1.isValid).toBe(false);
      expect(parsed1.message).toBe("身分證字號必須為非空字串");

      // @ts-expect-error Testing invalid input type
      expect(parseNationalId(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(parseNationalId(undefined).isValid).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should reject empty or invalid input", () => {
      expect(validateNationalId("").isValid).toBe(false);
      expect(validateNationalId("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateNationalId(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateNationalId(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateNationalId("A123456788");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBe("無效的身分證字號");

      const result2 = validateNationalId("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("身分證字號必須為非空字串");
    });
  });
});
