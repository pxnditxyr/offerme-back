export const subparametersData = () => {
  const genderParameterId = 'gender'
  const genderSubparameters = [
    {
      name: 'Masculino',
      description: 'Masculino',
      parameterId: genderParameterId,
    },
    {
      name: 'Femenino',
      description: 'Femenino',
      parameterId: genderParameterId,
    },
    {
      name: 'No binario',
      description: 'No binario',
      parameterId: genderParameterId,
    },
    {
      name: 'Otro',
      description: 'Otro',
      parameterId: genderParameterId,
    },
  ]

  const documentTypeParameterId = 'document type'

  const documentTypeSubparameters = [
    {
      name: 'Carnet de identidad',
      description: 'Carnet de identidad',
      parameterId: documentTypeParameterId,
    },
    {
      name: 'Pasaporte',
      description: 'Pasaporte',
      parameterId: documentTypeParameterId,
    },
    {
      name: 'Licencia de conducir',
      description: 'Licencia de conducir',
      parameterId: documentTypeParameterId,
    },
    {
      name: 'Tarjeta de seguro social',
      description: 'Tarjeta de seguro social',
      parameterId: documentTypeParameterId,
    },
    {
      name: 'Tarjeta de residente',
      description: 'Tarjeta de residente',
      parameterId: documentTypeParameterId,
    }
  ]

  const phoneTypeParameterId = 'phone type'
  const phoneTypeSubparameters = [
    {
      name: 'Personal',
      description: 'Personal',
      parameterId: phoneTypeParameterId,
    },
    {
      name: 'Empresa',
      description: 'Empresa',
      parameterId: phoneTypeParameterId,
    },
    {
      name: 'Móvil',
      description: 'Móvil',
      parameterId: phoneTypeParameterId,
    },
    {
      name: 'Residencial',
      description: 'Residencial',
      parameterId: phoneTypeParameterId,
    },
    {
      name: 'Fax',
      description: 'Fax',
      parameterId: phoneTypeParameterId,
    },
  ]

  const companyTypeParameterId = 'company type'
  const companyTypeSubparameters = [
    {
      name: 'Corporación',
      description: 'Corporación',
      parameterId: companyTypeParameterId,
    },
    {
      name: 'PYME (Pequeña y Mediana Empresa)',
      description: 'PYME (Pequeña y Mediana Empresa)',
      parameterId: companyTypeParameterId,
    },
    {
      name: 'Start-up',
      description: 'Start-up',
      parameterId: companyTypeParameterId,
    },
    {
      name: 'Organización sin ánimo de lucro',
      description: 'Organización sin ánimo de lucro',
      parameterId: companyTypeParameterId,
    },
    {
      name: 'Gobierno',
      description: 'Gobierno',
      parameterId: companyTypeParameterId,
    },
  ]

  const productTypeParameterId = 'product type'
  const productTypeSubparameters = [
    {
      name: 'Accesorios',
      description: 'Electrónica',
      parameterId: productTypeParameterId,
    },
    {
      name: 'Ropa',
      description: 'Ropa',
      parameterId: productTypeParameterId,
    },
    {
      name: 'Alimentos',
      description: 'Alimentos',
      parameterId: productTypeParameterId,
    }
  ]

  const creditCardTypeParameterId = 'credit card type'
  const creditCardTypeSubparameters = [
    {
      name: 'Visa',
      description: 'Visa',
      parameterId: creditCardTypeParameterId,
    },
    {
      name: 'MasterCard',
      description: 'MasterCard',
      parameterId: creditCardTypeParameterId,
    },
    {
      name: 'American Express',
      description: 'American Express',
      parameterId: creditCardTypeParameterId,
    },
    {
      name: 'Discover',
      description: 'Discover',
      parameterId: creditCardTypeParameterId,
    },
    {
      name: 'Diners Club',
      description: 'Diners Club',
      parameterId: creditCardTypeParameterId,
    }
  ]

  const promotionRequestTypeParameterId = 'promotion request type'
  const promotionRequestTypeSubparameters = [
    {
      name: 'Descuento',
      description: 'Descuento',
      parameterId: promotionRequestTypeParameterId,
    },
    {
      name: 'Regalo con compra',
      description: 'Regalo con compra',
      parameterId: promotionRequestTypeParameterId,
    },
    {
      name: 'Programa de lealtad',
      description: 'Programa de lealtad',
      parameterId: promotionRequestTypeParameterId,
    },
    {
      name: 'Promoción de temporada',
      description: 'Promoción de temporada',
      parameterId: promotionRequestTypeParameterId,
    },
    {
      name: 'Oferta especial',
      description: 'Oferta especial',
      parameterId: promotionRequestTypeParameterId,
    },
    {
      name: 'Descuento porcentaje',
      description: 'Descuento porcentaje',
      parameterId: promotionRequestTypeParameterId,
    },
  ]

  const paymentMethodParameterId = 'payment method'
  const paymentMethodSubparameters = [
    {
      name: 'Factura',
      description: 'Factura',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Recibo',
      description: 'Recibo',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Contrato',
      description: 'Contrato',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Certificado',
      description: 'Certificado',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Declaración',
      description: 'Declaración',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Tarjeta de crédito',
      description: 'Tarjeta de crédito',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Tarjeta de débito',
      description: 'Tarjeta de débito',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Transferencia bancaria',
      description: 'Transferencia bancaria',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'PayPal',
      description: 'PayPal',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Efectivo',
      description: 'Efectivo',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Cheque',
      description: 'Cheque',
      parameterId: paymentMethodParameterId,
    },
    {
      name: 'Criptomoneda',
      description: 'Criptomoneda',
      parameterId: paymentMethodParameterId,
    },
  ]

  const currencyParameterId = 'currency'
  const currencySubparameters = [
    {
      name: 'Bs.',
      description: 'Boliviano',
      parameterId: currencyParameterId,
    },
    {
      name: 'USD',
      description: 'Dólar estadounidense',
      parameterId: currencyParameterId,
    },
    {
      name: 'EUR',
      description: 'Euro',
      parameterId: currencyParameterId,
    }
  ]

  return [
    ...genderSubparameters,
    ...documentTypeSubparameters,
    ...phoneTypeSubparameters,
    ...companyTypeSubparameters,
    ...productTypeSubparameters,
    ...creditCardTypeSubparameters,
    ...promotionRequestTypeSubparameters,
    ...paymentMethodSubparameters,
    ...currencySubparameters,
  ]

}
