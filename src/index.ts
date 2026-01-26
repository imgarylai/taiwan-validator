/**
 * Taiwan Validator - 台灣驗證器
 * 提供完整的台灣身分證件和代碼驗證功能，包括：
 * - 身分證字號
 * - 營利事業統一編號
 * - 居留證號
 * - 手機號碼
 * - 自然人憑證
 * - 電子發票手機條碼
 * - 電子發票捐贈碼
 */

export { validateNationalId } from "./validators/national-id";
export { validateBusinessNumber } from "./validators/business-number";
export { validateResidentCertificate } from "./validators/resident-certificate";
export { validateMobilePhone } from "./validators/mobile-phone";
export { validateCitizenCertificate } from "./validators/citizen-certificate";
export { validateEInvoiceMobileBarcode } from "./validators/einvoice-mobile-barcode";
export { validateEInvoiceDonationCode } from "./validators/einvoice-donation-code";

export type {
  ValidationResult,
  Gender,
  NationalIdType,
  ResidentCertificateType,
} from "./types";
