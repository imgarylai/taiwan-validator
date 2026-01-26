import { validateEInvoiceMobileBarcode } from "./einvoice-mobile-barcode";

describe("validateEInvoiceMobileBarcode", () => {
  describe("Valid Mobile Barcodes", () => {
    test("should validate correct mobile barcodes", () => {
      expect(validateEInvoiceMobileBarcode("/ABCD123").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/1234567").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/ABC+123").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/ABC-123").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/ABC.123").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/+++++++").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/-------").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/.......").isValid).toBe(true);
    });

    test("should handle case insensitive input", () => {
      expect(validateEInvoiceMobileBarcode("/abcd123").isValid).toBe(true);
      expect(validateEInvoiceMobileBarcode("/AbCd123").isValid).toBe(true);
    });

    test("should handle whitespace", () => {
      expect(validateEInvoiceMobileBarcode(" /ABCD123 ").isValid).toBe(true);
    });
  });

  describe("Invalid Mobile Barcodes", () => {
    test("should reject barcodes not starting with /", () => {
      expect(validateEInvoiceMobileBarcode("ABCD123").isValid).toBe(false);
      expect(validateEInvoiceMobileBarcode("\\ABCD123").isValid).toBe(false);
    });

    test("should reject incorrect length", () => {
      expect(validateEInvoiceMobileBarcode("/ABCD12").isValid).toBe(false); // Too short
      expect(validateEInvoiceMobileBarcode("/ABCD1234").isValid).toBe(false); // Too long
    });

    test("should reject invalid characters", () => {
      expect(validateEInvoiceMobileBarcode("/ABCD@23").isValid).toBe(false);
      expect(validateEInvoiceMobileBarcode("/ABCD#23").isValid).toBe(false);
      expect(validateEInvoiceMobileBarcode("/ABCD$23").isValid).toBe(false);
      expect(validateEInvoiceMobileBarcode("/ABCD*23").isValid).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    test("should reject empty or invalid input", () => {
      expect(validateEInvoiceMobileBarcode("").isValid).toBe(false);
      expect(validateEInvoiceMobileBarcode("   ").isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateEInvoiceMobileBarcode(null).isValid).toBe(false);
      // @ts-expect-error Testing invalid input type
      expect(validateEInvoiceMobileBarcode(undefined).isValid).toBe(false);
    });

    test("should provide meaningful error messages", () => {
      const result1 = validateEInvoiceMobileBarcode("ABCD123");
      expect(result1.isValid).toBe(false);
      expect(result1.message).toBe(
        "手機條碼必須以 / 開頭，後接7個有效字元（A-Z、0-9、+、-、.）",
      );

      const result2 = validateEInvoiceMobileBarcode("");
      expect(result2.isValid).toBe(false);
      expect(result2.message).toBe("手機條碼必須為非空字串");
    });
  });
});
