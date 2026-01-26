import type { ValidationResult } from "../types";

/**
 * 車牌類型
 */
export type LicensePlateType =
  | "car" // 汽車（新制）
  | "car-old" // 汽車（舊制）
  | "electric-car" // 電動汽車
  | "motorcycle-small" // 小型機車（50cc以下）
  | "motorcycle"; // 一般機車

/**
 * 車牌驗證結果（含車牌類型資訊）
 */
export interface LicensePlateValidationResult extends ValidationResult {
  plateType?: LicensePlateType | undefined;
}

/**
 * 驗證新制汽車車牌（2012年12月後）
 * 格式：3個英文字母 - 4個數字
 * 不使用字母 I、O
 * 不使用數字 4
 */
function validateNewCarPlate(plate: string): boolean {
  // 格式：3個英文字母-4個數字（例如：ABC-1234）
  const pattern = /^[A-HJ-NP-Z]{3}-\d{4}$/;
  if (!pattern.test(plate)) {
    return false;
  }

  // 檢查數字部分不包含 4
  const numbers = plate.split("-")[1] as string;
  return !numbers.includes("4");
}

/**
 * 驗證舊制汽車車牌（1992-2012）
 * 格式：1個數字 + 1個英文字母 - 4個數字
 */
function validateOldCarPlate(plate: string): boolean {
  // 格式：1個數字+1個英文字母-4個數字（例如：1A-2345）
  const pattern = /^\d[A-Z]-\d{4}$/;
  return pattern.test(plate);
}

/**
 * 驗證電動汽車車牌
 * 格式：E + 2個英文字母 - 4個數字
 * 不使用字母 I、O
 * 不使用數字 4
 */
function validateElectricCarPlate(plate: string): boolean {
  // 格式：E + 2個英文字母-4個數字（例如：EAB-1234）
  const pattern = /^E[A-HJ-NP-Z]{2}-\d{4}$/;
  if (!pattern.test(plate)) {
    return false;
  }

  // 檢查數字部分不包含 4
  const numbers = plate.split("-")[1] as string;
  return !numbers.includes("4");
}

/**
 * 驗證小型機車車牌（50cc以下）
 * 格式：3個數字-3個英文字母 或 3個英文字母-3個數字
 */
function validateSmallMotorcyclePlate(plate: string): boolean {
  // 格式1：3個數字-3個英文字母（例如：123-ABC）
  // 格式2：3個英文字母-3個數字（例如：ABC-123）
  const pattern1 = /^\d{3}-[A-Z]{3}$/;
  const pattern2 = /^[A-Z]{3}-\d{3}$/;
  return pattern1.test(plate) || pattern2.test(plate);
}

/**
 * 驗證一般機車車牌（舊制，50-250cc）
 * 格式：2個英文字母 + 1個數字 - 3個數字
 */
function validateMotorcyclePlate(plate: string): boolean {
  // 格式：2個英文字母+1個數字-3個數字（例如：AB1-234）
  const pattern = /^[A-Z]{2}\d-\d{3}$/;
  return pattern.test(plate);
}

/**
 * 偵測車牌類型
 */
function detectPlateType(plate: string): LicensePlateType | null {
  if (validateElectricCarPlate(plate)) {
    return "electric-car";
  }
  if (validateNewCarPlate(plate)) {
    return "car";
  }
  if (validateOldCarPlate(plate)) {
    return "car-old";
  }
  if (validateSmallMotorcyclePlate(plate)) {
    return "motorcycle-small";
  }
  if (validateMotorcyclePlate(plate)) {
    return "motorcycle";
  }
  return null;
}

/**
 * 驗證台灣車牌號碼
 * @param plate - 要驗證的車牌號碼
 * @param options - 驗證選項
 * @param options.type - 可選：指定車牌類型
 * @param options.detectType - 是否偵測車牌類型（預設：true）
 * @returns 驗證結果
 *
 * @example
 * ```typescript
 * // 新制汽車
 * validateLicensePlate('ABC-1235');
 *
 * // 電動汽車
 * validateLicensePlate('EAB-1235');
 *
 * // 舊制汽車
 * validateLicensePlate('1A-2345');
 *
 * // 小型機車
 * validateLicensePlate('123-ABC');
 * validateLicensePlate('ABC-123');
 *
 * // 一般機車
 * validateLicensePlate('AB1-234');
 *
 * // 指定類型驗證
 * validateLicensePlate('ABC-1235', { type: 'car' });
 *
 * // 不偵測類型
 * validateLicensePlate('ABC-1235', { detectType: false });
 * ```
 */
export function validateLicensePlate(
  plate: string,
  options: { type?: LicensePlateType; detectType?: boolean } = {},
): LicensePlateValidationResult {
  const { type, detectType = true } = options;

  if (!plate || typeof plate !== "string") {
    return {
      isValid: false,
      message: "車牌號碼必須為非空字串",
    };
  }

  // 移除空格並轉換為大寫
  const normalized = plate.trim().toUpperCase();

  // 如果指定了類型，只驗證該類型
  if (type) {
    let isValid = false;
    switch (type) {
      case "car":
        isValid = validateNewCarPlate(normalized);
        break;
      case "car-old":
        isValid = validateOldCarPlate(normalized);
        break;
      case "electric-car":
        isValid = validateElectricCarPlate(normalized);
        break;
      case "motorcycle-small":
        isValid = validateSmallMotorcyclePlate(normalized);
        break;
      case "motorcycle":
        isValid = validateMotorcyclePlate(normalized);
        break;
    }

    return {
      isValid,
      message: isValid ? undefined : `無效的${getPlateTypeName(type)}車牌號碼`,
      plateType: isValid && detectType ? type : undefined,
    };
  }

  // 自動偵測類型
  const detectedType = detectPlateType(normalized);

  if (!detectedType) {
    return {
      isValid: false,
      message: "無效的車牌號碼格式",
    };
  }

  return {
    isValid: true,
    plateType: detectType ? detectedType : undefined,
  };
}

/**
 * 取得車牌類型的中文名稱
 */
function getPlateTypeName(type: LicensePlateType): string {
  const typeNames: Record<LicensePlateType, string> = {
    car: "汽車",
    "car-old": "汽車（舊制）",
    "electric-car": "電動汽車",
    "motorcycle-small": "小型機車",
    motorcycle: "機車",
  };
  return typeNames[type];
}
