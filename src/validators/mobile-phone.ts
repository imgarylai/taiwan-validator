import type { ValidationResult } from "../types";

/**
 * 驗證台灣手機號碼
 * 格式：09XXXXXXXX（10位數字，以09開頭）
 *
 * @param phone - 要驗證的手機號碼
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateMobilePhone('0912345678');
 * validateMobilePhone('0912-345-678'); // 含分隔符號
 * ```
 */
export function validateMobilePhone(phone: string): ValidationResult {
  if (!phone || typeof phone !== "string") {
    return {
      isValid: false,
      message: "手機號碼必須為非空字串",
    };
  }

  // 移除常見的分隔符號（空格、破折號、括號）
  const normalized = phone.trim().replace(/[\s\-()]/g, "");

  // 檢查是否符合台灣手機號碼格式
  // 以09開頭且總共10位數字
  const pattern = /^09\d{8}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "手機號碼必須以09開頭且為10位數字",
    };
  }

  return {
    isValid: true,
  };
}
