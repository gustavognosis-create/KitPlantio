
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, MessageSquare, DollarSign, Package, Users, CheckCircle, Clock, Truck, XCircle, ChevronRight, Search, Mail, Eye, Settings, Save, AlertCircle, RefreshCw, FileText, Printer, Box, CreditCard, Wallet, Edit, Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { MOCK_ORDERS, MOCK_MESSAGES, CATEGORIES } from '../constants';
import { Order, OrderStatus, Product } from '../types';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
    products: Product[];
    onUpdateProducts: (products: Product[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onUpdateProducts }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'messages' | 'finance' | 'settings' | 'products'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '@myplant2026') {
        setIsAuthenticated(true);
    } else {
        alert('Senha incorreta');
    }
  };

  const handleEditProduct = (product: Product) => {
      setEditingProduct({ ...product });
      setIsNewProduct(false);
  };

  const handleAddNewProduct = () => {
      const newProd: Product = {
          id: '', 
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

  const handleDeleteProduct = async (id: string) => {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
          const { error } = await supabase.from('products').delete().eq('id', id);
          if (!error) {
            onUpdateProducts(products.filter(p => p.id !== id));
          } else {
            alert('Erro ao excluir: ' + error.message);
          }
      }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingProduct) return;
      setIsSaving(true);

      const productToSave = {
          title: editingProduct.title,
          price: editingProduct.price,
          description: editingProduct.description,
          image_url: editingProduct.imageUrl,
          category: editingProduct.category,
          min_order: editingProduct.minOrder,
          available_seeds: editingProduct.availableSeeds
      };

      try {
          if (isNewProduct) {
              const { data, error } = await supabase.from('products').insert([productToSave]).select();
              if (error) throw error;
              if (data) {
                  const newProduct: Product = {
                      id: data[0].id,
                      ...editingProduct
                  };
                  onUpdateProducts([newProduct, ...products]);
              }
          } else {
              const { error } = await supabase.from('products').update(productToSave).eq('id', editingProduct.id);
              if (error) throw error;
              onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
          }
          setEditingProduct(null);
          alert('Produto salvo com sucesso no banco de dados!');
      } catch (err: any) {
          alert('Erro ao salvar no Supabase: ' + err.message);
      } finally {
          setIsSaving(false);
      }
  };

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-stone-100">
              <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-200">
                  <div className="text-center mb-8">
                      <div className="bg-leaf-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><LayoutDashboard className="w-8 h-8 text-leaf-600" /></div>
                      <h2 className="text-2xl font-serif font-bold text-stone-800">Área Administrativa</h2>
                      <p className="text-stone-500">MyPlant Management</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                      <div><label className="block text-sm font-medium text-stone-700 mb-1">Senha de Acesso</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none" placeholder="••••••••" /></div>
                      <button className="w-full py-3 bg-leaf-600 text-white font-bold rounded-lg hover:bg-leaf-700 transition-colors">Entrar no Painel</button>
                  </form>
              </div>
          </div>
      );
  }

  const renderProducts = () => (
    <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-stone-800">Catálogo de Produtos (Supabase)</h2><button onClick={handleAddNewProduct} className="bg-leaf-600 hover:bg-leaf-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Adicionar Novo</button></div>
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left"><thead className="bg-stone-50 text-stone-500 font-medium"><tr><th className="px-6 py-4">Imagem</th><th className="px-6 py-4">Título</th><th className="px-6 py-4">Categoria</th><th className="px-6 py-4 text-right">Preço</th><th className="px-6 py-4 text-center">Ações</th></tr></thead>
                <tbody className="divide-y divide-stone-100">
                    {products.map(prod => (
                        <tr key={prod.id} className="hover:bg-stone-50"><td className="px-6 py-4"><img src={prod.imageUrl} className="w-12 h-12 object-cover rounded-lg" /></td><td className="px-6 py-4 font-bold">{prod.title}</td><td className="px-6 py-4"><span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-bold uppercase">{prod.category}</span></td><td className="px-6 py-4 text-right font-bold text-leaf-700">R$ {prod.price.toFixed(2)}</td><td className="px-6 py-4"><div className="flex justify-center gap-2"><button onClick={() => handleEditProduct(prod)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"><Edit className="w-4 h-4" /></button><button onClick={() => handleDeleteProduct(prod.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button></div></td></tr>
                    ))}
                </tbody>
            </table>
        </div>
        {editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="p-6 bg-stone-50 border-b border-stone-200 flex justify-between items-center"><h3 className="font-bold text-stone-800 text-lg">{isNewProduct ? 'Cadastrar Novo' : 'Editar Produto'}</h3><button onClick={() => setEditingProduct(null)}><XCircle className="w-6 h-6" /></button></div>
                    <form onSubmit={handleSaveProduct} className="p-8 space-y-6 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2"><label className="block text-xs font-bold text-stone-500 uppercase mb-1">Título</label><input type="text" className="w-full px-4 py-2 border rounded-lg" value={editingProduct.title} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} required /></div>
                            <div><label className="block text-xs font-bold text-stone-500 uppercase mb-1">Preço</label><input type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} required /></div>
                            <div><label className="block text-xs font-bold text-stone-500 uppercase mb-1">Categoria</label><select className="w-full px-4 py-2 border rounded-lg bg-white" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                            <div className="md:col-span-2"><label className="block text-xs font-bold text-stone-500 uppercase mb-1">URL Imagem</label><input type="text" className="w-full px-4 py-2 border rounded-lg" value={editingProduct.imageUrl} onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} required /></div>
                            <div className="md:col-span-2"><label className="block text-xs font-bold text-stone-500 uppercase mb-1">Descrição</label><textarea className="w-full px-4 py-2 border rounded-lg h-24" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} required /></div>
                        </div>
                        <div className="pt-4 border-t flex justify-end gap-3"><button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2">Cancelar</button><button type="submit" disabled={isSaving} className="px-8 py-2 bg-leaf-600 text-white font-bold rounded-lg flex items-center gap-2">{isSaving && <Loader2 className="w-4 h-4 animate-spin" />}Salvar no Supabase</button></div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 sticky top-24">
                    <nav className="space-y-1">
                        <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><LayoutDashboard className="w-5 h-5" /> Visão Geral</button>
                        <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'products' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><Box className="w-5 h-5" /> Produtos</button>
                        <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'orders' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><ShoppingBag className="w-5 h-5" /> Pedidos</button>
                        <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'messages' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><MessageSquare className="w-5 h-5" /> Mensagens</button>
                        <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'settings' ? 'bg-leaf-50 text-leaf-700 font-bold' : 'text-stone-600 hover:bg-stone-50'}`}><Settings className="w-5 h-5" /> Configurações</button>
                    </nav>
                </div>
            </aside>
            <main className="flex-1">
                <header className="mb-8"><h1 className="text-3xl font-serif font-bold text-stone-800">{activeTab.toUpperCase()}</h1><p className="text-stone-500">Administração MyPlant</p></header>
                {activeTab === 'products' ? renderProducts() : <div className="bg-white p-12 rounded-xl text-center text-stone-400">Implementação em andamento para aba {activeTab}</div>}
            </main>
        </div>
    </div>
  );
};
