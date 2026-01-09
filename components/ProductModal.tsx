
import React, { useState, useRef } from 'react';
import { Product, CartItem } from '../types';
import { X, Check, Sprout, MessageSquareQuote, Loader2, Sparkles, PenTool, Upload, Image as ImageIcon, Trash2, FileText, Clock, AlertCircle, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { generateCreativeSuggestions } from '../services/geminiService';
import { ShippingCalculator } from './ShippingCalculator';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(product.minOrder);
  const [selectedSeed, setSelectedSeed] = useState(product.availableSeeds[0]);
  const [isOtherSeed, setIsOtherSeed] = useState(false);
  const [customSeedName, setCustomSeedName] = useState('');
  
  const [customText, setCustomText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // AI Helper State
  const [eventType, setEventType] = useState('Aniversário');
  const [tone, setTone] = useState('Alegre');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleAddToCart = () => {
    const finalSeed = isOtherSeed 
        ? (customSeedName.trim() || "Semente Personalizada") 
        : selectedSeed;

    onAddToCart({
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      quantity,
      selectedSeed: finalSeed,
      customText: customText || "Sem personalização de texto",
      uploadedImage: uploadedImage,
      uploadedFileName: uploadedFileName
    });
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedImage(null);
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isPdf = uploadedImage?.startsWith('data:application/pdf');

  const handleAiHelp = async () => {
    setIsGenerating(true);
    try {
      const suggestion = await generateCreativeSuggestions(eventType, product.title, tone);
      setAiSuggestion(suggestion);
    } catch (error) {
      setAiSuggestion("Não foi possível conectar à IA criativa no momento.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    const url = window.location.href;
    const text = `Confira este ${product.title} na MyPlant: `;
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
    }
    window.open(shareUrl, '_blank');
  };

  const seedOptions = [...product.availableSeeds, 'Outro'];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1470&auto=format&fit=crop';
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-stone-200">
          
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button 
              onClick={() => setShowShareOptions(!showShareOptions)} 
              className="bg-white/80 p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500 shadow-sm"
              title="Compartilhar"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="bg-white/80 p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500 shadow-sm">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Share Options Tooltip/Menu */}
          {showShareOptions && (
            <div className="absolute top-16 right-14 z-20 bg-white border border-stone-100 shadow-xl rounded-xl p-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
               <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-lg text-sm text-stone-600 transition-colors">
                  <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
               </button>
               <button onClick={() => handleShare('facebook')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-lg text-sm text-stone-600 transition-colors">
                  <Facebook className="w-4 h-4 text-blue-600" /> Facebook
               </button>
               <button onClick={() => handleShare('twitter')} className="flex items-center gap-2 px-3 py-2 hover:bg-sky-50 rounded-lg text-sm text-stone-600 transition-colors">
                  <Twitter className="w-4 h-4 text-sky-400" /> Twitter
               </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Image Side */}
            <div className="h-64 md:h-full bg-stone-100 relative">
               <img 
                 src={product.imageUrl} 
                 alt={product.title} 
                 onError={handleImageError}
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-leaf-700 shadow-sm">
                  Pedido Mínimo: {product.minOrder} un.
               </div>
            </div>

            {/* Details Side */}
            <div className="p-6 md:p-8 flex flex-col h-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">{product.title}</h2>
              <p className="text-leaf-600 font-bold text-xl mb-4">
                R$ {product.price.toFixed(2).replace('.', ',')} 
                <span className="text-sm text-stone-400 font-normal ml-1">/ unidade</span>
              </p>
              
              <p className="text-stone-600 text-sm mb-6 leading-relaxed border-b border-stone-100 pb-6">
                {product.description}
              </p>

              {/* Customization Form */}
              <div className="space-y-6 flex-1">
                
                {/* Seeds */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-leaf-500" /> Escolha a Semente/Planta
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {seedOptions.map(seed => (
                      <button
                        key={seed}
                        onClick={() => {
                            if (seed === 'Outro') {
                                setIsOtherSeed(true);
                                setSelectedSeed('Outro');
                            } else {
                                setIsOtherSeed(false);
                                setSelectedSeed(seed);
                            }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                          selectedSeed === seed 
                          ? 'bg-leaf-100 border-leaf-500 text-leaf-800 ring-1 ring-leaf-500' 
                          : 'bg-white border-stone-200 text-stone-600 hover:border-leaf-300'
                        }`}
                      >
                        {seed}
                      </button>
                    ))}
                  </div>

                  {/* Campo extra para 'Outro' */}
                  {isOtherSeed && (
                      <div className="animate-in fade-in slide-in-from-top-2">
                          <div className="relative">
                            <input 
                                type="text"
                                value={customSeedName}
                                onChange={(e) => setCustomSeedName(e.target.value)}
                                placeholder="Qual semente você deseja? (Ex: Manjericão Roxo)"
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-300 focus:ring-leaf-500 focus:border-leaf-500 text-sm"
                                autoFocus
                            />
                            <PenTool className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                          </div>
                          <p className="text-xs text-stone-500 mt-1 ml-1">*Sujeito a disponibilidade sob consulta</p>
                      </div>
                  )}
                </div>

                {/* Text & Image Customization */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                        <MessageSquareQuote className="w-4 h-4 text-leaf-500" /> Personalização da Embalagem
                    </label>

                    {/* Text Area */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                             <span className="text-xs text-stone-500">Texto/Frase:</span>
                             <span className="text-xs text-stone-400">{customText.length}/50 chars</span>
                        </div>
                        <textarea
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value.slice(0, 50))}
                            placeholder="Ex: Aniversário da Ana - 5 anos"
                            className="w-full rounded-lg border-stone-300 shadow-sm focus:border-leaf-500 focus:ring-leaf-500 text-sm p-3 h-20 resize-none bg-white"
                        />
                    </div>

                    {/* File Upload (Image or PDF) */}
                    <div className="mb-4">
                        <span className="text-xs text-stone-500 block mb-2">Sua Logo ou Arte (Opcional):</span>
                        
                        {!uploadedImage ? (
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-stone-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100 hover:border-leaf-400 transition-colors bg-white"
                            >
                                <Upload className="w-6 h-6 text-stone-400 mb-1" />
                                <span className="text-xs text-stone-600 font-medium">Clique para enviar arquivo</span>
                                <span className="text-[10px] text-stone-400">JPG, PNG ou PDF</span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*,application/pdf" 
                                    onChange={handleFileUpload}
                                />
                            </div>
                        ) : (
                            <div className="relative bg-white p-2 rounded-lg border border-stone-200 flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {isPdf ? (
                                        <FileText className="w-6 h-6 text-red-500" />
                                    ) : (
                                        <img src={uploadedImage} alt="Arte enviada" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-leaf-700 truncate">{uploadedFileName}</p>
                                    <p className="text-[10px] text-stone-500">{isPdf ? 'Documento PDF' : 'Imagem Pronta'}</p>
                                </div>
                                <button 
                                    onClick={handleRemoveFile}
                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* AI Assistant Section */}
                    <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span className="text-xs font-bold text-purple-700">Assistente Criativo IA (Texto)</span>
                        </div>
                        
                        {!aiSuggestion ? (
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <select 
                                        className="text-xs border-stone-200 rounded px-2 py-1"
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <option>Aniversário</option>
                                        <option>Casamento</option>
                                        <option>Corporativo</option>
                                        <option>Chá de Bebê</option>
                                    </select>
                                    <select 
                                        className="text-xs border-stone-200 rounded px-2 py-1"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                    >
                                        <option>Alegre</option>
                                        <option>Formal</option>
                                        <option>Romântico</option>
                                        <option>Gratidão</option>
                                    </select>
                                </div>
                                <button 
                                    onClick={handleAiHelp}
                                    disabled={isGenerating}
                                    className="w-full text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 py-1.5 rounded font-medium flex justify-center items-center gap-2 transition-colors"
                                >
                                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : "Sugerir Frase"}
                                </button>
                            </div>
                        ) : (
                            <div className="animate-in fade-in duration-300">
                                <p className="text-xs text-stone-600 italic mb-2 bg-stone-50 p-2 rounded border border-stone-100">"{aiSuggestion}"</p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setCustomText(aiSuggestion.substring(0, 50));
                                        }}
                                        className="text-xs text-purple-600 font-bold hover:underline"
                                    >
                                        Usar texto
                                    </button>
                                    <button 
                                        onClick={() => setAiSuggestion(null)}
                                        className="text-xs text-stone-400 hover:text-stone-600"
                                    >
                                        Tentar outro
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Shipping Calc for Product */}
                <div>
                   <ShippingCalculator quantity={quantity} />
                </div>

                {/* Quantity */}
                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-2">Quantidade</label>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                        <button 
                          className="px-3 py-1 hover:bg-stone-50 rounded-l-lg text-stone-600 disabled:opacity-50"
                          onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                          disabled={quantity <= product.minOrder}
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium text-stone-800">{quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-stone-50 rounded-r-lg text-stone-600"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-stone-500">
                         Total: <strong className="text-leaf-700">R$ {(quantity * product.price).toFixed(2).replace('.', ',')}</strong>
                      </span>
                   </div>
                   
                   {/* Prazo de Produção Info */}
                   <div className="mt-3 space-y-2">
                        <div className="text-xs flex items-center gap-1.5 p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
                            <Clock className="w-3.5 h-3.5" />
                            {quantity <= 100 ? (
                                <span className="font-medium">Prazo de produção: 5 dias úteis</span>
                            ) : (
                                <span className="font-medium">Acima de 100 un: Prazo sob consulta</span>
                            )}
                        </div>

                        {/* Aviso de Urgência */}
                        <div 
                            onClick={() => document.querySelector<HTMLAnchorElement>('a[aria-label="Falar no WhatsApp"]')?.click()}
                            className="text-xs flex items-start gap-1.5 p-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors"
                        >
                            <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-bold">Em caso de pedidos com muita urgência, entrar em contato no WhatsApp.</span>
                        </div>
                   </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-stone-300 rounded-xl text-stone-600 font-medium hover:bg-stone-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleAddToCart}
                  disabled={isOtherSeed && customSeedName.length < 3}
                  className="flex-[2] py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md shadow-orange-100 transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
                >
                  <Check className="w-5 h-5" /> Adicionar ao Carrinho
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
