import type { ValidationResult } from "../types";

/**
 * 驗證中華民國（台灣）護照號碼格式
 * 晶片護照與一般護照為 9 碼數字格式（晶片護照通常以 3 開頭）
 *
 * @param passport - 要驗證的護照號碼
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validatePassport('312345678'); // { isValid: true }
 * ```
 */
export function validatePassport(passport: string): ValidationResult {
  if (!passport || typeof passport !== "string") {
    return {
      isValid: false,
      message: "護照號碼必須為非空字串",
    };
  }

  const normalized = passport.trim();

  // 驗證 9 碼數字
  const pattern = /^\d{9}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "護照號碼格式必須為9位數字",
    };
  }

  return {
    isValid: true,
  };
}
