
import React, { useState } from 'react';
import { ShoppingCart, Sprout, Search, Menu, X, Lock, User as UserIcon, LogOut } from 'lucide-react';
import { ViewState, User } from '../types';

interface HeaderProps {
  cartCount: number;
  setViewState: (view: ViewState) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, setViewState, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: ViewState.HOME },
    { label: 'Produtos', view: ViewState.ALL_PRODUCTS },
    { label: 'Ideias de Arte', view: ViewState.SPECIAL_DATES },
    { label: 'Orçamento', view: ViewState.QUOTE },
    { label: 'Depoimentos', view: ViewState.TESTIMONIALS },
    { label: 'Contato', view: ViewState.CONTACT },
  ];

  const handleNavClick = (view: ViewState) => {
    setViewState(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer gap-2 group" 
            onClick={() => setViewState(ViewState.HOME)}
          >
            <div className="bg-leaf-100 p-2 rounded-full group-hover:bg-leaf-200 transition-colors">
                <Sprout className="h-8 w-8 text-leaf-600" />
            </div>
            <div>
                <h1 className="text-2xl font-serif font-bold text-leaf-800 tracking-tight">MyPlant</h1>
                <p className="text-xs text-stone-500 hidden sm:block">Kits de Plantio & Afeto</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className="text-stone-600 hover:text-leaf-600 font-medium text-sm transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            
            {/* User Login/Account */}
            {currentUser ? (
                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-stone-100">
                    <div 
                      className="text-right hidden lg:block cursor-pointer hover:opacity-80"
                      onClick={() => setViewState(ViewState.USER_PROFILE)}
                    >
                        <p className="text-xs font-bold text-stone-800">{currentUser.name}</p>
                        <p className="text-[10px] text-stone-500 uppercase">{currentUser.type === 'PJ' ? 'Pessoa Jurídica' : 'Cliente'}</p>
                    </div>
                    <button 
                        onClick={() => setViewState(ViewState.USER_PROFILE)}
                        className="bg-leaf-50 p-2 rounded-full text-leaf-700 hover:bg-leaf-100 transition-colors"
                        title="Meu Perfil"
                    >
                        <UserIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={onLogout}
                        className="bg-stone-100 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Sair"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <button 
                    onClick={() => setViewState(ViewState.LOGIN)}
                    className="hidden md:flex items-center gap-2 text-sm font-bold text-leaf-700 hover:text-leaf-800 px-3 py-2 rounded-lg hover:bg-leaf-50 transition-colors"
                >
                    <UserIcon className="w-5 h-5" /> Entrar
                </button>
            )}

            <button 
              className="relative p-2 text-stone-600 hover:text-leaf-600 transition-colors"
              onClick={() => setViewState(ViewState.CART)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Link (Locked) */}
            <button 
                onClick={() => setViewState(ViewState.ADMIN)}
                className="text-stone-300 hover:text-leaf-600 transition-colors"
                title="Área Administrativa"
            >
                <Lock className="w-4 h-4" />
            </button>
            
            <button 
              className="md:hidden text-stone-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            
            {currentUser ? (
                <div className="bg-leaf-50 p-4 rounded-lg mb-4 flex items-center justify-between">
                    <div onClick={() => handleNavClick(ViewState.USER_PROFILE)}>
                        <p className="font-bold text-leaf-800">Olá, {currentUser.name}</p>
                        <p className="text-xs text-stone-500">Minha Conta</p>
                    </div>
                    <button onClick={onLogout} className="text-xs text-red-500 font-bold border border-red-200 px-2 py-1 rounded">Sair</button>
                </div>
            ) : (
                <button 
                    onClick={() => handleNavClick(ViewState.LOGIN)}
                    className="w-full text-left px-3 py-3 rounded-md text-base font-bold text-white bg-leaf-600 mb-4 flex items-center gap-2 justify-center"
                >
                    <UserIcon className="w-5 h-5" /> Entrar ou Cadastrar
                </button>
            )}

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-stone-600 hover:text-leaf-600 hover:bg-leaf-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
