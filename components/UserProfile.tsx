
import React, { useState } from 'react';
import { User, Order, OrderStatus } from '../types';
import { MOCK_ORDERS } from '../constants';
import { Package, User as UserIcon, LogOut, ShoppingBag, Clock, MapPin, CreditCard, CheckCircle, Star, X, MessageSquareQuote } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onNavigateHome }) => {
  // Estado local para gerenciar a mudança de status e depoimentos sem backend
  const [localOrders, setLocalOrders] = useState<Order[]>(
      MOCK_ORDERS.filter(order => order.customerEmail === user.email)
  );

  // Estados do Modal de Avaliação
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentReviewOrder, setCurrentReviewOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
        case 'paid': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'production': return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'shipped': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
        case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels: Record<string, string> = {
        paid: 'Pagamento Aprovado',
        pending: 'Aguardando Pagamento',
        production: 'Em Produção',
        shipped: 'Em Trânsito',
        delivered: 'Entregue',
        cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  // Ação: Confirmar Recebimento -> Abre Modal de Avaliação
  const handleConfirmReceipt = (orderId: string) => {
      // Atualiza o status para entregue
      const updatedOrders = localOrders.map(o => {
          if (o.id === orderId) return { ...o, status: 'delivered' as OrderStatus };
          return o;
      });
      setLocalOrders(updatedOrders);

      // Abre modal de avaliação para este pedido
      const order = updatedOrders.find(o => o.id === orderId);
      if (order) {
        setCurrentReviewOrder(order);
        setReviewModalOpen(true);
      }
  };

  const handleSubmitReview = () => {
      // Marca o pedido como avaliado
      if (currentReviewOrder) {
        setLocalOrders(prev => prev.map(o => {
            if (o.id === currentReviewOrder.id) return { ...o, hasTestimonial: true };
            return o;
        }));
      }
      
      alert("Obrigado pelo seu depoimento! Ele será analisado e publicado em breve.");
      setReviewModalOpen(false);
      setRating(5);
      setComment('');
      setCurrentReviewOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar - User Info */}
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-center">
            <div className="w-24 h-24 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
               <UserIcon className="w-10 h-10 text-leaf-600" />
            </div>
            <h2 className="text-xl font-bold text-stone-800">{user.name}</h2>
            <p className="text-sm text-stone-500 mb-4">{user.email}</p>
            
            <div className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 mb-6">
              {user.type === 'PJ' ? 'Pessoa Jurídica' : 'Pessoa Física'}
            </div>

            <div className="border-t border-stone-100 pt-6 space-y-3 text-left">
                {user.document && (
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                        <CreditCard className="w-4 h-4 text-stone-400" />
                        <span>{user.type === 'PF' ? 'CPF' : 'CNPJ'}: {user.document}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-stone-600">
                    <MapPin className="w-4 h-4 text-stone-400" />
                    <span>Endereço Principal</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
               <button 
                 onClick={onLogout}
                 className="w-full py-2 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
               >
                 <LogOut className="w-4 h-4" /> Sair da Conta
               </button>
            </div>
          </div>
        </div>

        {/* Main Content - Orders */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-leaf-600" /> Meus Pedidos
            </h2>
            <button onClick={onNavigateHome} className="text-sm text-leaf-600 hover:underline">
              Voltar para Loja
            </button>
          </div>

          {localOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-12 text-center">
                <Package className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-stone-700 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-stone-500 mb-6">Você ainda não realizou nenhuma compra conosco.</p>
                <button 
                  onClick={onNavigateHome}
                  className="px-6 py-2 bg-leaf-600 text-white rounded-lg hover:bg-leaf-700 transition-colors"
                >
                  Começar a comprar
                </button>
            </div>
          ) : (
            <div className="space-y-4">
              {localOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg text-stone-800">{order.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <Clock className="w-3 h-3" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-stone-400 uppercase tracking-wide">Total do Pedido</p>
                        <p className="text-xl font-bold text-leaf-700">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>

                    <div className="border-t border-stone-50 pt-4 flex flex-col sm:flex-row justify-between text-sm text-stone-600 gap-2 mb-4">
                       <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-stone-400" />
                          {order.itemsCount} itens comprados
                       </div>
                       <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-stone-400" />
                          Pagamento via {order.paymentMethod}
                       </div>
                    </div>

                    {/* Ações Específicas de Status */}
                    {order.status === 'shipped' && (
                        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                            <div className="text-sm text-blue-800">
                                <p className="font-bold">O pedido já chegou?</p>
                                <p className="text-xs">Confirme o recebimento para nos ajudar.</p>
                            </div>
                            <button 
                                onClick={() => handleConfirmReceipt(order.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" /> Marcar como Recebido
                            </button>
                        </div>
                    )}

                    {order.status === 'delivered' && (
                        <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                             <div className="text-sm text-green-800 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                <div>
                                    <p className="font-bold">Pedido Entregue</p>
                                    <p className="text-xs">{order.hasTestimonial ? 'Você já avaliou esta compra.' : 'O que achou dos produtos?'}</p>
                                </div>
                            </div>
                            {!order.hasTestimonial && (
                                <button 
                                    onClick={() => { setCurrentReviewOrder(order); setReviewModalOpen(true); }}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
                                >
                                    <Star className="w-4 h-4" /> Avaliar Compra
                                </button>
                            )}
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Avaliação / Depoimento */}
      {reviewModalOpen && currentReviewOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                  <div className="p-6 bg-leaf-600 text-white relative">
                      <button 
                        onClick={() => setReviewModalOpen(false)}
                        className="absolute top-4 right-4 text-leaf-100 hover:text-white"
                      >
                          <X className="w-6 h-6" />
                      </button>
                      <h3 className="text-xl font-serif font-bold mb-1">Conte sua experiência! 🌱</h3>
                      <p className="text-leaf-100 text-sm">Avalie o pedido {currentReviewOrder.id}</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                      <div className="flex flex-col items-center gap-2">
                          <span className="text-stone-600 font-medium">Sua nota geral</span>
                          <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <button 
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                  >
                                      <Star 
                                        className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`} 
                                      />
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                              <MessageSquareQuote className="w-4 h-4" /> Seu depoimento
                          </label>
                          <textarea 
                              className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-leaf-500 focus:border-transparent outline-none bg-stone-50 h-32 resize-none"
                              placeholder="O que você achou dos produtos? Chegou no prazo? A personalização ficou boa?"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                          />
                      </div>

                      <button 
                          onClick={handleSubmitReview}
                          className="w-full py-3 bg-leaf-600 hover:bg-leaf-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                      >
                          Enviar Avaliação
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
