// Vietnam Address Data — 3-level: Province → District → Ward
// This is a simplified dataset. For production, use an API like https://provinces.open-api.vn/

export interface Ward {
  code: string;
  name: string;
}

export interface District {
  code: string;
  name: string;
  wards: Ward[];
}

export interface Province {
  code: string;
  name: string;
  districts: District[];
}

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  email?: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  isDefault: boolean;
}

// Simplified address data (key cities with sample districts/wards)
export const provinces: Province[] = [
  {
    code: 'HCM',
    name: 'TP. Hồ Chí Minh',
    districts: [
      {
        code: 'Q1', name: 'Quận 1',
        wards: [
          { code: 'BN', name: 'Phường Bến Nghé' },
          { code: 'BT', name: 'Phường Bến Thành' },
          { code: 'CDR', name: 'Phường Cầu Ông Lãnh' },
          { code: 'DKN', name: 'Phường Đa Kao' },
          { code: 'NCT', name: 'Phường Nguyễn Cư Trinh' },
          { code: 'NT', name: 'Phường Nguyễn Thái Bình' },
          { code: 'PNL', name: 'Phường Phạm Ngũ Lão' },
          { code: 'TD', name: 'Phường Tân Định' },
        ],
      },
      {
        code: 'Q3', name: 'Quận 3',
        wards: [
          { code: 'P1', name: 'Phường 1' },
          { code: 'P2', name: 'Phường 2' },
          { code: 'P3', name: 'Phường 3' },
          { code: 'P4', name: 'Phường 4' },
          { code: 'P5', name: 'Phường 5' },
          { code: 'VCC', name: 'Phường Võ Thị Sáu' },
        ],
      },
      {
        code: 'Q7', name: 'Quận 7',
        wards: [
          { code: 'TK', name: 'Phường Tân Kiểng' },
          { code: 'TP', name: 'Phường Tân Phú' },
          { code: 'TQ', name: 'Phường Tân Quy' },
          { code: 'TT', name: 'Phường Tân Thuận Đông' },
          { code: 'PMH', name: 'Phường Phú Mỹ' },
          { code: 'BT7', name: 'Phường Bình Thuận' },
        ],
      },
      {
        code: 'BT', name: 'Quận Bình Thạnh',
        wards: [
          { code: 'P1', name: 'Phường 1' },
          { code: 'P2', name: 'Phường 2' },
          { code: 'P3', name: 'Phường 3' },
          { code: 'P11', name: 'Phường 11' },
          { code: 'P12', name: 'Phường 12' },
          { code: 'P13', name: 'Phường 13' },
          { code: 'P14', name: 'Phường 14' },
          { code: 'P15', name: 'Phường 15' },
          { code: 'P17', name: 'Phường 17' },
          { code: 'P19', name: 'Phường 19' },
          { code: 'P21', name: 'Phường 21' },
          { code: 'P22', name: 'Phường 22' },
          { code: 'P24', name: 'Phường 24' },
          { code: 'P25', name: 'Phường 25' },
          { code: 'P26', name: 'Phường 26' },
          { code: 'P27', name: 'Phường 27' },
          { code: 'P28', name: 'Phường 28' },
        ],
      },
      {
        code: 'GV', name: 'Quận Gò Vấp',
        wards: [
          { code: 'P1', name: 'Phường 1' },
          { code: 'P3', name: 'Phường 3' },
          { code: 'P4', name: 'Phường 4' },
          { code: 'P5', name: 'Phường 5' },
          { code: 'P6', name: 'Phường 6' },
          { code: 'P7', name: 'Phường 7' },
          { code: 'P10', name: 'Phường 10' },
        ],
      },
      {
        code: 'TD', name: 'TP. Thủ Đức',
        wards: [
          { code: 'BTD', name: 'Phường Bình Thọ' },
          { code: 'LB', name: 'Phường Linh Trung' },
          { code: 'HT', name: 'Phường Hiệp Thành' },
          { code: 'TN', name: 'Phường Tam Phú' },
          { code: 'LCQ', name: 'Phường Long Bình' },
          { code: 'LP', name: 'Phường Long Phước' },
        ],
      },
      {
        code: 'PN', name: 'Quận Phú Nhuận',
        wards: [
          { code: 'P1', name: 'Phường 1' },
          { code: 'P2', name: 'Phường 2' },
          { code: 'P3', name: 'Phường 3' },
          { code: 'P4', name: 'Phường 4' },
          { code: 'P5', name: 'Phường 5' },
          { code: 'P7', name: 'Phường 7' },
          { code: 'P8', name: 'Phường 8' },
        ],
      },
      {
        code: 'TB', name: 'Quận Tân Bình',
        wards: [
          { code: 'P1', name: 'Phường 1' },
          { code: 'P2', name: 'Phường 2' },
          { code: 'P3', name: 'Phường 3' },
          { code: 'P4', name: 'Phường 4' },
          { code: 'P5', name: 'Phường 5' },
          { code: 'P6', name: 'Phường 6' },
        ],
      },
    ],
  },
  {
    code: 'HN',
    name: 'Hà Nội',
    districts: [
      {
        code: 'HK', name: 'Quận Hoàn Kiếm',
        wards: [
          { code: 'CDG', name: 'Phường Cửa Đông' },
          { code: 'HT', name: 'Phường Hàng Trống' },
          { code: 'HG', name: 'Phường Hàng Gai' },
          { code: 'HB', name: 'Phường Hàng Bông' },
          { code: 'LC', name: 'Phường Lý Thái Tổ' },
          { code: 'TH', name: 'Phường Tràng Tiền' },
        ],
      },
      {
        code: 'BD', name: 'Quận Ba Đình',
        wards: [
          { code: 'CD', name: 'Phường Cống Vị' },
          { code: 'DM', name: 'Phường Điện Biên' },
          { code: 'GD', name: 'Phường Giảng Võ' },
          { code: 'KM', name: 'Phường Kim Mã' },
          { code: 'LG', name: 'Phường Liễu Giai' },
          { code: 'NT', name: 'Phường Ngọc Hà' },
        ],
      },
      {
        code: 'CG', name: 'Quận Cầu Giấy',
        wards: [
          { code: 'DK', name: 'Phường Dịch Vọng' },
          { code: 'DKH', name: 'Phường Dịch Vọng Hậu' },
          { code: 'MY', name: 'Phường Mai Dịch' },
          { code: 'NHX', name: 'Phường Nghĩa Đô' },
          { code: 'NT', name: 'Phường Nghĩa Tân' },
          { code: 'QH', name: 'Phường Quan Hoa' },
          { code: 'TCV', name: 'Phường Trung Hòa' },
          { code: 'YH', name: 'Phường Yên Hòa' },
        ],
      },
      {
        code: 'TX', name: 'Quận Thanh Xuân',
        wards: [
          { code: 'HM', name: 'Phường Hạ Đình' },
          { code: 'KG', name: 'Phường Khương Đình' },
          { code: 'KM', name: 'Phường Khương Mai' },
          { code: 'NT', name: 'Phường Nhân Chính' },
          { code: 'TX', name: 'Phường Thanh Xuân Bắc' },
          { code: 'TXN', name: 'Phường Thanh Xuân Nam' },
        ],
      },
      {
        code: 'DD', name: 'Quận Đống Đa',
        wards: [
          { code: 'CT', name: 'Phường Cát Linh' },
          { code: 'HC', name: 'Phường Hàng Bột' },
          { code: 'KT', name: 'Phường Khâm Thiên' },
          { code: 'LH', name: 'Phường Láng Hạ' },
          { code: 'LT', name: 'Phường Láng Thượng' },
          { code: 'ND', name: 'Phường Nam Đồng' },
        ],
      },
    ],
  },
  {
    code: 'DN',
    name: 'Đà Nẵng',
    districts: [
      {
        code: 'HC', name: 'Quận Hải Châu',
        wards: [
          { code: 'TT', name: 'Phường Thanh Bình' },
          { code: 'TB', name: 'Phường Thuận Phước' },
          { code: 'HCB', name: 'Phường Hải Châu I' },
          { code: 'HCN', name: 'Phường Hải Châu II' },
          { code: 'PA', name: 'Phường Phước Ninh' },
          { code: 'NHH', name: 'Phường Nam Dương' },
        ],
      },
      {
        code: 'TK', name: 'Quận Thanh Khê',
        wards: [
          { code: 'TKD', name: 'Phường Thanh Khê Đông' },
          { code: 'TKT', name: 'Phường Thanh Khê Tây' },
          { code: 'XHA', name: 'Phường Xuân Hà' },
          { code: 'TLV', name: 'Phường Tam Thuận' },
          { code: 'AN', name: 'Phường An Khê' },
        ],
      },
    ],
  },
  {
    code: 'LD',
    name: 'Lâm Đồng',
    districts: [
      {
        code: 'DL', name: 'TP. Đà Lạt',
        wards: [
          { code: 'P1', name: 'Phường 1' },
          { code: 'P2', name: 'Phường 2' },
          { code: 'P3', name: 'Phường 3' },
          { code: 'P4', name: 'Phường 4' },
          { code: 'P5', name: 'Phường 5' },
          { code: 'P6', name: 'Phường 6' },
          { code: 'P7', name: 'Phường 7' },
          { code: 'P8', name: 'Phường 8' },
          { code: 'P9', name: 'Phường 9' },
          { code: 'P10', name: 'Phường 10' },
        ],
      },
      {
        code: 'BL', name: 'TP. Bảo Lộc',
        wards: [
          { code: 'LPD', name: 'Phường Lộc Phát' },
          { code: 'LSN', name: 'Phường Lộc Sơn' },
          { code: 'LTI', name: 'Phường Lộc Tiến' },
          { code: 'P1', name: 'Phường 1' },
          { code: 'P2', name: 'Phường 2' },
          { code: 'PBP', name: 'Phường B\'Lao' },
        ],
      },
    ],
  },
  {
    code: 'BD',
    name: 'Bình Dương',
    districts: [
      {
        code: 'TDM', name: 'TP. Thủ Dầu Một',
        wards: [
          { code: 'HD', name: 'Phường Hiệp Thành' },
          { code: 'PH', name: 'Phường Phú Hòa' },
          { code: 'PL', name: 'Phường Phú Lợi' },
          { code: 'PH2', name: 'Phường Phú Cường' },
          { code: 'CT', name: 'Phường Chánh Nghĩa' },
          { code: 'DH', name: 'Phường Định Hòa' },
        ],
      },
      {
        code: 'DAN', name: 'TP. Dĩ An',
        wards: [
          { code: 'DA', name: 'Phường Dĩ An' },
          { code: 'TDB', name: 'Phường Tân Đông Hiệp' },
          { code: 'BD', name: 'Phường Bình Thắng' },
          { code: 'AB', name: 'Phường An Bình' },
          { code: 'BH', name: 'Phường Bình An' },
        ],
      },
    ],
  },
  {
    code: 'DDN',
    name: 'Đồng Nai',
    districts: [
      {
        code: 'BH', name: 'TP. Biên Hòa',
        wards: [
          { code: 'TH', name: 'Phường Trảng Dài' },
          { code: 'THA', name: 'Phường Tân Phong' },
          { code: 'BHI', name: 'Phường Bình Đa' },
          { code: 'TA', name: 'Phường Tam Hiệp' },
          { code: 'QH', name: 'Phường Quang Vinh' },
          { code: 'HN', name: 'Phường Hóa An' },
        ],
      },
    ],
  },
];

