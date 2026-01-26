import type { ValidationResult } from "../types";

/**
 * 驗證台灣電子發票捐贈碼
 * 格式：3-7位數字
 * 範例：123、12345、1234567
 *
 * 捐贈碼用於將電子發票捐贈給已註冊的慈善機構
 *
 * @param code - 要驗證的捐贈碼
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateEInvoiceDonationCode('123');
 * validateEInvoiceDonationCode('12345');
 * ```
 */
export function validateEInvoiceDonationCode(code: string): ValidationResult {
  if (!code || typeof code !== "string") {
    return {
      isValid: false,
      message: "捐贈碼必須為非空字串",
    };
  }

  const normalized = code.trim();

  // 檢查格式：3-7位數字
  const pattern = /^\d{3,7}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "捐贈碼必須為3至7位數字",
    };
  }

  return {
    isValid: true,
  };
}
