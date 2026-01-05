
import React, { useState, useEffect } from 'react';
import { Truck, Search, Loader2, MapPin, Package, Clock } from 'lucide-react';
import { calculateShippingQuote, ShippingOption } from '../services/shippingService';

interface ShippingCalculatorProps {
  onSelectOption?: (option: ShippingOption) => void;
  selectedOptionId?: number | null;
  quantity?: number;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onSelectOption, selectedOptionId, quantity = 30 }) => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [error, setError] = useState('');

  // Limpa as opções se a quantidade mudar muito drasticamente, forçando o usuário a recalcular se desejar
  useEffect(() => {
    if (options.length > 0) {
        // Opcional: Poderíamos recalcular automaticamente, mas em frete melhor deixar o usuário clicar
        setOptions([]);
    }
  }, [quantity]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, '').length !== 8) {
      setError('Digite um CEP válido');
      return;
    }

    setLoading(true);
    setError('');
    setOptions([]);

    try {
      const data = await calculateShippingQuote(cep, quantity);
      setOptions(data);
    } catch (err) {
      setError('Erro ao calcular frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substr(0, 9);
  };

  return (
    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
      <h4 className="font-bold text-stone-700 text-sm mb-3 flex items-center gap-2">
        <Truck className="w-4 h-4 text-leaf-600" /> Calcular Frete e Prazo {quantity > 1 && <span className="text-xs font-normal text-stone-500">({quantity} itens)</span>}
      </h4>
      
      <form onSubmit={handleCalculate} className="flex gap-2 mb-4">
        <div className="relative flex-1">
            <input
            type="text"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            placeholder="00000-000"
            className="w-full pl-9 pr-4 py-2 text-sm border border-stone-300 rounded-lg focus:ring-leaf-500 focus:border-leaf-500"
            maxLength={9}
            />
            <MapPin className="absolute left-2.5 top-2.5 w-4 h-4 text-stone-400" />
        </div>
        <button 
            type="submit"
            disabled={loading}
            className="bg-leaf-600 hover:bg-leaf-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'OK'}
        </button>
      </form>

      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

      {options.length > 0 && (
        <div className="space-y-2 animate-in slide-in-from-top-2">
          <p className="text-xs text-stone-500 mb-2 flex items-center gap-1">
             <Package className="w-3 h-3" /> Cotação via <strong>Melhor Envio</strong>
          </p>
          {options.map((opt) => (
            <div 
                key={opt.id}
                onClick={() => onSelectOption && onSelectOption(opt)}
                className={`flex justify-between items-start p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedOptionId === opt.id 
                    ? 'bg-green-50 border-green-500 ring-1 ring-green-500' 
                    : 'bg-white border-stone-200 hover:border-leaf-300'
                }`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-bold text-stone-800 text-sm">{opt.company} <span className="font-normal text-stone-600">- {opt.name}</span></span>
                
                {/* Tempo da Transportadora */}
                <span className="text-xs text-stone-500 flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Transporte: {opt.carrierDays} dias úteis
                </span>

                {/* Tempo Total com Produção */}
                <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-md w-fit mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Entrega total: até {opt.days} dias úteis (c/ produção)
                </span>
              </div>
              <div className="font-bold text-leaf-700 whitespace-nowrap">
                R$ {opt.price.toFixed(2).replace('.', ',')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};