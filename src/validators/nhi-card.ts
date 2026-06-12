import type { ValidationResult } from "../types";

/**
 * 驗證台灣國民健康保險卡（健保卡）卡號格式
 * 格式為 12 碼數字（可包含減號或空格，如 0000 1234 5678）
 *
 * @param cardNumber - 要驗證的健保卡卡號
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateNHICard('0000 1234 5678'); // { isValid: true }
 * validateNHICard('000012345678');   // { isValid: true }
 * ```
 */
export function validateNHICard(cardNumber: string): ValidationResult {
  if (!cardNumber || typeof cardNumber !== "string") {
    return {
      isValid: false,
      message: "健保卡號必須為非空字串",
    };
  }

  // 去除空格與減號
  const normalized = cardNumber.replace(/[-\s]/g, "");

  const pattern = /^\d{12}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "健保卡號格式必須為12碼數字",
    };
  }

  return {
    isValid: true,
  };
}
