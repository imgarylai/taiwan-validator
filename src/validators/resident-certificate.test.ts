import { validateResidentCertificate } from "./resident-certificate";

describe("validateResidentCertificate", () => {
  describe("Old Format", () => {
    test("should validate correct old format Resident Certificates", () => {
      // These are example format IDs (not real person IDs)
      expect(validateResidentCertificate("A823456783", "old").isValid).toBe(
        true,
      );
      expect(validateResidentCertificate("B923456786", "old").isValid).toBe(
        true,
      );
      expect(validateResidentCertificate("C823456785", "old").isValid).toBe(
        true,
      );
      expect(validateResidentCertificate("D923456788", "old").isValid).toBe(
        true,
      );
    });

    test("should reject invalid old format Resident Certificates", () => {
      expect(validateResidentCertificate("A823456780", "old").isValid).toBe(
        false,
      ); // Wrong checksum
      expect(validateResidentCertificate("E823456783", "old").isValid).toBe(
        false,
      ); // Invalid first letter
      expect(validateResidentCertificate("A723456783", "old").isValid).toBe(
        false,
      ); // Invalid second digit (must be 8 or 9)
    });

    test("should handle case insensitive input", () => {
      expect(validateResidentCertificate("a823456783", "old").isValid).toBe(
        true,
      );
      expect(validateResidentCertificate("b923456786", "old").isValid).toBe(
        true,
      );
    });

    test("should handle whitespace", () => {
      expect(validateResidentCertificate(" A823456783 ", "old").isValid).toBe(
        true,
      );
    });
  });

  describe("New Format", () => {
    test("should validate correct new format Resident Certificates", () => {
      // These are example format IDs (not real person IDs)
      expect(validateResidentCertificate("AA23456786", "new").isValid).toBe(
        true,
      );
      expect(validateResidentCertificate("AB23456789", "new").isValid).toBe(
        true,
      );
    });

    test("should reject invalid new format Resident Certificates", () => {
      expect(validateResidentCertificate("AA23456780", "new").isValid).toBe(
        false,
      ); // Wrong checksum
      expect(validateResidentCertificate("AA2345678", "new").isValid).toBe(
        false,
      ); // Too short
    });

    test("should handle case insensitive input", () => {
      expect(validateResidentCertificate("aa23456786", "new").isValid).toBe(
        true,
      );
    });

    test("should handle whitespace", () => {
      expect(validateResidentCertificate(" AB23456789 ", "new").isValid).toBe(
        true,
      );
    });
  });

  describe("Auto-detect Format", () => {
    test("should auto-detect and validate old format", () => {
      expect(validateResidentCertificate("A823456783").isValid).toBe(true);
    });

    test("should auto-detect and reject invalid old format", () => {
      const result = validateResidentCertificate("A823456780");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的舊式居留證號");
    });

    test("should auto-detect and validate new format", () => {
      expect(validateResidentCertificate("AA23456786").isValid).toBe(true);
    });

    test("should auto-detect and reject invalid new format", () => {
      const result = validateResidentCertificate("AA23456780");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的新式居留證號");
    });

    test("should reject completely invalid formats", () => {
      expect(validateResidentCertificate("12345678").isValid).toBe(false);
      expect(validateResidentCertificate("ABCDEFGH").isValid).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should reject empty or invalid input", () => {
      expect(validateResidentCertificate("").isValid).toBe(false);
      expect(validateResidentCertificate("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateResidentCertificate(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateResidentCertificate(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateResidentCertificate("A823456780", "old");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBeDefined();

      const result2 = validateResidentCertificate("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("居留證號必須為非空字串");
    });
  });
});
