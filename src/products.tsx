export type Product = {
  name: string;
  sku: string;
  category: string;
  priceGross: number;
  status: "Dostępny" | "Niedostępny";
  stock: number | "—";
};

export const products: Product[] = [
  {
    name: "MacBook Pro 14",
    sku: "MBP14M3PRO",
    category: "Komputery",
    priceGross: 9999.0,
    status: "Dostępny",
    stock: "—",
  },
  {
    name: "Galaxy S24 Ultra",
    sku: "SGS24U256",
    category: "Telefony",
    priceGross: 6299.0,
    status: "Dostępny",
    stock: 45,
  },
  {
    name: "Sony WH-1000XM5",
    sku: "SNWH1000XM5",
    category: "RTV",
    priceGross: 1599.0,
    status: "Dostępny",
    stock: "—",
  },
  {
    name: "Bosch Serie 6 WAU28P40",
    sku: "BSWAU28P40",
    category: "AGD",
    priceGross: 3299.0,
    status: "Niedostępny",
    stock: 0,
  },
  {
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK",
    category: "Akcesoria",
    priceGross: 179.0,
    status: "Dostępny",
    stock: "—",
  },
  {
    name: "IPhone 15 Pro 256GB",
    sku: "APLIP15P256",
    category: "Telefony",
    priceGross: 7499.0,
    status: "Dostępny",
    stock: "—",
  },
  {
    name: 'LG OLED 55" B3',
    sku: "LGOLED55B3",
    category: "RTV",
    priceGross: 4999.0,
    status: "Niedostępny",
    stock: 0,
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    sku: "SGBUDS2PRO",
    category: "Akcesoria",
    priceGross: 899.0,
    status: "Dostępny",
    stock: 60,
  },
  {
    name: "Logitech MX Master 3S",
    sku: "LOGMX3SBLK",
    category: "Akcesoria",
    priceGross: 429.0,
    status: "Dostępny",
    stock: "—",
  },
  {
    name: "Dell XPS 13",
    sku: "DXLXPS13931",
    category: "Komputery",
    priceGross: 7199.0,
    status: "Dostępny",
    stock: 15,
  },
  {
    name: "Apple Watch SE",
    sku: "APLWATCHSE",
    category: "Akcesoria",
    priceGross: 1499.0,
    status: "Niedostępny",
    stock: 0,
  },
  {
    name: "Philips Robot odkurzający",
    sku: "PHPVR20AQ",
    category: "AGD",
    priceGross: 1899.0,
    status: "Dostępny",
    stock: 8,
  },
];

export const AddProductSteps = [
  { number: 1, title: "Informacje", subtitle: "Dane podstawowe" },
  { number: 2, title: "Cena", subtitle: "Dane cenowe" },
  { number: 3, title: "Dostępność", subtitle: "Stany magazynowe" },
];
