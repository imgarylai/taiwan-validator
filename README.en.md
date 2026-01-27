# Taiwan Validator

A comprehensive TypeScript validator for Taiwan, supporting identification numbers, business codes, license plates, and more.

[![CI](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml/badge.svg)](https://github.com/imgarylai/taiwan-validator/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[繁體中文](README.md)

## Features

- ✅ National ID validation (身分證字號) - Both old and new formats
- ✅ Business Uniform Number validation (統一編號)
- ✅ Resident Certificate validation (居留證號) - Both old and new formats
- ✅ Mobile Phone Number validation (手機號碼)
- ✅ Citizen Digital Certificate validation (自然人憑證)
- ✅ e-Invoice Mobile Barcode validation (電子發票手機條碼)
- ✅ e-Invoice Donation Code validation (電子發票捐贈碼)
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
  validateBusinessNumber,
  validateResidentCertificate,
  validateMobilePhone,
  validateCitizenCertificate,
  validateEInvoiceMobileBarcode,
  validateEInvoiceDonationCode,
  validateLicensePlate,
} from "taiwan-validator";

// National ID (身分證字號)
validateNationalId("A123456789"); // { isValid: true }
validateNationalId("AA23456786"); // { isValid: true } - New format

// Business Number (統一編號)
validateBusinessNumber("12345676"); // { isValid: true }

// Resident Certificate (居留證號)
validateResidentCertificate("A823456783"); // { isValid: true } - Old format
validateResidentCertificate("AA23456786"); // { isValid: true } - New format

// Mobile Phone (手機號碼)
validateMobilePhone("0912345678"); // { isValid: true }
validateMobilePhone("0912-345-678"); // { isValid: true } - With separators

// Citizen Digital Certificate (自然人憑證)
validateCitizenCertificate("AB12345678901234"); // { isValid: true }

// e-Invoice Mobile Barcode (電子發票手機條碼)
validateEInvoiceMobileBarcode("/ABCD123"); // { isValid: true }

// e-Invoice Donation Code (電子發票捐贈碼)
validateEInvoiceDonationCode("12345"); // { isValid: true }

// License Plate Number (車牌號碼)
validateLicensePlate("ABC-1235"); // { isValid: true, plateType: 'car' }
validateLicensePlate("EAB-1235"); // { isValid: true, plateType: 'electric-car' }
validateLicensePlate("AB1-234"); // { isValid: true, plateType: 'motorcycle' }
```

## API Documentation

### `validateNationalId(id: string, format?: 'old' | 'new'): ValidationResult`

Validates Taiwan National ID (身分證字號).

- **Old format**: 1 letter + 9 digits (e.g., `A123456789`)
- **New format**: 2 letters + 8 digits (e.g., `AA23456786`)

```typescript
validateNationalId("A123456789"); // Auto-detect format
validateNationalId("A123456789", "old"); // Explicitly check old format
validateNationalId("AA23456786", "new"); // Explicitly check new format
```

### `validateBusinessNumber(number: string): ValidationResult`

Validates Taiwan Business Uniform Number (統一編號).

- **Format**: 8 digits with checksum validation

```typescript
validateBusinessNumber("12345676");
```

### `validateResidentCertificate(id: string, format?: 'old' | 'new'): ValidationResult`

Validates Taiwan Resident Certificate (居留證號).

- **Old format**: 1 letter (A-D) + 9 digits starting with 8 or 9
- **New format**: 2 letters + 8 digits

```typescript
validateResidentCertificate("A823456783"); // Auto-detect format
validateResidentCertificate("A823456783", "old"); // Old format
validateResidentCertificate("AA23456786", "new"); // New format
```

### `validateMobilePhone(phone: string): ValidationResult`

Validates Taiwan mobile phone number (手機號碼).

- **Format**: 10 digits starting with 09

```typescript
validateMobilePhone("0912345678");
validateMobilePhone("0912-345-678"); // Accepts separators
```

### `validateCitizenCertificate(certNumber: string): ValidationResult`

Validates Taiwan Citizen Digital Certificate Number (自然人憑證).

- **Format**: 2 uppercase letters + 14 digits

```typescript
validateCitizenCertificate("AB12345678901234");
```

### `validateEInvoiceMobileBarcode(barcode: string): ValidationResult`

Validates Taiwan e-Invoice Mobile Barcode (電子發票手機條碼).

- **Format**: `/` + 7 characters (A-Z, 0-9, +, -, .)

```typescript
validateEInvoiceMobileBarcode("/ABCD123");
```

### `validateEInvoiceDonationCode(code: string): ValidationResult`

Validates Taiwan e-Invoice Donation Code (電子發票捐贈碼).

- **Format**: 3-7 digits

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
    | "car"
    | "car-old"
    | "electric-car"
    | "motorcycle-small"
    | "motorcycle";
}
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/imgarylai/taiwan-validator.git
cd taiwan-validator

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build

# Development mode (watch)
npm run dev
```

### Available Scripts

- `npm run build` - Build the package with tsup
- `npm run dev` - Watch mode for development
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint the code
- `npm run type-check` - Check types
- `npm run docs` - Generate documentation
- `npm run clean` - Clean build outputs

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
