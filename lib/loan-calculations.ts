export interface PaymentPlanItem {
  month: number;
  principalPayment: number;
  interestPayment: number;
  monthlyInstallment: number;
  remainingDebt: number;
}

export interface PaymentPlanResult {
  paymentPlan: PaymentPlanItem[];
  totalInterestPaid: number;
  monthlyInstallment: number;
}

/**
 * Kredi ödeme planını hesaplar.
 * @param loanAmount Kredi tutarı
 * @param annualInterestRate Yıllık faiz oranı (ondalık olarak, örn: 0.015)
 * @param months Vade (ay cinsinden)
 * @returns Ödeme planı, toplam ödenen faiz ve aylık taksit tutarı
 */
export const generatePaymentPlan = (loanAmount: number, annualInterestRate: number, months: number): PaymentPlanResult => {
  const monthlyInterestRate = annualInterestRate / 12;
  const paymentPlan: PaymentPlanItem[] = [];
  let remainingDebt = loanAmount;
  let totalInterestPaid = 0;

  let monthlyInstallment: number;

  if (monthlyInterestRate === 0) {
    monthlyInstallment = loanAmount / months;
  } else {
    monthlyInstallment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -months));
  }

  for (let i = 1; i <= months; i++) {
    const interestPayment = remainingDebt * monthlyInterestRate;
    const principalPayment = monthlyInstallment - interestPayment;

    remainingDebt -= principalPayment;
    totalInterestPaid += interestPayment;

    paymentPlan.push({
      month: i,
      principalPayment: principalPayment,
      interestPayment: interestPayment,
      monthlyInstallment: monthlyInstallment,
      remainingDebt: remainingDebt > 0 ? remainingDebt : 0,
    });
  }

  return { paymentPlan, totalInterestPaid, monthlyInstallment };
};
