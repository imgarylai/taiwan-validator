# Taiwan Validator

一個完整的台灣身分證件與代碼驗證 TypeScript 套件。

[![CI](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml/badge.svg)](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.en.md)

## 功能特色

- ✅ 身分證字號驗證 - 支援新舊格式
- ✅ 統一編號驗證
- ✅ 居留證號驗證 - 支援新舊格式
- ✅ 手機號碼驗證
- ✅ 自然人憑證驗證
- ✅ 電子發票手機條碼驗證
- ✅ 電子發票捐贈碼驗證
- 📘 完整的 TypeScript 型別定義
- 🧪 完整測試覆蓋率
- 📦 支援 ESM 和 CommonJS 且可 Tree-shaking
- 🚀 零依賴

## 安裝

```bash
npm install taiwan-validator
```

## 使用方式

```typescript
import {
  validateNationalId,
  validateBusinessNumber,
  validateResidentCertificate,
  validateMobilePhone,
  validateCitizenCertificate,
  validateEInvoiceMobileBarcode,
  validateEInvoiceDonationCode,
} from "taiwan-validator";

// 身分證字號
validateNationalId("A123456789"); // { isValid: true }
validateNationalId("AA23456786"); // { isValid: true } - 新式格式

// 統一編號
validateBusinessNumber("12345676"); // { isValid: true }

// 居留證號
validateResidentCertificate("A823456783"); // { isValid: true } - 舊式
validateResidentCertificate("AA23456786"); // { isValid: true } - 新式

// 手機號碼
validateMobilePhone("0912345678"); // { isValid: true }
validateMobilePhone("0912-345-678"); // { isValid: true } - 含分隔符號

// 自然人憑證
validateCitizenCertificate("AB12345678901234"); // { isValid: true }

// 電子發票手機條碼
validateEInvoiceMobileBarcode("/ABCD123"); // { isValid: true }

// 電子發票捐贈碼
validateEInvoiceDonationCode("12345"); // { isValid: true }
```

## API 文件

### `validateNationalId(id: string, format?: 'old' | 'new'): ValidationResult`

驗證台灣身分證字號。

- **舊式格式**：1 個英文字母 + 9 個數字（例如：`A123456789`）
- **新式格式**：2 個英文字母 + 8 個數字（例如：`AA23456786`）

```typescript
validateNationalId("A123456789"); // 自動偵測格式
validateNationalId("A123456789", "old"); // 明確指定舊式格式
validateNationalId("AA23456786", "new"); // 明確指定新式格式
```

### `validateBusinessNumber(number: string): ValidationResult`

驗證台灣統一編號。

- **格式**：8 位數字，含檢查碼驗證

```typescript
validateBusinessNumber("12345676");
```

### `validateResidentCertificate(id: string, format?: 'old' | 'new'): ValidationResult`

驗證台灣居留證號。

- **舊式格式**：1 個英文字母（A-D）+ 9 個數字（第二位為 8 或 9）
- **新式格式**：2 個英文字母 + 8 個數字

```typescript
validateResidentCertificate("A823456783"); // 自動偵測格式
validateResidentCertificate("A823456783", "old"); // 舊式格式
validateResidentCertificate("AA23456786", "new"); // 新式格式
```

### `validateMobilePhone(phone: string): ValidationResult`

驗證台灣手機號碼。

- **格式**：10 位數字，以 09 開頭

```typescript
validateMobilePhone("0912345678");
validateMobilePhone("0912-345-678"); // 接受分隔符號
```

### `validateCitizenCertificate(certNumber: string): ValidationResult`

驗證台灣自然人憑證號碼。

- **格式**：2 個大寫英文字母 + 14 位數字

```typescript
validateCitizenCertificate("AB12345678901234");
```

### `validateEInvoiceMobileBarcode(barcode: string): ValidationResult`

驗證台灣電子發票手機條碼。

- **格式**：`/` + 7 個字元（A-Z、0-9、+、-、.）

```typescript
validateEInvoiceMobileBarcode("/ABCD123");
```

### `validateEInvoiceDonationCode(code: string): ValidationResult`

驗證台灣電子發票捐贈碼。

- **格式**：3-7 位數字

```typescript
validateEInvoiceDonationCode("12345");
```

### 回傳型別

所有驗證函式都會回傳 `ValidationResult` 物件：

```typescript
interface ValidationResult {
  isValid: boolean;
  message?: string; // 當 isValid 為 false 時的錯誤訊息
}
```

## 開發

### 設定

```bash
# 複製專案
git clone https://github.com/imgarylai/taiwan-validator.git
cd taiwan-validator

# 安裝相依套件
npm install

# 執行測試
npm test

# 執行測試並產生覆蓋率報告
npm run test:coverage

# 建置套件
npm run build

# 開發模式（監看）
npm run dev
```

### 可用指令

- `npm run build` - 使用 tsup 建置套件
- `npm run dev` - 開發模式（監看）
- `npm test` - 執行測試
- `npm run test:coverage` - 執行測試並產生覆蓋率報告
- `npm run lint` - 程式碼檢查
- `npm run type-check` - 型別檢查
- `npm run docs` - 產生文件
- `npm run clean` - 清除建置輸出

## 貢獻

歡迎貢獻！請隨時提交 Pull Request。

1. Fork 此專案
2. 建立你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 使用 conventional commits 提交你的變更 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟一個 Pull Request

## 授權

本專案使用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案。

## 作者

Gary Lai - [@imgarylai](https://github.com/imgarylai)

## 致謝

本套件實作了台灣官方的身分證件與代碼驗證演算法。
