import type { ValidationResult } from "../types";

/**
 * 驗證台灣營利事業統一編號
 * 格式：8位數字
 * 使用加權檢查碼演算法
 *
 * @param number - 要驗證的統一編號
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateBusinessNumber('12345678');
 * ```
 */
export function validateBusinessNumber(number: string): ValidationResult {
  if (!number || typeof number !== "string") {
    return {
      isValid: false,
      message: "統一編號必須為非空字串",
    };
  }

  const normalized = number.trim();

  // 檢查是否為8位數字
  const pattern = /^\d{8}$/;
  if (!pattern.test(normalized)) {
    return {
      isValid: false,
      message: "統一編號必須為8位數字",
    };
  }

  const digits = normalized.split("").map(Number);
  const weights = [1, 2, 1, 2, 1, 2, 4, 1];

  // 計算加權總和
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    let product = digits[i] * weights[i];

    // 如果乘積為兩位數，將十位數和個位數相加
    if (product >= 10) {
      product = Math.floor(product / 10) + (product % 10);
    }

    sum += product;
  }

  // 特殊情況：第7位數字為7時
  // 如果第7位數字為7且總和除以10的餘數為1，也視為有效
  const isValid = sum % 10 === 0 || (digits[6] === 7 && sum % 10 === 1);

  return {
    isValid,
    message: isValid ? undefined : "統一編號檢查碼錯誤",
  };
}
