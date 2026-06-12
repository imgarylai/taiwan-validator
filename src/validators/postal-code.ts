import type { ValidationResult } from "../types";

/**
 * 驗證台灣郵遞區號格式
 * 支援 3 碼、5 碼 (3+2) 及新式 6 碼 (3+3) 格式（可包含減號，如 100-001 或 100001）
 * 第一碼必須為 1-9
 *
 * @param code - 要驗證的郵遞區號
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validatePostalCode('100');     // { isValid: true }
 * validatePostalCode('100-01');  // { isValid: true }
 * validatePostalCode('100001');  // { isValid: true }
 * ```
 */
export function validatePostalCode(code: string | number): ValidationResult {
  if (code === null || code === undefined) {
    return {
      isValid: false,
      message: "郵遞區號必須為非空字串或數字",
    };
  }

  const strCode = String(code).trim().replace(/[-\s]/g, "");

  // 驗證格式：3 碼、5 碼或 6 碼，且首碼為 1-9
  const pattern = /^[1-9]\d{2}$|^[1-9]\d{4}$|^[1-9]\d{5}$/;

  if (!pattern.test(strCode)) {
    return {
      isValid: false,
      message: "郵遞區號格式必須為首碼非0的3碼、5碼或6碼數字",
    };
  }

  return {
    isValid: true,
  };
}
