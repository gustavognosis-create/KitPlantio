
import { Order } from "../types";

export interface ShippingOption {
  id: number;
  name: string;
  price: number;
  days: number; // Dias totais (Transporte + Produção)
  carrierDays: number; // Apenas dias de transporte
  productionDays: number; // Apenas dias de produção
  company: string;
  logoUrl?: string; // Opcional para logos reais
}

export const calculateShippingQuote = async (cep: string, quantity: number = 30): Promise<ShippingOption[]> => {
  // Simula um delay de rede
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Validação simples de CEP
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido");
  }

  // --- INTEGRAÇÃO MELHOR ENVIO ---
  const meToken = localStorage.getItem('ME_TOKEN');
  if (meToken) {
      console.log("Token Melhor Envio encontrado. Usando token para cálculo (Simulado devido a CORS):", meToken.substring(0, 10) + "...");
  }
  
  // --- PARÂMETROS DE PESO E DIMENSÃO ---
  
  // Atualizado: 50g por unidade (0.05kg)
  const UNIT_REAL_WEIGHT_KG = 0.05; 
  
  // Dimensão unitária da caixinha: 6cm x 6cm x 6cm
  // Volume unitário = 216 cm3
  const UNIT_VOLUME_CM3 = 6 * 6 * 6;
  
  // Peso Cúbico (Padrão transportadoras: Volume / 6000)
  // Peso Cúbico Unitário = 216 / 6000 = 0.036 kg
  const UNIT_CUBIC_WEIGHT_KG = UNIT_VOLUME_CM3 / 6000;

  // O peso cobrado é o maior entre o real e o cúbico
  // Transportadoras cobram pelo espaço ocupado se for leve demais
  const chargeableWeightPerUnit = Math.max(UNIT_REAL_WEIGHT_KG, UNIT_CUBIC_WEIGHT_KG);
  
  const totalChargeableWeight = quantity * chargeableWeightPerUnit;

  // --- LÓGICA DE TARIFAS POR REGIÃO (ORIGEM: ES) ---
  
  let regionBasePrice = 0;   // Preço do primeiro Kg
  let pricePerExtraKg = 0;   // Preço por Kg adicional
  let regionDays = 0;

  const firstDigit = parseInt(cleanCep.substring(0, 1));
  const firstTwoDigits = parseInt(cleanCep.substring(0, 2));

  if (firstTwoDigits === 29) {
      // Espírito Santo (Local/Estadual)
      regionBasePrice = 16.50; // Base mais barata p/ 1kg
      pricePerExtraKg = 2.50;  // Kg adicional barato
      regionDays = 3;
  } else if (firstDigit === 0 || firstDigit === 1 || firstDigit === 2 || firstDigit === 3) {
      // Sudeste (SP, RJ, MG) - exceto ES
      regionBasePrice = 22.90;
      pricePerExtraKg = 5.50;
      regionDays = 5;
  } else if (firstDigit === 8 || firstDigit === 4) {
      // Sul (PR, SC, RS) e Bahia
      regionBasePrice = 29.90;
      pricePerExtraKg = 8.90;
      regionDays = 7;
  } else {
      // Centro-Oeste, Norte, Nordeste (Mais caro)
      regionBasePrice = 38.90;
      pricePerExtraKg = 14.50;
      regionDays = 12;
  }

  // --- CÁLCULO FINAL DO PREÇO ---
  // O preço base cobre até 1kg. O restante é cobrado como quilo adicional.
  const extraWeight = Math.max(0, totalChargeableWeight - 1);
  const finalBasePrice = regionBasePrice + (extraWeight * pricePerExtraKg);

  // PRAZO DE PRODUÇÃO
  const productionDays = quantity <= 100 ? 5 : 10;

  // Tempos de transporte (Carrier Days) com margem de segurança
  const pacCarrierDays = regionDays + 2;
  const sedexCarrierDays = Math.max(1, Math.floor(regionDays / 2));
  const jadlogCarrierDays = regionDays + 1;

  return [
    {
      id: 1,
      company: "Correios",
      name: "PAC",
      price: finalBasePrice,
      carrierDays: pacCarrierDays,
      productionDays: productionDays,
      days: pacCarrierDays + productionDays, 
    },
    {
      id: 2,
      company: "Correios",
      name: "SEDEX",
      price: finalBasePrice * 1.6, // Sedex costuma ser 60-80% mais caro
      carrierDays: sedexCarrierDays,
      productionDays: productionDays,
      days: sedexCarrierDays + productionDays,
    },
    {
      id: 3,
      company: "Jadlog",
      name: ".Package",
      price: finalBasePrice * 0.90, // Jadlog competitivo para cargas fracionadas (cúbico)
      carrierDays: jadlogCarrierDays,
      productionDays: productionDays,
      days: jadlogCarrierDays + productionDays,
    }
  ];
};

// Nova Função: Gerar Etiqueta de Envio
export const generateShippingLabel = async (order: Order): Promise<{ trackingCode: string, shippingService: string }> => {
    // Simula comunicação com a API (Melhor Envio)
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!order.address) {
        throw new Error("Endereço do cliente não encontrado.");
    }

    // Gera um código de rastreio fictício
    const service = "Correios - SEDEX"; // Default simulado
    const tracking = `MY${Math.floor(Math.random() * 1000000000)}BR`;

    return {
        trackingCode: tracking,
        shippingService: service
    };
};
