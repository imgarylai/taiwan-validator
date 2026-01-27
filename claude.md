# Taiwan Validator 專案概述

這是一個完整的台灣身分驗證 TypeScript 套件，提供多種台灣官方證件、代碼與車牌號碼的驗證功能。

## 專案資訊

- **專案名稱**: taiwan-validator
- **版本**: 1.1.0
- **授權**: MIT
- **語言**: TypeScript
- **測試框架**: Jest
- **建置工具**: tsup

## 專案目標

提供一個零依賴、型別安全的 TypeScript 套件，用於驗證台灣各種官方證件和代碼，包括：

1. **身分證字號** (validateNationalId) - 支援新舊格式
2. **統一編號** (validateBusinessNumber) - 營利事業統一編號
3. **居留證號** (validateResidentCertificate) - 支援新舊格式
4. **手機號碼** (validateMobilePhone) - 09開頭的10位數字
5. **自然人憑證** (validateCitizenCertificate) - 2字母+14數字
6. **電子發票手機條碼** (validateEInvoiceMobileBarcode) - /開頭+7字元
7. **電子發票捐贈碼** (validateEInvoiceDonationCode) - 3-7位數字
8. **車牌號碼** (validateLicensePlate) - 支援汽車、機車、電動車等多種格式

## 專案結構

````
/Volumes/workplace/tw-id-validator/
├── src/
│   ├── index.ts                          # 主要匯出檔案
│   ├── types.ts                          # TypeScript 型別定義
│   └── validators/                       # 驗證器目錄
│       ├── national-id.ts                # 身分證字號驗證
│       ├── national-id.test.ts           # 身分證字號測試
│       ├── business-number.ts            # 統一編號驗證
│       ├── business-number.test.ts       # 統一編號測試
│       ├── resident-certificate.ts       # 居留證號驗證
│       ├── resident-certificate.test.ts  # 居留證號測試
│       ├── mobile-phone.ts               # 手機號碼驗證
│       ├── mobile-phone.test.ts          # 手機號碼測試
│       ├── citizen-certificate.ts        # 自然人憑證驗證
│       ├── citizen-certificate.test.ts   # 自然人憑證測試
│       ├── einvoice-mobile-barcode.ts    # 電子發票手機條碼驗證
│       ├── einvoice-mobile-barcode.test.ts
│       ├── einvoice-donation-code.ts     # 電子發票捐贈碼驗證
│       ├── einvoice-donation-code.test.ts
│       ├── license-plate.ts              # 車牌號碼驗證
│       └── license-plate.test.ts         # 車牌號碼測試
├── README.md                             # 中文說明文件
├── README.en.md                          # 英文說明文件
├── package.json                          # 套件設定檔
├── tsconfig.json                         # TypeScript 設定
├── jest.config.js                        # Jest 測試設定
└── tsup.config.ts                        # 建置設定

## 核心演算法說明

### 1. 身分證字號驗證

**舊式格式** (A123456789)：
- 第1碼：英文字母（地區代碼）
- 第2碼：數字1或2（1=男性，2=女性）
- 第3-9碼：流水號
- 第10碼：檢查碼

**新式格式** (AA12345678)：
- 第1碼：英文字母（地區代碼）
- 第2碼：英文字母（代表性別，8系列=男性，9系列=女性）
- 第3-9碼：流水號
- 第10碼：檢查碼

**演算法**：
1. 將第一個字母轉換為兩位數字（A=10, B=11, ..., Z=33）
2. 使用權重 [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1] 計算加權和
3. 檢查總和是否能被 10 整除

### 2. 統一編號驗證

**格式**：8位數字

**演算法**：
1. 使用權重 [1, 2, 1, 2, 1, 2, 4, 1]
2. 將每位數字與權重相乘
3. 如果乘積為兩位數，將十位數和個位數相加
4. 計算總和
5. 檢查總和是否能被 10 整除
6. 特殊規則：如果第7位數字為7，總和除以10的餘數為1時也視為有效

### 3. 居留證號驗證

**舊式格式**：類似舊式身分證，但第一碼限定為 A-D，第二碼為 8 或 9
**新式格式**：類似新式身分證

使用與身分證字號相同的檢查碼演算法。

### 4. 手機號碼驗證

**格式**：10位數字，以09開頭

