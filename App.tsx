import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductModal } from './components/ProductModal';
import { ChatAssistant } from './components/ChatAssistant';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ShippingCalculator } from './components/ShippingCalculator';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginScreen } from './components/LoginScreen';
import { UserProfile } from './components/UserProfile';
import { CheckoutScreen } from './components/CheckoutScreen';
import { MOCK_PRODUCTS, MOCK_TESTIMONIALS, CATEGORIES, GALLERY_IMAGES, REELS_VIDEOS } from './constants';
import { Product, CartItem, ViewState, User } from './types';
import { Filter, Star, ShieldCheck, Heart, Trash2, ArrowRight, ShoppingCart, Sprout, Check, Quote, Mail, MapPin, Phone, Calendar, Gift, Briefcase, Baby, Globe, ImageIcon, FileText, Instagram, ChevronLeft, ChevronRight, Camera, Play, Loader2 } from 'lucide-react';
import { ShippingOption } from './services/shippingService';
import { supabase } from './lib/supabase';

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [selectedShippingId, setSelectedShippingId] = useState<number | null>(null);
  
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quoteFormQuantity, setQuoteFormQuantity] = useState(30);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Carregar produtos do Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts(MOCK_PRODUCTS); // Fallback
      } else if (data && data.length > 0) {
        // Mapear campos do banco para o tipo Product do front
        const mappedProducts = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          imageUrl: p.image_url,
          category: p.category,
          minOrder: p.min_order,
          availableSeeds: p.available_seeds
        }));
        setProducts(mappedProducts);
      } else {
        setProducts(MOCK_PRODUCTS);
      }
      setIsLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (viewState === ViewState.HOME && products.length > 0) {
        const interval = setInterval(() => {
            setFeaturedIndex((prev) => (prev + 4) % products.length);
        }, 6000);
        return () => clearInterval(interval);
    }
  }, [viewState, products.length]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setViewState(ViewState.ALL_PRODUCTS);
  };

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    setShippingCost(0);
    setSelectedShippingId(null);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const calculateSubTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubTotal() + shippingCost;
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setShippingCost(option.price);
    setSelectedShippingId(option.id);
  }

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setViewState(ViewState.HOME);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewState(ViewState.HOME);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1470&auto=format&fit=crop';
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
        const scrollAmount = 300;
        galleryScrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  const getRotatingFeaturedProducts = () => {
      if (products.length === 0) return [];
      const items = [];
      for (let i = 0; i < Math.min(4, products.length); i++) {
          const index = (featuredIndex + i) % products.length;
          items.push(products[index]);
      }
      return items;
  };

  const renderProductGrid = (productsList: Product[], title: string, showFilters = false) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h3 className="text-2xl font-serif font-bold text-stone-800">{title}</h3>
          
          {showFilters && (
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
               <Filter className="w-5 h-5 text-stone-400 hidden md:block" />
               {CATEGORIES.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat 
                      ? 'bg-leaf-600 text-white shadow-md shadow-leaf-200' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          )}
        </div>

        {isLoadingProducts ? (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-leaf-600 animate-spin mb-4" />
                <p className="text-stone-500 font-medium">Carregando catálogo MyPlant...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsList.map(product => (
                <div 
                key={product.id} 
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-in fade-in duration-700"
                onClick={() => handleProductClick(product)}
                >
                <div className="relative h-64 overflow-hidden rounded-t-2xl bg-stone-100">
                    <img 
                    src={product.imageUrl} 
                    alt={`Comprar ${product.title}`} 
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-5 h-5 text-orange-400 hover:fill-current" />
                    </div>
                </div>
                <div className="p-5">
                    <div className="text-xs font-bold text-leaf-600 mb-1 uppercase tracking-wider">{product.category}</div>
                    <h4 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-leaf-700 transition-colors line-clamp-1">{product.title}</h4>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                        <span className="text-xs text-stone-400">Pedido min: {product.minOrder}</span>
                        <span className="text-xl font-bold text-stone-800">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}

        {showFilters && (
            <div className="mt-24 pt-16 border-t border-stone-100">
                <div className="text-center mb-10">
                    <span className="text-leaf-600 font-bold uppercase tracking-wider text-sm">Prova Social</span>
                    <h3 className="text-3xl font-serif font-bold text-stone-800 mt-2">Clientes que Cultivaram Memórias</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MOCK_TESTIMONIALS.slice(0, 3).map(t => (
                        <div key={t.id} className="bg-stone-50 p-6 rounded-2xl border border-stone-100 relative hover:bg-white hover:shadow-md transition-all">
                            <Quote className="w-8 h-8 text-leaf-200 absolute top-4 right-4" />
                            <div className="flex items-center gap-2 mb-4">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                 ))}
                            </div>
                            <p className="text-stone-600 text-sm italic mb-4 line-clamp-4">"{t.content}"</p>
                            <div className="flex items-center gap-3">
                                 <img src={t.imageUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" onError={handleImageError} />
                                 <div>
                                     <p className="text-sm font-bold text-stone-800">{t.name}</p>
                                     <p className="text-xs text-stone-500">{t.role}</p>
                                 </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                     <button 
                       onClick={() => setViewState(ViewState.TESTIMONIALS)}
                       className="text-leaf-700 font-bold hover:underline text-sm"
                     >
                        Ler mais avaliações
                     </button>
                </div>
            </div>
        )}
    </div>
  );

  // Define renderGallery to fix "Cannot find name 'renderGallery'" error
  const renderGallery = () => (
    <div className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <span className="text-leaf-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4" /> Inspiração
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-stone-800">Ideias de Personalização</h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => scrollGallery('left')} className="p-2 rounded-full border border-stone-300 hover:bg-white hover:shadow-sm transition-all text-stone-600"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={() => scrollGallery('right')} className="p-2 rounded-full border border-stone-300 hover:bg-white hover:shadow-sm transition-all text-stone-600"><ChevronRight className="w-5 h-5" /></button>
                </div>
            </div>
            <div ref={galleryScrollRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                {GALLERY_IMAGES.map((img) => (
                    <div key={img.id} className="min-w-[280px] md:min-w-[320px] h-[320px] relative rounded-2xl overflow-hidden shadow-md group snap-center cursor-pointer">
                        <img src={img.url} alt={img.title} onError={handleImageError} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-sm mb-2 inline-block">{img.category}</span>
                            <h4 className="text-xl font-bold font-serif">{img.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const renderHome = () => (
    <>
      <div className="relative bg-earth-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-leaf-100 text-leaf-700 text-sm font-bold tracking-wide mb-2">
                 FEITO À MÃO & COM AMOR
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-800 leading-tight">
                Cultive memórias que <span className="text-leaf-600">florescem</span>.
              </h2>
              <p className="text-lg text-stone-600 max-w-xl mx-auto md:mx-0">
                Eternize momentos com <strong>Kits de Plantio Personalizados</strong> e <strong>Lembrancinhas Ecológicas</strong>. 
                A escolha ideal para <strong>Brindes Corporativos Sustentáveis</strong>, Casamentos e Festas Infantis que encantam.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => setViewState(ViewState.ALL_PRODUCTS)}
                  className="px-8 py-3 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl font-bold shadow-lg shadow-leaf-200 transition-all hover:-translate-y-1"
                >
                  Ver Coleção
                </button>
                <button 
                  onClick={() => setViewState(ViewState.QUOTE)}
                  className="px-8 py-3 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl font-medium transition-all"
                >
                  Faça orçamento
                </button>
              </div>
           </div>
           <div className="flex-1 relative flex justify-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-leaf-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
             
             <div className="relative rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 border-4 border-white overflow-hidden aspect-[9/16] w-full max-w-xs bg-black group">
                 <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://i.ibb.co/vCmjK1wk/brinde-ecologico-sustentavel.jpg"
                 >
                    <source src="https://www.dropbox.com/scl/fi/tke7u3uyfbfcajcell3tn/Com-todos-os-mini-kits-distribu-dos-esse-o-passo-a-passo-para-voc-do-Cultivando-Mem-rias.mp4?rlkey=c23cncvda0clurarroey5e9eb&st=142imk44&raw=1" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                 <div className="absolute bottom-4 left-4 right-4 text-white z-20 opacity-90 text-sm font-bold text-center">
                    Cresce, floresce e encanta. 🌱
                 </div>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-leaf-600 py-10 border-b border-leaf-700">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="flex flex-col items-center gap-2">
               <ShieldCheck className="w-10 h-10 text-leaf-200" />
               <h3 className="font-bold text-lg">Entrega Rápida de Brindes</h3>
               <p className="text-sm text-leaf-100">Logística segura para todo Brasil</p>
            </div>
            <div className="flex flex-col items-center gap-2">
               <Heart className="w-10 h-10 text-orange-300" />
               <h3 className="font-bold text-lg">Personalização Exclusiva</h3>
               <p className="text-sm text-leaf-100">Tags, logos e frases customizadas</p>
            </div>
            <div className="flex flex-col items-center gap-2">
               <Star className="w-10 h-10 text-yellow-300" />
               <h3 className="font-bold text-lg">Qualidade Garantida</h3>
               <p className="text-sm text-leaf-100">Sementes germinativas e materiais eco</p>
            </div>
         </div>
      </div>

      {products.length > 0 && renderProductGrid(getRotatingFeaturedProducts(), "Destaques da Loja", false)}

      {/* Call renderGallery instead of inline logic */}
      {renderGallery()}

      <div className="bg-white py-16 lg:py-24 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 w-full relative">
                    <div className="absolute inset-0 bg-leaf-100 rounded-[2rem] transform rotate-3 translate-x-2 translate-y-2 -z-10"></div>
                    <img src="https://i.ibb.co/SHtvjzD/Bem-plena-festa-es-amandaegustavo-casamento-capixaba-setiba-amarelo-ver-o-blackpower.jpg" alt="Leona Pacheco" onError={handleImageError} className="w-full h-[500px] object-cover rounded-[2rem] shadow-xl grayscale-[10%] hover:grayscale-0 transition-all duration-700"/>
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-stone-100 hidden md:block">
                        <p className="font-serif font-bold text-2xl text-leaf-700">50k+</p>
                        <p className="text-xs text-stone-500 uppercase tracking-wide">Kits Entregues</p>
                    </div>
                </div>
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <div>
                        <span className="inline-block px-3 py-1 bg-leaf-50 text-leaf-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Nossa Essência</span>
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-stone-800 leading-tight">Por trás de cada kit, <br/><span className="text-leaf-600">uma história de amor.</span></h2>
                    </div>
                    <div className="space-y-4 text-lg text-stone-600 leading-relaxed font-light">
                        <p>Olá, sou <strong>Leona Pacheco</strong>, idealizadora da <strong>MyPlant</strong>. Nossa jornada começou em um pequeno quintal, com o desejo simples de presentear amigos com algo que tivesse vida e significado.</p>
                        <p>Hoje, nosso ateliê produz lembrancinhas ecológicas e enviamos para todo o Brasil, mas mantemos o mesmo carinho artesanal do primeiro dia.</p>
                    </div>
                    <div className="pt-4 flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="font-serif text-2xl italic text-stone-800">Leona Pacheco</p>
                            <p className="text-sm text-leaf-600 font-bold uppercase tracking-wider">Fundadora e Artesã</p>
                        </div>
                        <a href="https://www.instagram.com/kitplantio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-500 hover:text-leaf-700 font-medium transition-all">
                            <Instagram className="w-5 h-5" /><span className="underline underline-offset-4 decoration-stone-300 hover:decoration-leaf-500">@kitplantio</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="bg-leaf-900 py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Sprout size={400} /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-leaf-300 font-bold mb-2 uppercase tracking-wider text-sm"><Globe className="w-4 h-4" /> Responsabilidade Ecológica</div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Datas Ambientais & ESG</h2>
                    <p className="text-leaf-100 text-lg mb-8 leading-relaxed">Transforme datas importantes em ações concretas. Nossos kits são ferramentas poderosas para ações de <strong>Endomarketing</strong> e <strong>Educação Ambiental</strong>.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-leaf-800/50 p-4 rounded-xl border border-leaf-700 text-center sm:text-left"><div className="text-leaf-300 font-bold text-xs mb-1">05 DE JUNHO</div><div className="font-bold text-lg">Dia do Meio Ambiente</div></div>
                        <div className="bg-leaf-800/50 p-4 rounded-xl border border-leaf-700 text-center sm:text-left"><div className="text-leaf-300 font-bold text-xs mb-1">21 DE SETEMBRO</div><div className="font-bold text-lg">Dia da Árvore</div></div>
                        <div className="bg-leaf-800/50 p-4 rounded-xl border border-leaf-700 text-center sm:text-left"><div className="text-leaf-300 font-bold text-xs mb-1">22 DE ABRIL</div><div className="font-bold text-lg">Dia da Terra</div></div>
                    </div>
                    <button onClick={() => handleCategorySelect('Datas Ambientais')} className="px-8 py-3 bg-white text-leaf-900 hover:bg-leaf-100 rounded-xl font-bold transition-colors inline-flex items-center gap-2 shadow-lg">Ver Kits para Datas Ambientais <ArrowRight className="w-4 h-4" /></button>
                </div>
                <div className="flex-1 w-full max-w-md hidden md:block">
                     <div className="bg-white p-6 rounded-2xl shadow-xl text-stone-800 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-4 border-b border-stone-100 pb-4">
                             <div className="bg-green-100 p-3 rounded-full"><Sprout className="w-6 h-6 text-green-600" /></div>
                             <div><h4 className="font-bold">Kit Plantio + Mimo semente</h4><p className="text-xs text-stone-500">Campeão de vendas ESG</p></div>
                        </div>
                        <img src="https://i.ibb.co/vCmjK1wk/brinde-ecologico-sustentavel.jpg" alt="Kit Meio Ambiente" onError={handleImageError} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p className="text-sm text-stone-600 mb-4 italic">"O engajamento da equipe na Semana do Meio Ambiente foi incrível. Todos plantaram suas sementes!"</p>
                        <div className="flex justify-between items-center"><span className="font-bold text-lg text-leaf-700">R$ 5,70</span><button onClick={() => handleCategorySelect('Datas Ambientais')} className="text-sm font-bold text-leaf-600 hover:underline">Ver Detalhes</button></div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );

  const renderSpecialDates = () => {
    const occasions = [
        { title: 'Datas Comemorativas', icon: <Gift className="w-10 h-10 text-pink-400" />, desc: 'Casamentos, Batizados e Bodas' },
        { title: 'Datas Ambientais', icon: <Globe className="w-10 h-10 text-green-500" />, desc: 'Dia da Árvore, Meio Ambiente e Ações Eco' },
        { title: 'Aniversários Infantis', icon: <Baby className="w-10 h-10 text-blue-400" />, desc: 'Lembrancinhas educativas e divertidas' },
        { title: 'Eventos Corporativos', icon: <Briefcase className="w-10 h-10 text-stone-600" />, desc: 'Brindes para fortalecer a marca' },
    ];
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4 text-center">Ideias de Arte</h2>
                <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">Explore nossos temas e encontre a personalização perfeita.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {occasions.map((occ) => (
                        <div key={occ.title} onClick={() => handleCategorySelect(occ.title)} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center group">
                            <div className="bg-stone-50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">{occ.icon}</div>
                            <h3 className="text-xl font-bold text-stone-800 mb-2">{occ.title}</h3>
                            <p className="text-stone-500 mb-6 text-sm">{occ.desc}</p>
                            <span className="text-leaf-600 font-bold text-sm group-hover:underline">Ver produtos</span>
                        </div>
                    ))}
                </div>
            </div>
            {renderGallery()}
        </>
    );
  };

  const renderQuote = () => (
    <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
            <div className="bg-leaf-600 p-8 text-center text-white">
                <h2 className="text-3xl font-serif font-bold mb-2">Solicite um Orçamento</h2>
                <p className="text-leaf-100">Para grandes quantidades e personalizações especiais.</p>
            </div>
            <div className="p-8 md:p-12">
                <form className="space-y-6" onSubmit={async (e) => { 
                    e.preventDefault(); 
                    const formData = new FormData(e.currentTarget);
                    await supabase.from('contact_messages').insert({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message'),
                        is_quote: true,
                        quantity_estimated: quoteFormQuantity
                    });
                    alert('Orçamento enviado! Entraremos em contato em breve.'); 
                    setViewState(ViewState.HOME); 
                }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-medium text-stone-700 mb-2">Nome Completo</label><input name="name" type="text" className="w-full px-4 py-3 rounded-lg bg-stone-50 border-stone-200 focus:ring-2 focus:ring-leaf-500 outline-none" placeholder="Seu nome" defaultValue={currentUser?.name || ''} required /></div>
                        <div><label className="block text-sm font-medium text-stone-700 mb-2">E-mail</label><input name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-stone-50 border-stone-200 focus:ring-2 focus:ring-leaf-500 outline-none" placeholder="seu@email.com" defaultValue={currentUser?.email || ''} required /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-medium text-stone-700 mb-2">Telefone</label><input type="tel" className="w-full px-4 py-3 rounded-lg bg-stone-50 border-stone-200 focus:ring-2 focus:ring-leaf-500 outline-none" placeholder="(00) 00000-0000" /></div>
                        <div><label className="block text-sm font-medium text-stone-700 mb-2">Quantidade Estimada</label><input type="number" min="30" className="w-full px-4 py-3 rounded-lg bg-stone-50 border-stone-200 focus:ring-2 focus:ring-leaf-500 outline-none" value={quoteFormQuantity} onChange={(e) => setQuoteFormQuantity(Number(e.target.value))} required /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-stone-700 mb-2">Detalhes</label><textarea name="message" className="w-full px-4 py-3 rounded-lg bg-stone-50 border-stone-200 focus:ring-2 focus:ring-leaf-500 outline-none h-32 resize-none" placeholder="Conte mais sobre seu evento..."></textarea></div>
                    <button type="submit" className="w-full bg-leaf-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-leaf-700 transition-all transform hover:-translate-y-1">Enviar Solicitação</button>
                </form>
            </div>
        </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-serif font-bold text-stone-800 mb-6">Fale com a gente</h2>
                <p className="text-stone-600 mb-12 text-lg">Estamos prontos para tirar suas dúvidas.</p>
                <div className="space-y-8">
                    <div className="flex items-start gap-4"><div className="bg-green-100 p-3 rounded-full"><Phone className="w-6 h-6 text-green-600" /></div><div><h4 className="font-bold text-stone-800 text-lg">WhatsApp & Telefone</h4><p className="text-stone-600">(27) 99927-9902</p></div></div>
                    <div className="flex items-start gap-4"><div className="bg-blue-100 p-3 rounded-full"><Mail className="w-6 h-6 text-blue-600" /></div><div><h4 className="font-bold text-stone-800 text-lg">E-mail</h4><p className="text-stone-600">contato@myplant.com.br</p></div></div>
                    <div className="flex items-start gap-4"><div className="bg-orange-100 p-3 rounded-full"><MapPin className="w-6 h-6 text-orange-600" /></div><div><h4 className="font-bold text-stone-800 text-lg">Sede MyPlant</h4><p className="text-stone-600">Vitória - ES</p></div></div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
                <h3 className="text-2xl font-bold mb-6">Envie uma mensagem</h3>
                <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    await supabase.from('contact_messages').insert({ name: fd.get('name'), email: fd.get('email'), message: fd.get('msg') });
                    alert('Mensagem enviada!');
                    e.currentTarget.reset();
                }}>
                    <input name="name" type="text" placeholder="Seu nome" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200" required />
                    <input name="email" type="email" placeholder="Seu e-mail" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200" required />
                    <textarea name="msg" placeholder="Como podemos ajudar?" className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 h-32" required></textarea>
                    <button type="submit" className="w-full py-3 bg-leaf-600 text-white font-bold rounded-lg">Enviar Mensagem</button>
                </form>
            </div>
        </div>
    </div>
  );

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">Seu Carrinho</h2>
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-100 border-dashed">
          <Sprout className="mx-auto h-16 w-16 text-stone-300 mb-4" />
          <p className="text-stone-500 text-lg mb-6">Seu carrinho está vazio.</p>
          <button onClick={() => setViewState(ViewState.ALL_PRODUCTS)} className="px-8 py-3 bg-leaf-600 text-white rounded-xl font-bold hover:bg-leaf-700">Ver Produtos</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.cartId} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg bg-stone-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start"><h3 className="font-bold text-stone-800">{item.title}</h3><button onClick={() => removeFromCart(item.cartId)} className="text-stone-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button></div>
                  <p className="text-sm text-stone-500">Semente: {item.selectedSeed}</p>
                  <div className="mt-2 bg-stone-50 p-2 rounded text-xs text-stone-600"><p><span className="font-bold">Texto:</span> "{item.customText}"</p></div>
                  <div className="flex justify-between items-end mt-2"><span className="text-sm text-stone-500">{item.quantity}un x R$ {item.price.toFixed(2)}</span><span className="font-bold text-leaf-700">R$ {(item.price * item.quantity).toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
              <h3 className="font-bold text-stone-800 mb-4 text-lg">Resumo</h3>
              <div className="space-y-3 mb-6"><div className="flex justify-between text-stone-600"><span>Subtotal</span><span>R$ {calculateSubTotal().toFixed(2)}</span></div><div className="border-t border-b border-stone-100 py-4"><ShippingCalculator quantity={cart.reduce((acc, item) => acc + item.quantity, 0)} onSelectOption={handleShippingSelect} selectedOptionId={selectedShippingId} /></div><div className="flex justify-between font-bold text-lg text-stone-800 pt-2"><span>Total</span><span>R$ {calculateTotal().toFixed(2)}</span></div></div>
              <button onClick={() => setViewState(ViewState.PAYMENT)} disabled={selectedShippingId === null} className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl font-bold shadow-lg mb-3">Finalizar Compra</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800">
      <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} setViewState={setViewState} currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow pt-8 bg-earth-50/50">
        {viewState === ViewState.HOME && renderHome()}
        {viewState === ViewState.ALL_PRODUCTS && renderProductGrid(filteredProducts, activeCategory === 'Todos' ? 'Nossos Produtos' : activeCategory, true)}
        {viewState === ViewState.SPECIAL_DATES && renderSpecialDates()}
        {viewState === ViewState.QUOTE && renderQuote()}
        {viewState === ViewState.TESTIMONIALS && <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Quem plantou, amou!</h2></div>}
        {viewState === ViewState.CONTACT && renderContact()}
        {viewState === ViewState.CART && renderCart()}
        {viewState === ViewState.ADMIN && <AdminDashboard products={products} onUpdateProducts={setProducts} />}
        {viewState === ViewState.LOGIN && <LoginScreen onLogin={handleLogin} onCancel={() => setViewState(ViewState.HOME)} />}
        {viewState === ViewState.USER_PROFILE && currentUser && <UserProfile user={currentUser} onLogout={handleLogout} onNavigateHome={() => setViewState(ViewState.HOME)} />}
        {viewState === ViewState.PAYMENT && <CheckoutScreen total={calculateTotal()} cart={cart} user={currentUser} onSuccess={() => { setCart([]); setViewState(ViewState.CHECKOUT_SUCCESS); }} onCancel={() => setViewState(ViewState.CART)} />}
      </main>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />}
      <ChatAssistant /><WhatsAppButton />
    </div>
  );
};