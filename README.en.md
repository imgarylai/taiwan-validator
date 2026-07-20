# Taiwan Validator

A comprehensive TypeScript validator for Taiwan, supporting identification numbers, business codes, license plates, and more.

[![CI](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml/badge.svg)](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/imgarylai/taiwan-validator/branch/main/graph/badge.svg)](https://codecov.io/gh/imgarylai/taiwan-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[繁體中文](README.md)

## Features

- ✅ National ID validation and information extraction (gender, region)
- ✅ Business Uniform Number validation (統一編號)
- ✅ Uniform Invoice prefix/number format validation (統一發票)
- ✅ Resident Certificate validation and information extraction (gender, region, format, identity type)
- ✅ Mobile Phone and Landline Telephone validation
- ✅ Postal Code validation (supports 3-digit, 5-digit, and 6-digit formats)
- ✅ Citizen Digital Certificate validation (自然人憑證)
- ✅ National Health Insurance (NHI) Card validation (健保卡)
- ✅ Passport Number validation (護照號碼)
- ✅ e-Invoice Mobile Barcode and Donation Code validation
- ✅ License Plate Number validation (車牌號碼) - Supports cars, motorcycles, electric vehicles, and more
- 📘 Full TypeScript support with type definitions
- 🧪 Thoroughly tested with 100% coverage
- 📦 Tree-shakeable ESM and CommonJS support
- 🚀 Zero dependencies

## Installation

```bash
npm install taiwan-validator
```

## Usage

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

// National ID
validateNationalId("A123456789"); // { isValid: true }
parseNationalId("A123456789"); // { isValid: true, gender: 'male', region: '臺北市' }

// Business Number & Uniform Invoice
validateBusinessNumber("12345676"); // { isValid: true }
validateUniformInvoice("AB-12345678"); // { isValid: true }

// Resident Certificate (ARC)
validateResidentCertificate("A823456783"); // { isValid: true } - New format
parseResidentCertificate("AB12345677"); // { isValid: true, format: 'old', gender: 'female', region: '臺北市', identityType: 'non-citizen' }

// Mobile & Landline Phone
validateMobilePhone("0912-345-678"); // { isValid: true }
validateLandlinePhone("(02) 1234-5678"); // { isValid: true }

// Postal Code
validatePostalCode("100-001"); // { isValid: true } - 6-digit

// Other Cards & Codes
validateCitizenCertificate("AB12345678901234"); // { isValid: true }
validateNHICard("0000 1234 5678"); // { isValid: true }
validatePassport("312345678"); // { isValid: true }
validateEInvoiceMobileBarcode("/ABCD123"); // { isValid: true }
validateEInvoiceDonationCode("12345"); // { isValid: true }

// License Plate Number
validateLicensePlate("ABC-1235"); // { isValid: true, plateType: 'car' }
```

## API Documentation

### `validateNationalId(id: string): ValidationResult`

Validates Taiwan National ID (身分證字號, 1 letter + 9 digits).

```typescript
validateNationalId("A123456789");
```

### `parseNationalId(id: string): NationalIdInfo`

Parses Taiwan National ID, extracting gender and registration region. Returns `isValid: false` if invalid.

```typescript
parseNationalId("A123456789");
// Returns: { isValid: true, gender: 'male', region: '臺北市' }
```

### `validateBusinessNumber(number: string): ValidationResult`

Validates Taiwan Business Uniform Number (統一編號, 8 digits with checksum validation).

```typescript
validateBusinessNumber("12345676");
```

### `validateUniformInvoice(invoice: string): ValidationResult`

Validates Taiwan Uniform Invoice Number format (2 uppercase letters + 8 digits, supports spaces and hyphens).

```typescript
validateUniformInvoice("AB-12345678");
```

### `validateResidentCertificate(id: string, format?: 'old' | 'new'): ValidationResult`

Validates Taiwan Resident Certificate (居留證號).

- **Old format**: 2 letters + 8 digits (e.g., `AB12345677`)
- **New format**: 1 letter + 9 digits starting with 8 or 9 (e.g., `A823456783`)

```typescript
validateResidentCertificate("A823456783"); // Auto-detect format
validateResidentCertificate("AB12345677", "old"); // Old format
validateResidentCertificate("A823456783", "new"); // New format
```

### `parseResidentCertificate(id: string): ResidentCertificateInfo`

Parses Taiwan Resident Certificate, extracting version format, gender, region, and legacy identity type.

```typescript
parseResidentCertificate("AB12345677");
// Returns: { isValid: true, format: 'old', gender: 'female', region: '臺北市', identityType: 'non-citizen' }
```

### `validateMobilePhone(phone: string): ValidationResult`

Validates Taiwan mobile phone number (手機號碼, 10 digits starting with 09, accepts hyphens and spaces).

```typescript
validateMobilePhone("0912-345-678");
```

### `validateLandlinePhone(phone: string): ValidationResult`

Validates Taiwan landline phone number (市內電話), supporting area code matching and corresponding number length check.

```typescript
validateLandlinePhone("(02) 1234-5678");
```

### `validatePostalCode(code: string | number): ValidationResult`

Validates Taiwan postal code (郵遞區號), first digit cannot be 0, supporting 3-digit, 5-digit (3+2), and 6-digit (3+3) formats.

```typescript
validatePostalCode("100-001");
```

### `validateCitizenCertificate(certNumber: string): ValidationResult`

Validates Taiwan Citizen Digital Certificate Number (自然人憑證, 2 uppercase letters + 14 digits).

```typescript
validateCitizenCertificate("AB12345678901234");
```

### `validateNHICard(cardNumber: string): ValidationResult`

Validates Taiwan National Health Insurance (NHI) Card Number (健保卡號, 12 digits).

```typescript
validateNHICard("0000 1234 5678");
```

### `validatePassport(passport: string): ValidationResult`

Validates Taiwan Passport Number (護照號碼, 9 digits).

```typescript
validatePassport("312345678");
```

### `validateEInvoiceMobileBarcode(barcode: string): ValidationResult`

Validates Taiwan e-Invoice Mobile Barcode (starts with `/` followed by 7 characters).

```typescript
validateEInvoiceMobileBarcode("/ABCD123");
```

### `validateEInvoiceDonationCode(code: string): ValidationResult`

Validates Taiwan e-Invoice Donation Code (3 to 7 digits).

```typescript
validateEInvoiceDonationCode("12345");
```

### `validateLicensePlate(plate: string, options?: { type?: LicensePlateType, detectType?: boolean }): LicensePlateValidationResult`

Validates Taiwan license plate numbers, supporting multiple vehicle types.

- **Supported Formats**:
  - **New car** (`car`): 3 letters - 4 digits (e.g., `ABC-1235`)
    - Letters I and O are not used
    - Digit 4 is not used
  - **Old car** (`car-old`): 1 digit + 1 letter - 4 digits (e.g., `1A-2345`)
  - **Electric car** (`electric-car`): E + 2 letters - 4 digits (e.g., `EAB-1235`)
    - Letters I and O are not used
    - Digit 4 is not used
  - **Small motorcycle** (`motorcycle-small`):
    - 3 digits - 3 letters (e.g., `123-ABC`)
    - 3 letters - 3 digits (e.g., `ABC-123`)
  - **Regular motorcycle** (`motorcycle`): 2 letters + 1 digit - 3 digits (e.g., `AB1-234`)

```typescript
// Basic validation (auto-detect plate type)
validateLicensePlate("ABC-1235");
// { isValid: true, plateType: 'car' }

// Electric car
validateLicensePlate("EAB-1235");
// { isValid: true, plateType: 'electric-car' }

// Old car format
validateLicensePlate("1A-2345");
// { isValid: true, plateType: 'car-old' }

// Small motorcycle
validateLicensePlate("123-ABC");
// { isValid: true, plateType: 'motorcycle-small' }

validateLicensePlate("ABC-123");
// { isValid: true, plateType: 'motorcycle-small' }

// Regular motorcycle
validateLicensePlate("AB1-234");
// { isValid: true, plateType: 'motorcycle' }

// Validate specific plate type
validateLicensePlate("ABC-1235", { type: "car" });
// { isValid: true, plateType: 'car' }

// Disable type detection
validateLicensePlate("ABC-1235", { detectType: false });
// { isValid: true }

// Handles lowercase and whitespace
validateLicensePlate(" abc-1235 ");
// { isValid: true, plateType: 'car' }
```

### Return Type

All validation functions return a `ValidationResult` object:

```typescript
interface ValidationResult {
  isValid: boolean;
  message?: string; // Error message when isValid is false
}
```

License plate validation returns a `LicensePlateValidationResult` with additional plate type information:

```typescript
interface LicensePlateValidationResult extends ValidationResult {
  plateType?:
    "car" | "car-old" | "electric-car" | "motorcycle-small" | "motorcycle";
}
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/imgarylai/taiwan-validator.git
cd taiwan-validator

# Install dependencies (this project uses pnpm >= 10)
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Build the package
pnpm run build

# Development mode (watch)
pnpm run dev
```

### Available Scripts

- `pnpm run build` - Build the package with tsup
- `pnpm run dev` - Watch mode for development
- `pnpm test` - Run tests
- `pnpm run test:coverage` - Run tests with coverage
- `pnpm run lint` - Lint the code
- `pnpm run type-check` - Check types
- `pnpm run docs` - Generate documentation
- `pnpm run clean` - Clean build outputs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Gary Lai - [@imgarylai](https://github.com/imgarylai)

## Acknowledgments

This package implements the official validation algorithms for Taiwan identification numbers and codes.
