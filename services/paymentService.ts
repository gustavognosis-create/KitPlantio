

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message?: string;
}

export interface PixData {
  qrCode: string; // Base64 image
  copyPaste: string;
  expiresIn: number; // seconds
}

// Simula geração de QR Code PIX
export const generatePixPayment = async (amount: number): Promise<PixData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Verifica se há configuração real de pagamento
  const accessToken = localStorage.getItem('PAYMENT_ACCESS_TOKEN');
  const provider = localStorage.getItem('PAYMENT_PROVIDER') || 'mercadopago';

  if (accessToken) {
     console.log(`[PaymentService] Usando provedor ${provider} com token configurado.`);
     console.log(`[PaymentService] Simulando chamada real de PIX para API...`);
     // Aqui entraria a chamada real: await fetch('https://api.mercadopago.com/v1/payments'...)
  } else {
     console.log("[PaymentService] Modo Demonstração: Usando chaves mockadas.");
  }
  
  return {
    qrCode: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png",
    copyPaste: "00020126330014BR.GOV.BCB.PIX0114+5527999279902520400005303986540510.005802BR5913MyPlant Ltda6008Sao Paulo62070503***63041D3D",
    expiresIn: 300 // 5 minutos
  };
};

// Simula processamento de Cartão de Crédito
export const processCreditCardPayment = async (
  cardData: { number: string; name: string; expiry: string; cvc: string }, 
  amount: number,
  installments: number
): Promise<PaymentResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Validação básica simulada
  if (cardData.number.length < 13) {
      throw new Error("Número de cartão inválido");
  }

  // Verifica configuração real
  const accessToken = localStorage.getItem('PAYMENT_ACCESS_TOKEN');
  
  if (accessToken) {
      console.log(`[PaymentService] Processando cartão via API Real (Simulado)...`);
      // Em produção, nunca envie dados de cartão diretamente sem usar a SDK do provedor (Tokenização)
  }

  return {
    success: true,
    transactionId: "TX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    message: "Pagamento aprovado com sucesso!"
  };
};
