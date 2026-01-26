import { validateEInvoiceDonationCode } from "./einvoice-donation-code";

describe("validateEInvoiceDonationCode", () => {
  describe("Valid Donation Codes", () => {
    test("should validate 3-digit donation codes", () => {
      expect(validateEInvoiceDonationCode("123").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("000").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("999").isValid).toBe(true);
    });

    test("should validate 4-digit donation codes", () => {
      expect(validateEInvoiceDonationCode("1234").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("0000").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("9999").isValid).toBe(true);
    });

    test("should validate 5-digit donation codes", () => {
      expect(validateEInvoiceDonationCode("12345").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("00000").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("99999").isValid).toBe(true);
    });

    test("should validate 6-digit donation codes", () => {
      expect(validateEInvoiceDonationCode("123456").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("000000").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("999999").isValid).toBe(true);
    });

    test("should validate 7-digit donation codes", () => {
      expect(validateEInvoiceDonationCode("1234567").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("0000000").isValid).toBe(true);
      expect(validateEInvoiceDonationCode("9999999").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateEInvoiceDonationCode(" 12345 ").isValid).toBe(true);
    });
  });

  describe("Invalid Donation Codes", () => {
    test("should reject codes shorter than 3 digits", () => {
      expect(validateEInvoiceDonationCode("12").isValid).toBe(false);
      expect(validateEInvoiceDonationCode("1").isValid).toBe(false);
    });

    test("should reject codes longer than 7 digits", () => {
      expect(validateEInvoiceDonationCode("12345678").isValid).toBe(false);
      expect(validateEInvoiceDonationCode("123456789").isValid).toBe(false);
    });

    test("should reject non-numeric codes", () => {
      expect(validateEInvoiceDonationCode("12A").isValid).toBe(false);
      expect(validateEInvoiceDonationCode("ABC").isValid).toBe(false);
      expect(validateEInvoiceDonationCode("12-34").isValid).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should reject empty or invalid input", () => {
      expect(validateEInvoiceDonationCode("").isValid).toBe(false);
      expect(validateEInvoiceDonationCode("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateEInvoiceDonationCode(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateEInvoiceDonationCode(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateEInvoiceDonationCode("12");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBe("捐贈碼必須為3至7位數字");

      const result2 = validateEInvoiceDonationCode("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("捐贈碼必須為非空字串");
    });
  });
});
