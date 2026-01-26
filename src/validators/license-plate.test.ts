import { validateLicensePlate } from "./license-plate";

describe("validateLicensePlate", () => {
  describe("基本驗證", () => {
    test("應該拒絕空字串", () => {
      const result = validateLicensePlate("");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("車牌號碼必須為非空字串");
    });

    test("應該拒絕非字串輸入", () => {
      const result = validateLicensePlate(null as unknown as string);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("車牌號碼必須為非空字串");
    });

    test("應該拒絕無效的格式", () => {
      const result = validateLicensePlate("INVALID");
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的車牌號碼格式");
    });

    test("應該處理小寫輸入並轉換為大寫", () => {
      const result = validateLicensePlate("abc-1235");
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("car");
    });

    test("應該處理含有空格的輸入", () => {
      const result = validateLicensePlate(" ABC-1235 ");
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("car");
    });
  });

  describe("新制汽車車牌驗證", () => {
    test("應該驗證有效的新制汽車車牌", () => {
      const validPlates = [
        "ABC-1235",
        "XYZ-9876",
        "AAA-0000",
        "ZZZ-9999",
        "ABC-1230",
      ];

      validPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(true);
        expect(result.plateType).toBe("car");
      });
    });

    test("應該拒絕包含數字4的車牌", () => {
      const invalidPlates = [
        "ABC-1234", // 包含4
        "ABC-4567", // 包含4
        "ABC-0004", // 包含4
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(false);
      });
    });

    test("應該拒絕包含字母I或O的車牌", () => {
      const invalidPlates = [
        "AIC-1235", // 包含I
        "AOC-1235", // 包含O
        "IBC-1235", // 包含I
        "OBC-1235", // 包含O
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(false);
      });
    });

    test("應該拒絕格式錯誤的汽車車牌（指定類型驗證）", () => {
      const invalidPlates = [
        "AB-1235", // 只有2個字母
        "ABCD-1235", // 4個字母
        "ABC-123", // 只有3個數字（但這是有效的小型機車格式）
        "ABC-12345", // 5個數字
        "ABC1235", // 缺少破折號
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate, { type: "car" });
        expect(result.isValid).toBe(false);
      });
    });

    test("當指定類型為car時，應該只驗證新制汽車格式", () => {
      const result = validateLicensePlate("ABC-1235", { type: "car" });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("car");
    });

    test("當指定類型為car但格式錯誤時，應該返回錯誤訊息", () => {
      const result = validateLicensePlate("1A-2345", { type: "car" });
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("無效的汽車車牌號碼");
    });
  });

  describe("舊制汽車車牌驗證", () => {
    test("應該驗證有效的舊制汽車車牌", () => {
      const validPlates = ["1A-2345", "9Z-0000", "5B-9999", "3X-1234"];

      validPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(true);
        expect(result.plateType).toBe("car-old");
      });
    });

    test("應該拒絕格式錯誤的舊制車牌", () => {
      const invalidPlates = [
        "AA-2345", // 2個字母
        "1AB-2345", // 2個字母
        "1-2345", // 缺少字母
        "1A-234", // 只有3個數字
        "1A-23456", // 5個數字
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(false);
      });
    });

    test("當指定類型為car-old時，應該只驗證舊制汽車格式", () => {
      const result = validateLicensePlate("1A-2345", { type: "car-old" });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("car-old");
    });
  });

  describe("電動汽車車牌驗證", () => {
    test("應該驗證有效的電動汽車車牌", () => {
      const validPlates = [
        "EAB-1235",
        "EXY-9876",
        "EAA-0000",
        "EZZ-9999",
        "EAB-1230",
      ];

      validPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(true);
        expect(result.plateType).toBe("electric-car");
      });
    });

    test("應該拒絕包含數字4的電動車牌", () => {
      const invalidPlates = ["EAB-1234", "EAB-4567", "EAB-0004"];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(false);
      });
    });

    test("應該拒絕包含字母I或O的電動車牌", () => {
      const invalidPlates = [
        "EIC-1235", // 包含I
        "EOC-1235", // 包含O
        "EIA-1235", // 包含I
        "EOA-1235", // 包含O
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(false);
      });
    });

    test("應該拒絕不以E開頭的電動車牌", () => {
      const invalidPlates = ["AAB-1235", "XAB-1235"];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.plateType).not.toBe("electric-car");
      });
    });

    test("當指定類型為electric-car時，應該只驗證電動汽車格式", () => {
      const result = validateLicensePlate("EAB-1235", {
        type: "electric-car",
      });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("electric-car");
    });
  });

  describe("小型機車車牌驗證", () => {
    test("應該驗證有效的小型機車車牌（數字-字母格式）", () => {
      const validPlates = ["123-ABC", "000-ZZZ", "999-AAA", "456-XYZ"];

      validPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(true);
        expect(result.plateType).toBe("motorcycle-small");
      });
    });

    test("應該驗證有效的小型機車車牌（字母-數字格式）", () => {
      const validPlates = ["ABC-123", "ZZZ-000", "AAA-999", "XYZ-456"];

      validPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(true);
        expect(result.plateType).toBe("motorcycle-small");
      });
    });

    test("應該拒絕格式錯誤的小型機車車牌", () => {
      const invalidPlates = [
        "12-ABC", // 只有2個數字
        "1234-ABC", // 4個數字
        "123-AB", // 只有2個字母
        "123-ABCD", // 4個字母
        "AB-123", // 字母只有2個
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.plateType).not.toBe("motorcycle-small");
      });
    });

    test("當指定類型為motorcycle-small時，應該只驗證小型機車格式", () => {
      const result1 = validateLicensePlate("123-ABC", {
        type: "motorcycle-small",
      });
      expect(result1.isValid).toBe(true);
      expect(result1.plateType).toBe("motorcycle-small");

      const result2 = validateLicensePlate("ABC-123", {
        type: "motorcycle-small",
      });
      expect(result2.isValid).toBe(true);
      expect(result2.plateType).toBe("motorcycle-small");
    });
  });

  describe("一般機車車牌驗證", () => {
    test("應該驗證有效的一般機車車牌", () => {
      const validPlates = ["AB1-234", "XY9-000", "ZZ0-999", "AA5-123"];

      validPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.isValid).toBe(true);
        expect(result.plateType).toBe("motorcycle");
      });
    });

    test("應該拒絕格式錯誤的一般機車車牌", () => {
      const invalidPlates = [
        "A1-234", // 只有1個字母
        "ABC1-234", // 3個字母
        "AB-234", // 缺少數字
        "AB12-234", // 2個數字
        "AB1-23", // 只有2個數字
        "AB1-2345", // 4個數字
      ];

      invalidPlates.forEach((plate) => {
        const result = validateLicensePlate(plate);
        expect(result.plateType).not.toBe("motorcycle");
      });
    });

    test("當指定類型為motorcycle時，應該只驗證一般機車格式", () => {
      const result = validateLicensePlate("AB1-234", { type: "motorcycle" });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("motorcycle");
    });
  });

  describe("車牌類型偵測選項", () => {
    test("當 detectType 為 false 時，不應該回傳 plateType", () => {
      const result = validateLicensePlate("ABC-1235", { detectType: false });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBeUndefined();
    });

    test("當 detectType 為 true 時，應該回傳 plateType", () => {
      const result = validateLicensePlate("ABC-1235", { detectType: true });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("car");
    });

    test("預設應該偵測車牌類型", () => {
      const result = validateLicensePlate("ABC-1235");
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("car");
    });

    test("當指定類型且 detectType 為 false 時，不應該回傳 plateType", () => {
      const result = validateLicensePlate("ABC-1235", {
        type: "car",
        detectType: false,
      });
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBeUndefined();
    });
  });

  describe("類型優先順序測試", () => {
    test("應該優先識別為電動汽車而非一般汽車", () => {
      const result = validateLicensePlate("EAB-1235");
      expect(result.isValid).toBe(true);
      expect(result.plateType).toBe("electric-car");
    });

    test("應該正確區分新制和舊制汽車", () => {
      const newCar = validateLicensePlate("ABC-1235");
      expect(newCar.plateType).toBe("car");

      const oldCar = validateLicensePlate("1A-2345");
      expect(oldCar.plateType).toBe("car-old");
    });

    test("應該正確區分小型機車和一般機車", () => {
      const smallMotorcycle = validateLicensePlate("123-ABC");
      expect(smallMotorcycle.plateType).toBe("motorcycle-small");

      const motorcycle = validateLicensePlate("AB1-234");
      expect(motorcycle.plateType).toBe("motorcycle");
    });
  });
});