簡單的格式檢查，支援常見分隔符號（空格、破折號、括號）。

### 5. 自然人憑證驗證

**格式**：2個大寫英文字母 + 14位數字

簡單的格式檢查。

### 6. 電子發票手機條碼驗證

**格式**：/ + 7個字元（A-Z、0-9、+、-、.）

簡單的格式檢查。

### 7. 電子發票捐贈碼驗證

**格式**：3-7位數字

簡單的格式檢查。

### 8. 車牌號碼驗證

**新制汽車格式** (ABC-1235)：
- 3個英文字母 + 4個數字
- 不使用字母 I、O（避免與數字 1、0 混淆）
- 不使用數字 4（諧音不吉利）

**舊制汽車格式** (1A-2345)：
- 1個數字 + 1個英文字母 + 4個數字

**電動汽車格式** (EAB-1235)：
- E + 2個英文字母 + 4個數字
- 不使用字母 I、O
- 不使用數字 4

**小型機車格式**：
- 3個數字 + 3個英文字母 (123-ABC)
- 或 3個英文字母 + 3個數字 (ABC-123)

**一般機車格式** (AB1-234)：
- 2個英文字母 + 1個數字 + 3個數字

**驗證功能**：
- 自動偵測車牌類型
- 格式規則驗證
- 大小寫不敏感
- 自動去除空白

## API 設計模式

所有驗證函式都遵循統一的 API 設計：

```typescript
function validateXXX(input: string, options?: Options): ValidationResult

interface ValidationResult {
  isValid: boolean;
  message?: string;  // 當驗證失敗時提供錯誤訊息
}
````

**設計原則**：

- 所有函式都接受字串輸入
- 自動處理大小寫轉換（轉為大寫）
- 自動移除前後空白
- 錯誤訊息使用繁體中文
- 支援格式自動偵測（身分證字號、居留證號）

## 測試覆蓋

專案包含完整的測試套件，覆蓋率 100%：

- **測試檔案數量**: 8個測試檔案
- **測試案例數量**: 106個測試案例
- **測試內容**:
  - 有效輸入測試
  - 無效輸入測試
  - 邊界條件測試
  - 錯誤訊息驗證
  - 大小寫處理測試
  - 空白處理測試
  - 格式自動偵測測試

執行測試：

```bash
npm test                # 執行所有測試
npm run test:coverage   # 執行測試並產生覆蓋率報告
```

## 開發工作流程

1. **安裝相依套件**：`npm install`
2. **開發模式**：`npm run dev`（監看模式）
3. **執行測試**：`npm test`
4. **型別檢查**：`npm run type-check`
5. **程式碼檢查**：`npm run lint`
6. **建置套件**：`npm run build`

## 套件發布

套件支援以下格式：

- **ESM**: dist/index.mjs
- **CommonJS**: dist/index.cjs
- **TypeScript 型別定義**: dist/index.d.ts
- **Tree-shaking**: 支援

## 特色功能

- ✅ 零依賴
- ✅ 完整的 TypeScript 型別定義
- ✅ 支援 ESM 和 CommonJS
- ✅ Tree-shakeable
- ✅ 100% 測試覆蓋率
- ✅ 詳細的中文錯誤訊息
- ✅ 自動格式偵測
- ✅ 容錯設計（大小寫不敏感、自動去除空白）

## 使用範例

```typescript
import { validateNationalId } from "taiwan-validator";

// 自動偵測格式
const result = validateNationalId("A123456789");
if (result.isValid) {
  console.log("身分證字號有效");
} else {
  console.log("驗證失敗：", result.message);
}

// 指定格式
validateNationalId("A123456789", "old"); // 驗證舊式格式
validateNationalId("AA23456786", "new"); // 驗證新式格式
```

## 注意事項

1. **隱私保護**：測試資料都是範例格式，不使用真實個人資料
2. **錯誤訊息**：所有錯誤訊息都使用繁體中文
3. **相容性**：支援 Node.js >= 22.0.0
4. **效能**：所有驗證都是純函式，沒有副作用，效能優異

## 未來擴展可能

- 市內電話驗證
- 郵遞區號驗證（3碼或5碼）
- 護照號碼驗證
- 統一發票號碼驗證
- 銀行帳號驗證（需要各銀行規則）
- 地址格式驗證
