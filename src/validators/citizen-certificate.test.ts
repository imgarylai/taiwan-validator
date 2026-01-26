import { validateCitizenCertificate } from "./citizen-certificate";

describe("validateCitizenCertificate", () => {
  describe("Valid Citizen Certificates", () => {
    test("should validate correct citizen certificate numbers", () => {
      expect(validateCitizenCertificate("AB12345678901234").isValid).toBe(true);
      expect(validateCitizenCertificate("CD98765432109876").isValid).toBe(true);
      expect(validateCitizenCertificate("XY11111111111111").isValid).toBe(true);
    });

    test("should handle case insensitive input", () => {
      expect(validateCitizenCertificate("ab12345678901234").isValid).toBe(true);
      expect(validateCitizenCertificate("Ab12345678901234").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateCitizenCertificate(" AB12345678901234 ").isValid).toBe(
        true,
      );
    });
  });

  describe("Invalid Citizen Certificates", () => {
    test("should reject incorrect length", () => {
      expect(validateCitizenCertificate("AB1234567890123").isValid).toBe(false); // Too short
      expect(validateCitizenCertificate("AB123456789012345").isValid).toBe(
        false,
      ); // Too long
    });

    test("should reject incorrect format", () => {
      expect(validateCitizenCertificate("A12345678901234").isValid).toBe(false); // Only 1 letter
      expect(validateCitizenCertificate("ABC1234567890123").isValid).toBe(
        false,
      ); // 3 letters
      expect(validateCitizenCertificate("1212345678901234").isValid).toBe(
        false,
      ); // Starts with digits
    });

    test("should reject non-alphanumeric characters", () => {
      expect(validateCitizenCertificate("AB-1234567890123").isValid).toBe(
        false,
      );
      expect(validateCitizenCertificate("AB 1234567890123").isValid).toBe(
        false,
      );
    });
  });

  describe("Edge Cases", () => {
    test("should reject empty or invalid input", () => {
      expect(validateCitizenCertificate("").isValid).toBe(false);
      expect(validateCitizenCertificate("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateCitizenCertificate(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateCitizenCertificate(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateCitizenCertificate("AB123");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBe(
        "自然人憑證編號必須為2個英文字母加上14位數字",
      );

      const result2 = validateCitizenCertificate("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("自然人憑證編號必須為非空字串");
    });
  });
});
