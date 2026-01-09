
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, MessageSquare, DollarSign, Package, Users, CheckCircle, Clock, Truck, XCircle, ChevronRight, Search, Mail, Eye, Settings, Save, AlertCircle, RefreshCw, FileText, Printer, Box, CreditCard, Wallet, Edit, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { MOCK_ORDERS, MOCK_MESSAGES, CATEGORIES } from '../constants';
import { Order, OrderStatus, Product } from '../types';
import { sendOrderToBling } from '../services/blingService';
import { generateShippingLabel } from '../services/shippingService';

interface AdminDashboardProps {
    products: Product[];
    onUpdateProducts: (products: Product[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onUpdateProducts }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'messages' | 'finance' | 'settings' | 'products'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Estado local para pedidos
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [syncingOrderId, setSyncingOrderId] = useState<string | null>(null);
  const [generatingLabelId, setGeneratingLabelId] = useState<string | null>(null);

  // Estado para Modal de Etiqueta
  const [selectedLabelOrder, setSelectedLabelOrder] = useState<Order | null>(null);

  // Estado para Edição de Produto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Estados de Configuração
  const [meToken, setMeToken] = useState('');
  const [meEmail, setMeEmail] = useState('');
  const [meSandbox, setMeSandbox] = useState(true);
  const [blingApiKey, setBlingApiKey] = useState('');
  const [paymentProvider, setPaymentProvider] = useState('mercadopago');
  const [paymentAccessToken, setPaymentAccessToken] = useState('');
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
      const savedToken = localStorage.getItem('ME_TOKEN');
      const savedEmail = localStorage.getItem('ME_EMAIL');
      const savedSandbox = localStorage.getItem('ME_SANDBOX');
      const savedBlingKey = localStorage.getItem('BLING_API_KEY');
      const savedPaymentToken = localStorage.getItem('PAYMENT_ACCESS_TOKEN');
      const savedPaymentProvider = localStorage.getItem('PAYMENT_PROVIDER');
      
      if (savedToken) setMeToken(savedToken);
      if (savedEmail) setMeEmail(savedEmail);
      if (savedSandbox) setMeSandbox(savedSandbox === 'true');
      if (savedBlingKey) setBlingApiKey(savedBlingKey);
      if (savedPaymentToken) setPaymentAccessToken(savedPaymentToken);
      if (savedPaymentProvider) setPaymentProvider(savedPaymentProvider);
  }, []);

  const handleSaveConfig = () => {
      localStorage.setItem('ME_TOKEN', meToken);
      localStorage.setItem('ME_EMAIL', meEmail);
      localStorage.setItem('ME_SANDBOX', String(meSandbox));
      localStorage.setItem('BLING_API_KEY', blingApiKey);
      localStorage.setItem('PAYMENT_ACCESS_TOKEN', paymentAccessToken);
      localStorage.setItem('PAYMENT_PROVIDER', paymentProvider);
      
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '@myplant2026') {
        setIsAuthenticated(true);
    } else {
        alert('Senha incorreta');
    }
  };

  const handleSyncToBling = async (orderId: string) => {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;
      setSyncingOrderId(orderId);
      try {
          const result = await sendOrderToBling(order);
          if (result.success) {
              setOrders(prev => prev.map(o => o.id === orderId ? { ...o, blingStatus: 'synced', blingId: result.blingId } : o));
              alert(`Sucesso: ${result.message}`);
          }
      } catch (error: any) {
          alert("Erro ao sincronizar: " + error.message);
      } finally {
          setSyncingOrderId(null);
      }
  };

  const handleGenerateLabel = async (orderId: string) => {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;
      setGeneratingLabelId(orderId);
      try {
          const result = await generateShippingLabel(order);
          setOrders(prev => prev.map(o => o.id === orderId ? { ...o, labelGenerated: true, trackingCode: result.trackingCode, shippingService: result.shippingService } : o));
      } catch (error: any) {
          alert("Erro ao gerar etiqueta: " + error.message);
      } finally {
          setGeneratingLabelId(null);
      }
  };

  // --- PRODUCT MANAGEMENT HANDLERS ---

  const handleEditProduct = (product: Product) => {
      setEditingProduct({ ...product });
      setIsNewProduct(false);
  };

  const handleAddNewProduct = () => {
      const newProd: Product = {
          id: Math.random().toString(36).substr(2, 9),
          title: '',
          price: 3.70,
          description: '',
          imageUrl: '',
          category: 'Todos',
          minOrder: 30,
          availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
      };
      setEditingProduct(newProd);
      setIsNewProduct(true);
  };

  const handleDeleteProduct = (id: string) => {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
          onUpdateProducts(products.filter(p => p.id !== id));
      }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingProduct) return;

      if (isNewProduct) {
          onUpdateProducts([editingProduct, ...products]);
      } else {
          onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      }
      setEditingProduct(null);
      alert('Produto salvo com sucesso!');
  };

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-stone-100">
              <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-200">
                  <div className="text-center mb-8">
                      <div className="bg-leaf-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <LayoutDashboard className="w-8 h-8 text-leaf-600" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-stone-800">Área Administrativa</h2>
                      <p className="text-stone-500">MyPlant Management</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Senha de Acesso</label>
                          <input 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-leaf-500 focus:border-leaf-500 outline-none"
                              placeholder="••••••••"
                          />
                      </div>
                      <button className="w-full py-3 bg-leaf-600 text-white font-bold rounded-lg hover:bg-leaf-700 transition-colors">
                          Entrar no Painel
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'paid').length;

  const getStatusColor = (status: OrderStatus) => {
      switch(status) {
          case 'paid': return 'bg-blue-100 text-blue-700';
          case 'pending': return 'bg-yellow-100 text-yellow-700';
          case 'production': return 'bg-purple-100 text-purple-700';
          case 'shipped': return 'bg-orange-100 text-orange-700';
          case 'delivered': return 'bg-green-100 text-green-700';
          case 'cancelled': return 'bg-red-100 text-red-700';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  const getStatusLabel = (status: OrderStatus) => {
      const labels: Record<string, string> = {
          paid: 'Pago', pending: 'Pendente', production: 'Em Produção', shipped: 'Enviado', delivered: 'Entregue', cancelled: 'Cancelado'
      };
      return labels[status] || status;
  };

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div><p className="text-sm text-stone-500 font-medium">Faturamento</p><h3 className="text-2xl font-bold text-stone-800">R$ {totalRevenue.toLocaleString('pt-BR')}</h3></div>
                <div className="bg-green-100 p-3 rounded-full"><DollarSign className="w-6 h-6 text-green-600" /></div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div><p className="text-sm text-stone-500 font-medium">Pedidos</p><h3 className="text-2xl font-bold text-stone-800">{totalOrders}</h3></div>
                <div className="bg-blue-100 p-3 rounded-full"><ShoppingBag className="w-6 h-6 text-blue-600" /></div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div><p className="text-sm text-stone-500 font-medium">Aguardando</p><h3 className="text-2xl font-bold text-stone-800">{pendingOrders}</h3></div>
                <div className="bg-orange-100 p-3 rounded-full"><Package className="w-6 h-6 text-orange-600" /></div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div><p className="text-sm text-stone-500 font-medium">Produtos</p><h3 className="text-2xl font-bold text-stone-800">{products.length}</h3></div>
                <div className="bg-purple-100 p-3 rounded-full"><Box className="w-6 h-6 text-purple-600" /></div>
            </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center"><h3 className="font-bold text-stone-800">Últimas Vendas</h3><button onClick={() => setActiveTab('orders')} className="text-sm text-leaf-600 hover:underline">Ver tudo</button></div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left"><thead className="bg-stone-50 text-stone-500"><tr><th className="px-6 py-4">ID Pedido</th><th className="px-6 py-4">Cliente</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Valor</th></tr></thead><tbody className="divide-y divide-stone-100">
                    {orders.slice(0, 5).map(order => (<tr key={order.id} className="hover:bg-stone-50"><td className="px-6 py-4 font-medium text-stone-800">{order.id}</td><td className="px-6 py-4">{order.customerName}</td><td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</span></td><td className="px-6 py-4 text-right font-medium">R$ {order.total.toFixed(2)}</td></tr>))}
                </tbody></table>
            </div>
        </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-800">Catálogo de Produtos</h2>
            <button 
                onClick={handleAddNewProduct}
                className="bg-leaf-600 hover:bg-leaf-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
                <Plus className="w-4 h-4" /> Adicionar Novo
            </button>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                    <tr>
                        <th className="px-6 py-4">Imagem</th>
                        <th className="px-6 py-4">Título</th>
                        <th className="px-6 py-4">Categoria</th>
                        <th className="px-6 py-4">Pedido Mín.</th>
                        <th className="px-6 py-4 text-right">Preço Un.</th>
                        <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {products.map(prod => (
                        <tr key={prod.id} className="hover:bg-stone-50 group">
                            <td className="px-6 py-4">
                                <img src={prod.imageUrl} alt={prod.title} className="w-12 h-12 object-cover rounded-lg border border-stone-200" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-stone-800">{prod.title}</div>
                                <div className="text-[10px] text-stone-400 truncate max-w-xs">{prod.description}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-bold uppercase">{prod.category}</span>
                            </td>
                            <td className="px-6 py-4 text-stone-600">{prod.minOrder} un.</td>
                            <td className="px-6 py-4 text-right font-bold text-leaf-700">R$ {prod.price.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                    <button 
                                        onClick={() => handleEditProduct(prod)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="Editar"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteProduct(prod.id)}
                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Modal de Edição de Produto */}
        {editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="p-6 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                        <h3 className="font-bold text-stone-800 text-lg flex items-center gap-2">
                            {isNewProduct ? <Plus className="w-5 h-5 text-leaf-600" /> : <Edit className="w-5 h-5 text-blue-600" />}
                            {isNewProduct ? 'Cadastrar Novo Produto' : 'Editar Produto'}
                        </h3>
                        <button onClick={() => setEditingProduct(null)} className="text-stone-400 hover:text-stone-600"><XCircle className="w-6 h-6" /></button>
                    </div>
                    
                    <form onSubmit={handleSaveProduct} className="p-8 space-y-6 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Título do Produto</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-leaf-500 outline-none"
                                    value={editingProduct.title}
                                    onChange={e => setEditingProduct({...editingProduct, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Preço Unitário (R$)</label>
                                <input 
                                    type="number" step="0.01"
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-leaf-500 outline-none"
                                    value={editingProduct.price}
                                    onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Pedido Mínimo (Unidades)</label>
                                <input 
                                    type="number"
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-leaf-500 outline-none"
                                    value={editingProduct.minOrder}
                                    onChange={e => setEditingProduct({...editingProduct, minOrder: parseInt(e.target.value)})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Categoria</label>
                                <select 
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-leaf-500 outline-none bg-white"
                                    value={editingProduct.category}
                                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                                >
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Link da Imagem (URL)</label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-leaf-500 outline-none"
                                            value={editingProduct.imageUrl}
                                            onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                                            required
                                            placeholder="https://exemplo.com/imagem.jpg"
                                        />
                                    </div>
                                    {editingProduct.imageUrl && (
                                        <div className="w-20 h-20 rounded-lg border border-stone-200 overflow-hidden bg-stone-50">
                                            <img src={editingProduct.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Descrição</label>
                                <textarea 
                                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-leaf-500 outline-none h-24 resize-none"
                                    value={editingProduct.description}
                                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={() => setEditingProduct(null)}
                                className="px-6 py-2 text-stone-600 font-bold hover:bg-stone-50 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="px-8 py-2 bg-leaf-600 text-white font-bold rounded-lg hover:bg-leaf-700 shadow-lg shadow-leaf-100 transition-all"
                            >
                                Salvar Produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-stone-800">Gerenciamento de Pedidos</h2><div className="relative"><input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 border border-stone-300 rounded-lg text-sm w-64" /><Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" /></div></div>
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
             <table className="w-full text-sm text-left"><thead className="bg-stone-50 text-stone-500"><tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Cliente</th><th className="px-6 py-4">Itens</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Frete</th><th className="px-6 py-4 text-right">Total</th></tr></thead><tbody className="divide-y divide-stone-100">
                    {orders.map(order => (<tr key={order.id} className="hover:bg-stone-50"><td className="px-6 py-4 font-medium text-stone-800">{order.id}</td><td className="px-6 py-4">{order.customerName}</td><td className="px-6 py-4">{order.itemsCount} un.</td><td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</span></td><td className="px-6 py-4">{order.labelGenerated ? <span className="text-xs font-bold text-green-600">{order.trackingCode}</span> : <button onClick={() => handleGenerateLabel(order.id)} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">Gerar Etiqueta</button>}</td><td className="px-6 py-4 text-right font-medium">R$ {order.total.toFixed(2)}</td></tr>))}
                </tbody></table>
        </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6 animate-in fade-in">
        <h2 className="text-xl font-bold text-stone-800">Mensagens</h2>
        <div className="grid grid-cols-1 gap-4">
            {MOCK_MESSAGES.map(msg => (
                <div key={msg.id} className={`bg-white p-6 rounded-xl border ${msg.read ? 'border-stone-200' : 'border-leaf-300 bg-leaf-50/30'}`}>
                    <div className="flex justify-between items-start"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.read ? 'bg-stone-100' : 'bg-leaf-100 text-leaf-600 font-bold'}`}>{msg.name.charAt(0)}</div><div><h4 className="font-bold text-sm">{msg.subject}</h4><p className="text-xs text-stone-500">{msg.name}</p></div></div><span className="text-xs text-stone-400">{msg.date}</span></div>
                    <p className="text-stone-600 text-sm mt-2">{msg.message}</p>
                </div>
            ))}
        </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-in fade-in">
        <h2 className="text-xl font-bold text-stone-800">Configurações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm md:col-span-2">
                <div className="flex items-center gap-3 mb-6"><div className="bg-teal-100 p-2 rounded-full"><CreditCard className="w-6 h-6 text-teal-600" /></div><div><h3 className="font-bold">Pagamento</h3><p className="text-xs text-stone-500">Configuração de Gateway</p></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium mb-1">Provedor</label><select value={paymentProvider} onChange={(e) => setPaymentProvider(e.target.value)} className="w-full px-4 py-2 border rounded-lg"><option value="mercadopago">Mercado Pago</option><option value="pagarme">Pagar.me</option></select></div>
                    <div><label className="block text-sm font-medium mb-1">Token de Acesso</label><input type="password" value={paymentAccessToken} onChange={(e) => setPaymentAccessToken(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="APP_USR-xxx" /></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200">
                <div className="flex items-center gap-3 mb-4 border-b pb-4"><div className="bg-green-100 p-2 rounded-full"><FileText className="w-6 h-6 text-green-600" /></div><div><h3 className="font-bold">Bling ERP</h3></div></div>
                <label className="block text-sm font-medium mb-1">API Key</label><input type="password" value={blingApiKey} onChange={(e) => setBlingApiKey(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200">
                <div className="flex items-center gap-3 mb-4 border-b pb-4"><div className="bg-blue-100 p-2 rounded-full"><Truck className="w-6 h-6 text-blue-600" /></div><div><h3 className="font-bold">Melhor Envio</h3></div></div>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium mb-1">E-mail</label><input type="email" value={meEmail} onChange={(e) => setMeEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Token</label><input type="password" value={meToken} onChange={(e) => setMeToken(e.target.value)} className="w-full px-4 py-2 border rounded-lg" /></div>
                </div>
            </div>
        </div>
        <div className="flex justify-end pt-4"><button onClick={handleSaveConfig} className="flex items-center gap-2 bg-leaf-600 text-white px-8 py-3 rounded-lg hover:bg-leaf-700 shadow-lg">{configSaved ? 'Salvo!' : 'Salvar Configurações'}</button></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 sticky top-24">
                    <h3 className="text-xs font-bold text-stone-400 uppercase mb-4 px-2 tracking-wider">Painel Admin</h3>
                    <nav className="space-y-1">
                        <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><LayoutDashboard className="w-5 h-5" /> Visão Geral</button>
                        <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><Box className="w-5 h-5" /> Produtos</button>
                        <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><ShoppingBag className="w-5 h-5" /> Pedidos</button>
                        <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'finance' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><DollarSign className="w-5 h-5" /> Financeiro</button>
                        <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><MessageSquare className="w-5 h-5" /> Mensagens</button>
                        <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><Settings className="w-5 h-5" /> Configurações</button>
                    </nav>
                </div>
            </aside>
            <main className="flex-1">
                <header className="mb-8"><h1 className="text-3xl font-serif font-bold text-stone-800">{activeTab === 'products' ? 'Gestão de Produtos' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1><p className="text-stone-500">Administração MyPlant</p></header>
                {activeTab === 'dashboard' && renderOverview()}
                {activeTab === 'products' && renderProducts()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'messages' && renderMessages()}
                {activeTab === 'finance' && renderOverview()}
                {activeTab === 'settings' && renderSettings()}
            </main>
        </div>
    </div>
  );
};
