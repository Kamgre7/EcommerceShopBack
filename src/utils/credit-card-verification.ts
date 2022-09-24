import * as valid from 'card-validator';

export const creditCardVerification = (
  creditCard,
  creditCardCvc,
  expDate,
): boolean => {
  const { isValid: isValidCreditCard } = valid.number(creditCard, {
    luhnValidateUnionPay: true,
  });
  const { isValid: isValidExpirationDate } = valid.expirationDate(expDate);
  const { isValid: isValidCvc } = valid.cvv(creditCardCvc);

  return isValidCreditCard && isValidExpirationDate && isValidCvc;
};
