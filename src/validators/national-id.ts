import type { ValidationResult, NationalIdType, NationalIdInfo } from "../types";
import { LETTER_MAPPING, REGION_MAPPING } from "./shared";

/**
 * 驗證台灣身分證字號格式與檢查碼（1個字母 + 9個數字）
 * 格式：A123456789
 * - 第一個字元：地區代碼（字母）
 * - 第二個字元：性別（1 = 男性，2 = 女性）
 * - 最後一個字元：檢查碼
 */
function validateFormatAndChecksum(id: string): boolean {
  const pattern = /^[A-Z][12]\d{8}$/;
  if (!pattern.test(id)) {
    return false;
  }

  const letter = id[0] as string;
  const numbers = id.slice(1);

  const letterValue = LETTER_MAPPING[letter] as number;

  const d1 = Math.floor(letterValue / 10);
  const d2 = letterValue % 10;

  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
  const digits = [d1, d2, ...numbers.split("").map(Number)];

  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index]!,
    0,
  );

  return sum % 10 === 0;
}

/**
 * 驗證台灣身分證字號（身分證字號皆為「1個字母 + 9個數字」格式）
 * @param id - 要驗證的身分證字號
 * @param _format - 可選（為維持相容性保留）：指定格式類型
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateNationalId('A123456789');
 * ```
 */
export function validateNationalId(
  id: string,
  _format?: NationalIdType,
): ValidationResult {
  if (!id || typeof id !== "string") {
    return {
      isValid: false,
      message: "身分證字號必須為非空字串",
    };
  }

  const normalizedId = id.trim().toUpperCase();

  const isValid = validateFormatAndChecksum(normalizedId);

  return {
    isValid,
    message: isValid ? undefined : "無效的身分證字號",
  };
}

/**
 * 解析台灣身分證字號資訊（性別、發證地區）
 * @param id - 要解析的身分證字號
 * @returns 解析結果，包含驗證狀態及相關欄位
 *
 * @example
 * ```typescript
 * parseNationalId('A123456789');
 * // 輸出: { isValid: true, gender: 'male', region: '臺北市' }
 * ```
 */
export function parseNationalId(id: string): NationalIdInfo {
  if (!id || typeof id !== "string") {
    return {
      isValid: false,
      message: "身分證字號必須為非空字串",
    };
  }

  const normalizedId = id.trim().toUpperCase();

  const isValid = validateFormatAndChecksum(normalizedId);
  if (!isValid) {
    return {
      isValid: false,
      message: "無效的身分證字號",
    };
  }

  const firstLetter = normalizedId[0] as string;
  const genderDigit = normalizedId[1] as string;

  const gender = genderDigit === "1" ? "male" : "female";
  const region = REGION_MAPPING[firstLetter] as string;

  return {
    isValid: true,
    gender,
    region,
  };
}
