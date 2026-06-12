import type { ValidationResult } from "../types";

/**
 * 驗證台灣統一發票號碼格式
 * 格式為 2 碼英文開頭 + 8 碼數字（可包含減號或空格，如 AB-12345678 或 AB 12345678）
 *
 * @param invoice - 要驗證的發票號碼
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateUniformInvoice('AB-12345678'); // { isValid: true }
 * validateUniformInvoice('AB12345678');  // { isValid: true }
 * ```
 */
export function validateUniformInvoice(invoice: string): ValidationResult {
  if (!invoice || typeof invoice !== "string") {
    return {
      isValid: false,
      message: "發票號碼必須為非空字串",
    };
  }

  // 去除空格與減號並轉大寫
  const normalized = invoice.replace(/[-\s]/g, "").toUpperCase();

  const pattern = /^[A-Z]{2}\d{8}$/;

  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "發票號碼格式必須為2碼英文與8碼數字",
    };
  }

  return {
    isValid: true,
  };
}
