/**
 * Taiwan Validator - 台灣驗證器
 * 提供完整的台灣身分證件和代碼驗證功能，包括：
 * - 身分證字號 (含資訊解析)
 * - 營利事業統一編號 (統編)
 * - 統一發票字軌號碼
 * - 居留證號 (含資訊解析)
 * - 手機號碼
 * - 市內電話號碼
 * - 郵遞區號
 * - 自然人憑證
 * - 健保卡卡號
 * - 護照號碼
 * - 電子發票手機條碼
 * - 電子發票捐贈碼
 * - 車牌號碼
 */

export { validateNationalId, parseNationalId } from "./validators/national-id";
export { validateBusinessNumber } from "./validators/business-number";
export { validateUniformInvoice } from "./validators/uniform-invoice";
export {
  validateResidentCertificate,
  parseResidentCertificate,
} from "./validators/resident-certificate";
export { validateMobilePhone } from "./validators/mobile-phone";
export { validateLandlinePhone } from "./validators/landline-phone";
export { validatePostalCode } from "./validators/postal-code";
export { validateCitizenCertificate } from "./validators/citizen-certificate";
export { validateNHICard } from "./validators/nhi-card";
export { validatePassport } from "./validators/passport";
export { validateEInvoiceMobileBarcode } from "./validators/einvoice-mobile-barcode";
export { validateEInvoiceDonationCode } from "./validators/einvoice-donation-code";
export {
  validateLicensePlate,
  type LicensePlateType,
  type LicensePlateValidationResult,
} from "./validators/license-plate";

export type {
  ValidationResult,
  Gender,
  ResidentCertificateType,
  ResidentCertificateInfo,
  NationalIdType,
  NationalIdInfo,
} from "./types";
