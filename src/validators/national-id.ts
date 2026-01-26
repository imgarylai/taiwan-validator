import type { ValidationResult, NationalIdType } from "../types";

/**
 * 字母對應數字表（用於身分證字號驗證）
 */
const LETTER_MAPPING: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 34,
  J: 18,
  K: 19,
  L: 20,
  M: 21,
  N: 22,
  O: 35,
  P: 23,
  Q: 24,
  R: 25,
  S: 26,
  T: 27,
  U: 28,
  V: 29,
  W: 32,
  X: 30,
  Y: 31,
  Z: 33,
};

/**
 * 驗證舊式身分證字號格式（1個字母 + 9個數字）
 * 格式：A123456789
 * - 第一個字元：地區代碼（字母）
 * - 第二個字元：性別（1 = 男性，2 = 女性）
 * - 最後一個字元：檢查碼
 */
function validateOldFormat(id: string): boolean {
  const pattern = /^[A-Z][12]\d{8}$/;
  if (!pattern.test(id)) {
    return false;
  }

  const letter = id[0] as string;
  const numbers = id.slice(1);

  const letterValue = LETTER_MAPPING[letter] as number;

  // 計算檢查碼
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
 * 驗證新式身分證字號格式（2個字母 + 8個數字）
 * 格式：AA12345678
 * - 第一個字元：地區代碼（字母）
 * - 第二個字元：性別（8 = 男性，9 = 女性）以字母表示
 * - 最後一個字元：檢查碼
 */
function validateNewFormat(id: string): boolean {
  const pattern = /^[A-Z]{2}\d{8}$/;
  if (!pattern.test(id)) {
    return false;
  }

  const firstLetter = id[0] as string;
  const secondLetter = id[1] as string;
  const numbers = id.slice(2);

  const firstLetterValue = LETTER_MAPPING[firstLetter] as number;
  const secondLetterValue = LETTER_MAPPING[secondLetter] as number;

  // 計算新式格式的檢查碼
  const d1 = Math.floor(firstLetterValue / 10);
  const d2 = firstLetterValue % 10;
  const d3 = Math.floor(secondLetterValue / 10);
  const d4 = secondLetterValue % 10;

  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1];
  const digits = [d1, d2, d3, d4, ...numbers.split("").map(Number)];

  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index]!,
    0,
  );

  return sum % 10 === 0;
}

/**
 * 偵測身分證字號格式類型
 */
function detectFormat(id: string): NationalIdType | null {
  if (/^[A-Z][12]\d{8}$/.test(id)) {
    return "old";
  }
  if (/^[A-Z]{2}\d{8}$/.test(id)) {
    return "new";
  }
  return null;
}

/**
 * 驗證台灣身分證字號（支援新舊格式）
 * @param id - 要驗證的身分證字號
 * @param format - 可選：指定格式類型（'old' 或 'new'）
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateNationalId('A123456789'); // 舊式格式
 * validateNationalId('AA12345678'); // 新式格式
 * ```
 */
export function validateNationalId(
  id: string,
  format?: NationalIdType,
): ValidationResult {
  if (!id || typeof id !== "string") {
    return {
      isValid: false,
      message: "身分證字號必須為非空字串",
    };
  }

  const normalizedId = id.trim().toUpperCase();

  // 如果指定了格式，只驗證該格式
  if (format === "old") {
    const isValid = validateOldFormat(normalizedId);
    return {
      isValid,
      message: isValid ? undefined : "無效的舊式身分證字號",
    };
  }

  if (format === "new") {
    const isValid = validateNewFormat(normalizedId);
    return {
      isValid,
      message: isValid ? undefined : "無效的新式身分證字號",
    };
  }

  // 自動偵測格式
  const detectedFormat = detectFormat(normalizedId);

  if (!detectedFormat) {
    return {
      isValid: false,
      message: "無效的身分證字號格式",
    };
  }

  const isValid =
    detectedFormat === "old"
      ? validateOldFormat(normalizedId)
      : validateNewFormat(normalizedId);

  return {
    isValid,
    message: isValid
      ? undefined
      : `無效的${detectedFormat === "old" ? "舊式" : "新式"}身分證字號`,
  };
}
