export type Stat = { value: number; prefix?: string; suffix: string; label: string };

export const STATS: Stat[] = [
  { value: 5, suffix: "+", label: "Years of ABAP delivery" },
  { value: 60, suffix: "+", label: "Custom objects remediated" },
  { value: 50, prefix: "€", suffix: "K+", label: "Third-party spend avoided" },
  { value: 16, suffix: "×", label: "Consecutive INSTA awards" },
  { value: 40, suffix: "%", label: "Less manual workflow time" },
  { value: 30, suffix: "%", label: "Lighter custom footprint" },
];
