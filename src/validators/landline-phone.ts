import type { ValidationResult } from "../types";

// 台灣市話區碼與對應的總長度（含區碼）
const AREA_CODES = [
  { code: "0826", totalLength: 9 },  // 烏坵
  { code: "0836", totalLength: 9 },  // 馬祖
  { code: "037", totalLength: 9 },   // 苗栗
  { code: "049", totalLength: 9 },   // 南投
  { code: "082", totalLength: 9 },   // 金門
  { code: "089", totalLength: 9 },   // 台東
  { code: "02", totalLength: 10 },   // 雙北、基隆
  { code: "03", totalLength: 9 },    // 桃園、新竹、宜蘭、花蓮
  { code: "04", totalLength: 10 },   // 台中、彰化
  { code: "05", totalLength: 9 },    // 雲林、嘉義
  { code: "06", totalLength: 9 },    // 台南、澎湖
  { code: "07", totalLength: 9 },    // 高雄
  { code: "08", totalLength: 9 },    // 屏東
];

/**
 * 驗證台灣市內電話號碼格式
 * 支援帶有括號、減號或空格的格式（例如 (02) 1234-5678, 02-12345678, 03-1234567）
 *
 * @param phone - 要驗證的市話號碼
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * validateLandlinePhone('(02) 1234-5678'); // { isValid: true }
 * validateLandlinePhone('03-1234567');      // { isValid: true }
 * ```
 */
export function validateLandlinePhone(phone: string): ValidationResult {
  if (!phone || typeof phone !== "string") {
    return {
      isValid: false,
      message: "電話號碼必須為非空字串",
    };
  }

  // 移除非數字的字元
  const normalized = phone.replace(/[^\d]/g, "");

  // 尋找匹配的區碼
  const match = AREA_CODES.find((entry) => normalized.startsWith(entry.code));

  if (!match) {
    return {
      isValid: false,
      message: "無效的台灣市話區碼",
    };
  }

  if (normalized.length !== match.totalLength) {
    return {
      isValid: false,
      message: `該區碼的電話號碼長度應為 ${match.totalLength} 碼`,
    };
  }

  return {
    isValid: true,
  };
}
