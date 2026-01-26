/**
 * 驗證結果介面
 */
export interface ValidationResult {
  isValid: boolean;
  message?: string | undefined;
}

/**
 * 身分證字號性別類型
 */
export type Gender = "male" | "female";

/**
 * 居留證類型
 */
export type ResidentCertificateType = "old" | "new";

/**
 * 身分證字號類型
 */
export type NationalIdType = "old" | "new";