// Helper functions
export function getProvinces(): { code: string; name: string }[] {
  return provinces.map(p => ({ code: p.code, name: p.name }));
}

export function getDistricts(provinceCode: string): { code: string; name: string }[] {
  const province = provinces.find(p => p.code === provinceCode);
  return province?.districts.map(d => ({ code: d.code, name: d.name })) ?? [];
}

export function getWards(provinceCode: string, districtCode: string): { code: string; name: string }[] {
  const province = provinces.find(p => p.code === provinceCode);
  const district = province?.districts.find(d => d.code === districtCode);
  return district?.wards.map(w => ({ code: w.code, name: w.name })) ?? [];
}

export function getProvinceName(code: string): string {
  return provinces.find(p => p.code === code)?.name ?? code;
}

export function getDistrictName(provinceCode: string, districtCode: string): string {
  const province = provinces.find(p => p.code === provinceCode);
  return province?.districts.find(d => d.code === districtCode)?.name ?? districtCode;
}

export function getWardName(provinceCode: string, districtCode: string, wardCode: string): string {
  const province = provinces.find(p => p.code === provinceCode);
  const district = province?.districts.find(d => d.code === districtCode);
  return district?.wards.find(w => w.code === wardCode)?.name ?? wardCode;
}

// Address book management (localStorage)
const STORAGE_KEY = 'robustta-addresses';

export function getSavedAddresses(): SavedAddress[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveAddress(address: SavedAddress): void {
  const addresses = getSavedAddresses();
  if (address.isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }
  const existingIndex = addresses.findIndex(a => a.id === address.id);
  if (existingIndex >= 0) {
    addresses[existingIndex] = address;
  } else {
    addresses.push(address);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

export function deleteAddress(id: string): void {
  const addresses = getSavedAddresses().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

export function getDefaultAddress(): SavedAddress | undefined {
  return getSavedAddresses().find(a => a.isDefault);
}

// Shipping fee calculation based on province
export function getShippingFeeByProvince(provinceCode: string, subtotal: number): number {
  if (subtotal >= 500000) return 0; // Free shipping threshold
  const feeMap: Record<string, number> = {
    'HCM': 25000,
    'BD': 30000,
    'DDN': 30000,
    'HN': 45000,
    'DN': 40000,
    'LD': 35000,
  };
  return feeMap[provinceCode] ?? 45000;
}
