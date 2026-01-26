import { validateNationalId } from "./national-id";

describe("validateNationalId", () => {
  describe("Old Format", () => {
    test("should validate correct old format National IDs", () => {
      // These are example format IDs (not real person IDs)
      expect(validateNationalId("A123456789", "old").isValid).toBe(true);
      expect(validateNationalId("F223456786", "old").isValid).toBe(true);
      expect(validateNationalId("O123456782", "old").isValid).toBe(true);
    });

    test("should reject invalid old format National IDs", () => {
      expect(validateNationalId("A123456788", "old").isValid).toBe(false); // Wrong checksum
      expect(validateNationalId("A323456789", "old").isValid).toBe(false); // Invalid gender code
      expect(validateNationalId("A12345678", "old").isValid).toBe(false); // Too short
      expect(validateNationalId("A1234567890", "old").isValid).toBe(false); // Too long
    });

    test("should handle case insensitive input", () => {
      expect(validateNationalId("a123456789", "old").isValid).toBe(true);
      expect(validateNationalId("f223456786", "old").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateNationalId(" A123456789 ", "old").isValid).toBe(true);
    });
  });

  describe("New Format", () => {
    test("should validate correct new format National IDs", () => {
      // These are example format IDs (not real person IDs)
      expect(validateNationalId("AA23456786", "new").isValid).toBe(true);
      expect(validateNationalId("AB23456789", "new").isValid).toBe(true);
    });

    test("should reject invalid new format National IDs", () => {
      expect(validateNationalId("AA12345677", "new").isValid).toBe(false); // Wrong checksum
      expect(validateNationalId("AA1234567", "new").isValid).toBe(false); // Too short
      expect(validateNationalId("AA123456789", "new").isValid).toBe(false); // Too long
    });

    test("should handle case insensitive input", () => {
      expect(validateNationalId("aa23456786", "new").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateNationalId(" AB23456789 ", "new").isValid).toBe(true);
    });
  });

  describe("Auto-detect Format", () => {
    test("should auto-detect and validate old format", () => {
      expect(validateNationalId("A123456789").isValid).toBe(true);
      expect(validateNationalId("F223456786").isValid).toBe(true);
    });

    test("should auto-detect and reject invalid old format", () => {
      const result = validateNationalId("A123456780");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的舊式身分證字號");
    });

    test("should auto-detect and validate new format", () => {
      expect(validateNationalId("AA23456786").isValid).toBe(true);
    });

    test("should auto-detect and reject invalid new format", () => {
      const result = validateNationalId("AA23456780");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的新式身分證字號");
    });

    test("should reject completely invalid formats", () => {
      expect(validateNationalId("12345678").isValid).toBe(false);
      expect(validateNationalId("ABCDEFGH").isValid).toBe(false);
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
      const result1 = validateNationalId("A123456788", "old");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBeDefined();

      const result2 = validateNationalId("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("身分證字號必須為非空字串");
    });
  });
});
