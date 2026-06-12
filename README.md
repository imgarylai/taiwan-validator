# Taiwan Validator

一個完整的台灣身分驗證 TypeScript 套件，支援身分證件、營業代碼、車牌號碼等多種格式驗證。

[![CI](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml/badge.svg)](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/imgarylai/taiwan-validator/branch/main/graph/badge.svg)](https://codecov.io/gh/imgarylai/taiwan-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.en.md)

## 功能特色

- ✅ 身分證字號驗證與解析 (性別、發證地區)
- ✅ 營利事業統一編號 (統編) 驗證
- ✅ 統一發票字軌號碼驗證
- ✅ 居留證號驗證與解析 (性別、地區、新舊版格式、身分類型)
- ✅ 手機號碼與市內電話號碼驗證
- ✅ 郵遞區號驗證 (支援3碼、5碼、6碼)
- ✅ 自然人憑證驗證
- ✅ 健保卡卡號驗證
- ✅ 護照號碼驗證
- ✅ 電子發票手機條碼與捐贈碼驗證
- ✅ 車牌號碼驗證 - 支援汽車、機車、電動車等多種格式
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
  parseNationalId,
  validateBusinessNumber,
  validateUniformInvoice,
  validateResidentCertificate,
  parseResidentCertificate,
  validateMobilePhone,
  validateLandlinePhone,
  validatePostalCode,
  validateCitizenCertificate,
  validateNHICard,
  validatePassport,
  validateEInvoiceMobileBarcode,
  validateEInvoiceDonationCode,
  validateLicensePlate,
} from "taiwan-validator";

// 身分證字號
validateNationalId("A123456789"); // { isValid: true }
parseNationalId("A123456789");    // { isValid: true, gender: 'male', region: '臺北市' }

// 統一編號 與 統一發票號碼
validateBusinessNumber("12345676"); // { isValid: true }
validateUniformInvoice("AB-12345678"); // { isValid: true }

// 居留證號
validateResidentCertificate("A823456783"); // { isValid: true } - 新式
parseResidentCertificate("AB12345677");    // { isValid: true, format: 'old', gender: 'female', region: '臺北市', identityType: 'non-citizen' }

// 手機與市話
validateMobilePhone("0912-345-678");   // { isValid: true }
validateLandlinePhone("(02) 1234-5678"); // { isValid: true }

// 郵遞區號
validatePostalCode("100-001"); // { isValid: true } - 6碼

// 其他證件與代碼
validateCitizenCertificate("AB12345678901234"); // { isValid: true }
validateNHICard("0000 1234 5678"); // { isValid: true }
validatePassport("312345678"); // { isValid: true }
validateEInvoiceMobileBarcode("/ABCD123"); // { isValid: true }
validateEInvoiceDonationCode("12345"); // { isValid: true }

