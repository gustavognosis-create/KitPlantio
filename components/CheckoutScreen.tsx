
import React, { useState, useEffect } from 'react';
import { CreditCard, QrCode, Lock, CheckCircle, Loader2, ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react';
import { generatePixPayment, processCreditCardPayment, PixData } from '../services/paymentService';

interface CheckoutScreenProps {
  total: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ total, onSuccess, onCancel }) => {
  const [method, setMethod] = useState<'credit_card' | 'pix'>('credit_card');
  const [loading, setLoading] = useState(false);
  
  // Pix State
  const [pixData, setPixData] = useState<PixData | null>(null);

  // Credit Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [installments, setInstallments] = useState(1);

  useEffect(() => {
    if (method === 'pix' && !pixData) {
        setLoading(true);
        generatePixPayment(total).then(data => {
            setPixData(data);
            setLoading(false);
        });
    }
  }, [method, total]);

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        await processCreditCardPayment(
            { number: cardNumber, name: cardName, expiry, cvc }, 
            total, 
            installments
        );
        onSuccess();
    } catch (error) {
        alert("Erro no pagamento: " + error);
        setLoading(false);
    }
  };

  const handlePixCheck = () => {
      setLoading(true);
      // Simula verificação do banco
      setTimeout(() => {
          onSuccess();
      }, 1500);
  };

  // Formatadores
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(val.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val.substring(0, 5));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
       <button onClick={onCancel} className="flex items-center text-stone-500 hover:text-stone-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Carrinho
       </button>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda - Métodos */}
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-2xl font-serif font-bold text-stone-800">Pagamento Seguro</h2>
             
             {/* Seletor de Método */}
             <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setMethod('credit_card')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${method === 'credit_card' ? 'bg-leaf-50 border-leaf-500 ring-1 ring-leaf-500 text-leaf-800' : 'bg-white border-stone-200 text-stone-500 hover:border-leaf-300'}`}
                >
                    <CreditCard className="w-8 h-8" />
                    <span className="font-bold">Cartão de Crédito</span>
                </button>
                <button 
                    onClick={() => setMethod('pix')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${method === 'pix' ? 'bg-leaf-50 border-leaf-500 ring-1 ring-leaf-500 text-leaf-800' : 'bg-white border-stone-200 text-stone-500 hover:border-leaf-300'}`}
                >
                    <QrCode className="w-8 h-8" />
                    <span className="font-bold">PIX (5% off)</span>
                </button>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                {method === 'credit_card' ? (
                    <form onSubmit={handleCardPayment} className="space-y-6 animate-in fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-stone-700">Dados do Cartão</h3>
                            <div className="flex gap-2">
                                <div className="w-8 h-5 bg-stone-200 rounded"></div>
                                <div className="w-8 h-5 bg-stone-200 rounded"></div>
                                <div className="w-8 h-5 bg-stone-200 rounded"></div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Número do Cartão</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-leaf-500 focus:border-leaf-500"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    required
                                />
                                <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-stone-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Nome no Cartão</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-leaf-500 focus:border-leaf-500 uppercase"
                                placeholder="COMO ESTÁ NO CARTÃO"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Validade</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-leaf-500 focus:border-leaf-500"
                                    placeholder="MM/AA"
                                    value={expiry}
                                    onChange={handleExpiryChange}
                                    maxLength={5}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">CVC</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-leaf-500 focus:border-leaf-500"
                                        placeholder="123"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0,4))}
                                        maxLength={4}
                                        required
                                    />
                                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-stone-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                             <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Parcelamento</label>
                             <select 
                                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-leaf-500 focus:border-leaf-500 bg-white"
                                value={installments}
                                onChange={(e) => setInstallments(Number(e.target.value))}
                             >
                                 <option value={1}>1x de R$ {total.toFixed(2).replace('.', ',')} (Sem juros)</option>
                                 <option value={2}>2x de R$ {(total/2).toFixed(2).replace('.', ',')} (Sem juros)</option>
                                 <option value={3}>3x de R$ {(total/3).toFixed(2).replace('.', ',')} (Sem juros)</option>
                             </select>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Confirmar Pagamento</>}
                        </button>
                    </form>
                ) : (
                    <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in">
                        <div className="bg-green-50 p-4 rounded-full">
                            <QrCode className="w-12 h-12 text-green-600" />
                        </div>
                        
                        {!pixData ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="w-8 h-8 text-leaf-500 animate-spin mb-2" />
                                <p className="text-stone-500">Gerando QR Code...</p>
                            </div>
                        ) : (
                            <div className="w-full max-w-sm space-y-6">
                                <div className="bg-white p-4 border border-stone-200 rounded-xl shadow-inner mx-auto w-64 h-64 flex items-center justify-center">
                                    <img src={pixData.qrCode} alt="QR Code PIX" className="w-full h-full object-contain" />
                                </div>
                                
                                <div>
                                    <p className="text-sm font-bold text-stone-600 mb-2">Código Copia e Cola</p>
                                    <div className="flex gap-2">
                                        <input 
                                            readOnly 
                                            value={pixData.copyPaste} 
                                            className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-500 truncate"
                                        />
                                        <button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(pixData.copyPaste);
                                                alert("Código copiado!");
                                            }}
                                            className="px-4 py-2 bg-leaf-100 text-leaf-700 font-bold rounded-lg text-xs hover:bg-leaf-200"
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-left">
                                    <Smartphone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-blue-800">Abra o app do seu banco</p>
                                        <p className="text-xs text-blue-600">Escaneie o QR Code ou use o Copia e Cola. O pagamento é aprovado na hora.</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={handlePixCheck}
                                    disabled={loading}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all"
                                >
                                    {loading ? 'Verificando...' : 'Já fiz o pagamento'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
             </div>
          </div>

          {/* Coluna da Direita - Resumo */}
          <div className="space-y-6">
             <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 h-fit sticky top-24">
                <h3 className="font-bold text-stone-800 mb-4 text-lg">Resumo da Compra</h3>
                <div className="space-y-3 mb-6 pb-6 border-b border-stone-200">
                    <div className="flex justify-between text-stone-600 text-sm">
                        <span>Produtos</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {method === 'pix' && (
                        <div className="flex justify-between text-green-600 text-sm font-bold">
                            <span>Desconto PIX (5%)</span>
                            <span>- R$ {(total * 0.05).toFixed(2).replace('.', ',')}</span>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-stone-600 font-bold">Total a pagar</span>
                    <span className="text-2xl font-bold text-stone-800">
                        R$ {(method === 'pix' ? total * 0.95 : total).toFixed(2).replace('.', ',')}
                    </span>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-2 text-stone-400 text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    Ambiente 100% Seguro
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};
