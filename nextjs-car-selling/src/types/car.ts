// nextjs-car-selling/types/car.ts

export type Fuel = "benzin" | "diesel" | "hybrid" | "electric" | "lpg";
export type Gearbox = "automatic" | "manual" | (string & {});

export interface SlugRef {
  current: string;
}

export interface ImageRef {
  asset: { _ref: string };
}

export interface CarDoc {
  _id: string;
  brand: string;
  model: string;
  slug: SlugRef;
  price?: number | null;
  mileage?: number | null;
  year?: number | null;
  fuel?: Fuel | string | null;
  drivetrain?: string | null;
  gearbox?: Gearbox | null;
  engine?: string | null;
  engineSize?: string | number | null;
  engineLiters?: number | null;
  mainImage?: ImageRef | null;
  equipmentText?: string | null;
  status: "available" | "reserved" | "sold";
  featured?: boolean | null;
}
