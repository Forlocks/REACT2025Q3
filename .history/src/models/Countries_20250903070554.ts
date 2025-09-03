export type Countries = Record<string, {
  iso_code: string;
  data: Record<string, Record<string>>;
}>;
