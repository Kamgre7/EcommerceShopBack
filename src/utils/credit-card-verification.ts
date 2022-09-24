import * as valid from 'card-validator';

export const creditCardVerification = (
  creditCard,
  creditCardCvc,
  expDate,
): boolean => {
  const { isValid: isValidCreditCard } = valid.number(creditCard, {
    luhnValidateUnionPay: true,
  });
  const { isValid: isValidExpiratioNDate } = valid.expirationDate(expDate);
  const { isValid: isValidCvc } = valid.cvv(creditCardCvc);

  return isValidCreditCard && isValidExpiratioNDate && isValidCvc;
};
