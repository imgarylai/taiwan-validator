import type { ValidationResult } from "../types";

/**
 * 驗證台灣自然人憑證編號
 * 格式：2個大寫英文字母 + 14位數字
 * 範例：AB12345678901234
 *
 * @param certNumber - 要驗證的自然人憑證編號
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateCitizenCertificate('AB12345678901234');
 * ```
 */
export function validateCitizenCertificate(
  certNumber: string,
): ValidationResult {
  if (!certNumber || typeof certNumber !== "string") {
    return {
      isValid: false,
      message: "自然人憑證編號必須為非空字串",
    };
  }

  const normalized = certNumber.trim().toUpperCase();

  // 檢查格式：2個字母 + 14位數字
  const pattern = /^[A-Z]{2}\d{14}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "自然人憑證編號必須為2個英文字母加上14位數字",
    };
  }

  return {
    isValid: true,
  };
}
