import type { ValidationResult } from "../types";

/**
 * 驗證台灣電子發票手機條碼
 * 格式：/ + 7個字元（大寫英文字母、數字、+、-、.）
 * 範例：/ABCD123
 *
 * 手機條碼用於將電子發票儲存在手機載具中
 *
 * @param barcode - 要驗證的手機條碼
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateEInvoiceMobileBarcode('/ABCD123');
 * validateEInvoiceMobileBarcode('/1234567');
 * ```
 */
export function validateEInvoiceMobileBarcode(
  barcode: string,
): ValidationResult {
  if (!barcode || typeof barcode !== "string") {
    return {
      isValid: false,
      message: "手機條碼必須為非空字串",
    };
  }

  const normalized = barcode.trim().toUpperCase();

  // 檢查格式：以 / 開頭，後接7個字元
  // 有效字元：A-Z、0-9、+、-、.
  const pattern = /^\/[A-Z0-9+.-]{7}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "手機條碼必須以 / 開頭，後接7個有效字元（A-Z、0-9、+、-、.）",
    };
  }

  return {
    isValid: true,
  };
}
