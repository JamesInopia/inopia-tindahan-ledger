// src/data/summary.ts
import type { Customer } from "./customers";

export function summarise(customers: Customer[]) {
  const total = customers.reduce((sum, c) => sum + c.balance, 0);
  const owing = customers.filter((c) => c.balance > 0);
  const average = owing.length === 0 ? 0 : total / owing.length;
  const ranked = [...owing]
    .sort((a, b) => b.balance - a.balance)
    .map((c) => ({ ...c, share: total === 0 ? 0 : c.balance / total }));

  return {
    total,
    average,
    count: customers.length,
    owing: owing.length,
    settled: customers.length - owing.length,
    ranked,
  };
}
