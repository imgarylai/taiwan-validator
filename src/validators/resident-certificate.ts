import type { ValidationResult, ResidentCertificateType, ResidentCertificateInfo } from "../types";
import { LETTER_MAPPING, REGION_MAPPING } from "./shared";

/**
 * 驗證舊式居留證號格式與檢查碼（2個字母 + 8個數字）
 * 格式：AA12345678
 * - 第一個字元：地區代碼（字母）
 * - 第二個字元：身分與性別碼（A = 男性無戶籍國民/港澳陸居民，B = 女性無戶籍國民/港澳陸居民，C = 男性外國人，D = 女性外國人）
 * - 最後一個字元：檢查碼
 */
function validateOldFormat(id: string): boolean {
  const pattern = /^[A-Z][A-D]\d{8}$/;
  if (!pattern.test(id)) {
    return false;
  }

  const firstLetter = id[0] as string;
  const secondLetter = id[1] as string;
  const numbers = id.slice(2);

  const firstLetterValue = LETTER_MAPPING[firstLetter] as number;
  const secondLetterValue = LETTER_MAPPING[secondLetter] as number;

  const d1 = Math.floor(firstLetterValue / 10);
  const d2 = firstLetterValue % 10;
  const d3 = secondLetterValue % 10; // 取第二個字母對應數字的個位數

  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
  const digits = [d1, d2, d3, ...numbers.split("").map(Number)];

  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index]!,
    0,
  );

  return sum % 10 === 0;
}

/**
 * 驗證新式居留證號格式與檢查碼（1個字母 + 9個數字，其中第二碼為8或9）
 * 格式：A800000001
 * - 第一個字元：地區代碼（字母）
 * - 第二個字元：性別（8 = 男性，9 = 女性）
 * - 最後一個字元：檢查碼
 */
function validateNewFormat(id: string): boolean {
  const pattern = /^[A-Z][89]\d{8}$/;
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
 * 偵測居留證號格式類型
 */
function detectFormat(id: string): ResidentCertificateType | null {
  if (/^[A-Z][A-D]\d{8}$/.test(id)) {
    return "old";
  }
  if (/^[A-Z][89]\d{8}$/.test(id)) {
    return "new";
  }
  return null;
}

/**
 * 驗證台灣居留證號（支援新舊格式，舊版為2字母+8數字，新版為1字母+9數字）
 * @param id - 要驗證的居留證號
 * @param format - 可選：指定格式類型（'old' 或 'new'）
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateResidentCertificate('AD00000001', 'old'); // 舊式格式
 * validateResidentCertificate('A800000001', 'new'); // 新式格式
 * ```
 */
export function validateResidentCertificate(
  id: string,
  format?: ResidentCertificateType,
): ValidationResult {
  if (!id || typeof id !== "string") {
    return {
      isValid: false,
      message: "居留證號必須為非空字串",
    };
  }

  const normalizedId = id.trim().toUpperCase();

  if (format === "old") {
    const isValid = validateOldFormat(normalizedId);
    return {
      isValid,
      message: isValid ? undefined : "無效的舊式居留證號",
    };
  }

  if (format === "new") {
    const isValid = validateNewFormat(normalizedId);
    return {
      isValid,
      message: isValid ? undefined : "無效的新式居留證號",
    };
  }

  const detectedFormat = detectFormat(normalizedId);

  if (!detectedFormat) {
    return {
      isValid: false,
      message: "無效的居留證號格式",
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
      : `無效的${detectedFormat === "old" ? "舊式" : "新式"}居留證號`,
  };
}

/**
 * 解析台灣居留證號資訊（格式版本、性別、發證地區、身分類型）
 * @param id - 要解析的居留證號
 * @returns 解析結果，包含驗證狀態及相關欄位
 *
 * @example
 * ```typescript
 * parseResidentCertificate('A800000001');
 * // 輸出: { isValid: true, format: 'new', gender: 'male', region: '臺北市' }
 * ```
 */
export function parseResidentCertificate(id: string): ResidentCertificateInfo {
  if (!id || typeof id !== "string") {
    return {
      isValid: false,
      message: "居留證號必須為非空字串",
    };
  }

  const normalizedId = id.trim().toUpperCase();

  const format = detectFormat(normalizedId);
  if (!format) {
    return {
      isValid: false,
      message: "無效的居留證號格式",
    };
  }

  const isValid =
    format === "old"
      ? validateOldFormat(normalizedId)
      : validateNewFormat(normalizedId);

  if (!isValid) {
    return {
      isValid: false,
      message: `無效的${format === "old" ? "舊式" : "新式"}居留證號`,
    };
  }

  const firstLetter = normalizedId[0] as string;
  const secondChar = normalizedId[1] as string;

  const region = REGION_MAPPING[firstLetter] as string;
  let gender: "male" | "female";
  let identityType: "non-citizen" | "foreigner" | undefined;

  if (format === "new") {
    gender = secondChar === "8" ? "male" : "female";
    identityType = "foreigner"; // 新式格式下通常統稱為外來人口
  } else {
    // 舊式格式: A, B, C, D
    gender = (secondChar === "A" || secondChar === "C") ? "male" : "female";
    identityType = (secondChar === "A" || secondChar === "B") ? "non-citizen" : "foreigner";
  }

  return {
    isValid: true,
    format,
    gender,
    region,
    identityType,
  };
}
