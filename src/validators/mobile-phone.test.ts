import { validateMobilePhone } from "./mobile-phone";

describe("validateMobilePhone", () => {
  describe("Valid Mobile Phone Numbers", () => {
    test("should validate correct mobile phone numbers", () => {
      expect(validateMobilePhone("0912345678").isValid).toBe(true);
      expect(validateMobilePhone("0923456789").isValid).toBe(true);
      expect(validateMobilePhone("0934567890").isValid).toBe(true);
      expect(validateMobilePhone("0945678901").isValid).toBe(true);
      expect(validateMobilePhone("0956789012").isValid).toBe(true);
      expect(validateMobilePhone("0967890123").isValid).toBe(true);
      expect(validateMobilePhone("0978901234").isValid).toBe(true);
      expect(validateMobilePhone("0989012345").isValid).toBe(true);
    });

    test("should validate phone numbers with separators", () => {
      expect(validateMobilePhone("0912-345-678").isValid).toBe(true);
      expect(validateMobilePhone("0912 345 678").isValid).toBe(true);
      expect(validateMobilePhone("(0912) 345-678").isValid).toBe(true);
      expect(validateMobilePhone("0912-345678").isValid).toBe(true);
    });
  });

  describe("Invalid Mobile Phone Numbers", () => {
    test("should reject numbers not starting with 09", () => {
      expect(validateMobilePhone("0812345678").isValid).toBe(false);
      expect(validateMobilePhone("0712345678").isValid).toBe(false);
      expect(validateMobilePhone("1912345678").isValid).toBe(false);
    });

    test("should reject incorrect length", () => {
      expect(validateMobilePhone("091234567").isValid).toBe(false); // Too short
      expect(validateMobilePhone("09123456789").isValid).toBe(false); // Too long
    });

    test("should reject non-numeric input (excluding valid separators)", () => {
      expect(validateMobilePhone("091234567A").isValid).toBe(false);
      expect(validateMobilePhone("ABCDEFGHIJ").isValid).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should handle whitespace", () => {
      expect(validateMobilePhone(" 0912345678 ").isValid).toBe(true);
      expect(validateMobilePhone("0912 345 678").isValid).toBe(true);
    });

    test("should reject empty or invalid input", () => {
      expect(validateMobilePhone("").isValid).toBe(false);
      expect(validateMobilePhone("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateMobilePhone(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateMobilePhone(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateMobilePhone("091234567");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBe("手機號碼必須以09開頭且為10位數字");

      const result2 = validateMobilePhone("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("手機號碼必須為非空字串");
    });
  });
});
