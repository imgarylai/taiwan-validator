import { validateResidentCertificate, parseResidentCertificate } from "./resident-certificate";

describe("validateResidentCertificate", () => {
  describe("New Format (1 letter + 9 digits, e.g. A823456783)", () => {
    test("should validate correct new format Resident Certificates", () => {
      expect(validateResidentCertificate("A823456783", "new").isValid).toBe(true);
      expect(validateResidentCertificate("B923456786", "new").isValid).toBe(true);
    });

    test("should reject invalid new format Resident Certificates", () => {
      expect(validateResidentCertificate("A823456780", "new").isValid).toBe(false); // Wrong checksum
      expect(validateResidentCertificate("E723456783", "new").isValid).toBe(false); // Invalid second digit (must be 8 or 9)
    });

    test("should handle case insensitive input", () => {
      expect(validateResidentCertificate("a823456783", "new").isValid).toBe(true);
      expect(validateResidentCertificate("b923456786", "new").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateResidentCertificate(" A823456783 ", "new").isValid).toBe(true);
    });
  });

  describe("Old Format (2 letters + 8 digits, e.g. AB12345677)", () => {
    test("should validate correct old format Resident Certificates", () => {
      expect(validateResidentCertificate("AB12345677", "old").isValid).toBe(true); // Female non-citizen
      expect(validateResidentCertificate("AC12345679", "old").isValid).toBe(true); // Male foreigner
      expect(validateResidentCertificate("AD12345671", "old").isValid).toBe(true); // Female foreigner
      expect(validateResidentCertificate("AA12345675", "old").isValid).toBe(true); // Male non-citizen
    });

    test("should reject invalid old format Resident Certificates", () => {
      expect(validateResidentCertificate("AB12345678", "old").isValid).toBe(false); // Wrong checksum
      expect(validateResidentCertificate("AE12345678", "old").isValid).toBe(false); // Invalid second letter (must be A-D)
    });

    test("should handle case insensitive input", () => {
      expect(validateResidentCertificate("ab12345677", "old").isValid).toBe(true);
    });
  });

  describe("Auto-detect Format", () => {
    test("should auto-detect and validate old format", () => {
      expect(validateResidentCertificate("AB12345677").isValid).toBe(true);
    });

    test("should auto-detect and reject invalid old format", () => {
      const result = validateResidentCertificate("AB12345678");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的舊式居留證號");
    });

    test("should auto-detect and validate new format", () => {
      expect(validateResidentCertificate("A823456783").isValid).toBe(true);
    });

    test("should auto-detect and reject invalid new format", () => {
      const result = validateResidentCertificate("A823456780");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的新式居留證號");
    });

    test("should reject completely invalid formats", () => {
      expect(validateResidentCertificate("12345678").isValid).toBe(false);
      expect(validateResidentCertificate("ABCDEFGH").isValid).toBe(false);
    });
  });

  describe("Parser (parseResidentCertificate)", () => {
    test("should parse new format Resident Certificates", () => {
      const parsed = parseResidentCertificate("A823456783");
      expect(parsed.isValid).toBe(true);
      expect(parsed.format).toBe("new");
      expect(parsed.gender).toBe("male");
      expect(parsed.region).toBe("臺北市");
      expect(parsed.identityType).toBe("foreigner");
    });

    test("should parse old format Resident Certificates", () => {
      const parsed1 = parseResidentCertificate("AB12345677");
      expect(parsed1.isValid).toBe(true);
      expect(parsed1.format).toBe("old");
      expect(parsed1.gender).toBe("female");
      expect(parsed1.region).toBe("臺北市");
      expect(parsed1.identityType).toBe("non-citizen");

      const parsed2 = parseResidentCertificate("AC12345679");
      expect(parsed2.isValid).toBe(true);
      expect(parsed2.format).toBe("old");
      expect(parsed2.gender).toBe("male");
      expect(parsed2.region).toBe("臺北市");
      expect(parsed2.identityType).toBe("foreigner");
    });

    test("should return isValid: false for invalid resident certificates", () => {
      const parsed1 = parseResidentCertificate("A823456780");
      expect(parsed1.isValid).toBe(false);
      expect(parsed1.format).toBeUndefined();
      expect(parsed1.message).toBe("無效的新式居留證號");

      const parsed2 = parseResidentCertificate("AB12345678");
      expect(parsed2.isValid).toBe(false);
      expect(parsed2.format).toBeUndefined();
      expect(parsed2.message).toBe("無效的舊式居留證號");
    });

    test("should parse female new format Resident Certificates", () => {
      const parsed = parseResidentCertificate("B923456786");
      expect(parsed.isValid).toBe(true);
      expect(parsed.format).toBe("new");
      expect(parsed.gender).toBe("female");
    });

    test("should return isValid: false for empty, non-string, or invalid formatted inputs", () => {
      const parsed1 = parseResidentCertificate("");
      expect(parsed1.isValid).toBe(false);
      expect(parsed1.message).toBe("居留證號必須為非空字串");

      // @ts-expect-error Testing invalid input type
      expect(parseResidentCertificate(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(parseResidentCertificate(undefined).isValid).toBe(false);

      const parsed2 = parseResidentCertificate("12345678");
      expect(parsed2.isValid).toBe(false);
      expect(parsed2.message).toBe("無效的居留證號格式");
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
      const result1 = validateResidentCertificate("A823456780", "new");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBeDefined();

      const result2 = validateResidentCertificate("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("居留證號必須為非空字串");
    });
  });
});