// 車牌號碼
validateLicensePlate("ABC-1235"); // { isValid: true, plateType: 'car' }
```

## API 文件

### `validateNationalId(id: string): ValidationResult`

驗證台灣身分證字號（1個字母 + 9個數字）。

```typescript
validateNationalId("A123456789");
```

### `parseNationalId(id: string): NationalIdInfo`

解析台灣身分證字號，提取性別與地區資訊。若身分證號無效，則回傳 `isValid: false`。

```typescript
parseNationalId("A123456789");
// 回傳: { isValid: true, gender: 'male', region: '臺北市' }
```

### `validateBusinessNumber(number: string): ValidationResult`

驗證台灣營業事業統一編號（8位數字，含檢查碼驗證）。

```typescript
validateBusinessNumber("12345676");
```

### `validateUniformInvoice(invoice: string): ValidationResult`

驗證台灣統一發票號碼格式（2碼大寫英文 + 8碼數字，支援空格與減號）。

```typescript
validateUniformInvoice("AB-12345678");
```

### `validateResidentCertificate(id: string, format?: 'old' | 'new'): ValidationResult`

驗證台灣居留證號。

- **舊式格式**：2 個英文字母 + 8 個數字（例如：`AB12345677`）
- **新式格式**：1 個英文字母 + 9 個數字（以 8 或 9 開頭，例如：`A823456783`）

```typescript
validateResidentCertificate("A823456783"); // 自動偵測格式
validateResidentCertificate("AB12345677", "old"); // 明確指定舊式格式
validateResidentCertificate("A823456783", "new"); // 明確指定新式格式
```

### `parseResidentCertificate(id: string): ResidentCertificateInfo`

解析台灣居留證號，提取版本格式、性別、地區與舊版身分類型資訊。

```typescript
parseResidentCertificate("AB12345677");
// 回傳: { isValid: true, format: 'old', gender: 'female', region: '臺北市', identityType: 'non-citizen' }
```

### `validateMobilePhone(phone: string): ValidationResult`

驗證台灣手機號碼（10 位數字，以 09 開頭，支援空格或減號）。

```typescript
validateMobilePhone("0912-345-678");
```

### `validateLandlinePhone(phone: string): ValidationResult`

驗證台灣市內電話號碼，支援區碼匹配與對應的電話長度驗證。

```typescript
validateLandlinePhone("(02) 1234-5678");
```

### `validatePostalCode(code: string | number): ValidationResult`

驗證台灣郵遞區號，首碼非0，支援 3 碼、5 碼 (3+2) 及 6 碼 (3+3) 格式。

```typescript
validatePostalCode("100-001");
```

### `validateCitizenCertificate(certNumber: string): ValidationResult`

驗證台灣自然人憑證號碼（2 個大寫字母 + 14 位數字）。

```typescript
validateCitizenCertificate("AB12345678901234");
```

### `validateNHICard(cardNumber: string): ValidationResult`

驗證台灣國民健康保險卡（健保卡）卡號（12 位數字）。

```typescript
validateNHICard("0000 1234 5678");
```

### `validatePassport(passport: string): ValidationResult`

驗證中華民國護照號碼（9 位數字）。

```typescript
validatePassport("312345678");
```

### `validateEInvoiceMobileBarcode(barcode: string): ValidationResult`

驗證台灣電子發票手機條碼（以 `/` 開頭加上 7 個字元）。

```typescript
validateEInvoiceMobileBarcode("/ABCD123");
```

### `validateEInvoiceDonationCode(code: string): ValidationResult`

驗證台灣電子發票捐贈碼（3 至 7 位數字）。

```typescript
validateEInvoiceDonationCode("12345");
```

### `validateLicensePlate(plate: string, options?: { type?: LicensePlateType, detectType?: boolean }): LicensePlateValidationResult`

驗證台灣車牌號碼，支援多種車輛類型。

- **支援格式**：
  - **新制汽車** (`car`)：3個英文字母 - 4個數字（例如：`ABC-1235`）
    - 不使用字母 I、O
    - 不使用數字 4
  - **舊制汽車** (`car-old`)：1個數字 + 1個英文字母 - 4個數字（例如：`1A-2345`）
  - **電動汽車** (`electric-car`)：E + 2個英文字母 - 4個數字（例如：`EAB-1235`）
    - 不使用字母 I、O
    - 不使用數字 4
  - **小型機車** (`motorcycle-small`)：
    - 3個數字 - 3個英文字母（例如：`123-ABC`）
    - 3個英文字母 - 3個數字（例如：`ABC-123`）
  - **一般機車** (`motorcycle`)：2個英文字母 + 1個數字 - 3個數字（例如：`AB1-234`）

```typescript
// 基本驗證（自動偵測車牌類型）
validateLicensePlate("ABC-1235");
// { isValid: true, plateType: 'car' }

// 電動汽車
validateLicensePlate("EAB-1235");
// { isValid: true, plateType: 'electric-car' }

// 舊制汽車
validateLicensePlate("1A-2345");
// { isValid: true, plateType: 'car-old' }

// 小型機車
validateLicensePlate("123-ABC");
// { isValid: true, plateType: 'motorcycle-small' }

validateLicensePlate("ABC-123");
// { isValid: true, plateType: 'motorcycle-small' }

// 一般機車
validateLicensePlate("AB1-234");
// { isValid: true, plateType: 'motorcycle' }

// 指定車牌類型驗證
validateLicensePlate("ABC-1235", { type: "car" });
// { isValid: true, plateType: 'car' }

// 不偵測車牌類型
validateLicensePlate("ABC-1235", { detectType: false });
// { isValid: true }

// 處理小寫和空格
validateLicensePlate(" abc-1235 ");
// { isValid: true, plateType: 'car' }
```

### 回傳型別

所有驗證函式都會回傳 `ValidationResult` 物件：

```typescript
interface ValidationResult {
  isValid: boolean;
  message?: string; // 當 isValid 為 false 時的錯誤訊息
}
```

車牌驗證函式會回傳 `LicensePlateValidationResult`，包含額外的車牌類型資訊：

```typescript
interface LicensePlateValidationResult extends ValidationResult {
  plateType?:
    | "car"
    | "car-old"
    | "electric-car"
    | "motorcycle-small"
    | "motorcycle";
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
