
import React, { useState } from 'react';
import { User, UserType } from '../types';
import { User as UserIcon, Building2, ArrowRight, Sprout } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onCancel }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState<UserType>('PF');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de autenticação/cadastro
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Cliente MyPlant',
      email,
      type: userType,
      document
    };

    onLogin(mockUser);
  };

  const handleGoogleLogin = () => {
      // Simulação de login com Google
      const mockGoogleUser: User = {
          id: 'google-' + Math.random().toString(36).substr(2, 9),
          name: 'Usuário Google',
          email: 'usuario.google@gmail.com',
          type: 'PF', // Padrão para login social geralmente é PF
          document: '' 
      };
      onLogin(mockGoogleUser);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-earth-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-stone-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-leaf-100 rounded-full flex items-center justify-center mb-4">
             <Sprout className="h-8 w-8 text-leaf-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800">
            {isRegistering ? 'Crie sua conta' : 'Acesse sua conta'}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            {isRegistering 
              ? 'Junte-se a nós e comece a plantar memórias.' 
              : 'Bem-vindo de volta à MyPlant.'}
          </p>
        </div>

        {/* Toggle Login/Register */}
        <div className="flex p-1 bg-stone-100 rounded-lg">
           <button 
             onClick={() => setIsRegistering(false)}
             className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isRegistering ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
           >
             Entrar
           </button>
           <button 
             onClick={() => setIsRegistering(true)}
             className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isRegistering ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
           >
             Cadastrar
           </button>
        </div>

        <div className="mt-6">
            {/* Google Login Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-200 rounded-xl shadow-sm bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Entrar com Google</span>
            </button>

            <div className="relative mt-6 mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-stone-500">ou continue com e-mail</span>
                </div>
            </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* User Type Toggle (Only for Register) */}
          {isRegistering && (
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div 
                  onClick={() => setUserType('PF')}
                  className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${userType === 'PF' ? 'border-leaf-500 bg-leaf-50 ring-1 ring-leaf-500' : 'border-stone-200 hover:border-leaf-300'}`}
                >
                    <UserIcon className={`w-6 h-6 ${userType === 'PF' ? 'text-leaf-600' : 'text-stone-400'}`} />
                    <span className={`text-sm font-bold ${userType === 'PF' ? 'text-leaf-800' : 'text-stone-500'}`}>Pessoa Física</span>
                </div>
                <div 
                  onClick={() => setUserType('PJ')}
                  className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${userType === 'PJ' ? 'border-leaf-500 bg-leaf-50 ring-1 ring-leaf-500' : 'border-stone-200 hover:border-leaf-300'}`}
                >
                    <Building2 className={`w-6 h-6 ${userType === 'PJ' ? 'text-leaf-600' : 'text-stone-400'}`} />
                    <span className={`text-sm font-bold ${userType === 'PJ' ? 'text-leaf-800' : 'text-stone-500'}`}>Pessoa Jurídica</span>
                </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
             {isRegistering && (
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        {userType === 'PF' ? 'Nome Completo' : 'Razão Social / Nome Fantasia'}
                    </label>
                    <input
                        type="text"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm"
                        placeholder={userType === 'PF' ? "Seu nome" : "Nome da Empresa"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                 </div>
             )}

             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">E-mail</label>
                <input
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
             </div>

             {isRegistering && (
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        {userType === 'PF' ? 'CPF' : 'CNPJ'}
                    </label>
                    <input
                        type="text"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm"
                        placeholder={userType === 'PF' ? "000.000.000-00" : "00.000.000/0000-00"}
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                    />
                 </div>
             )}

             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Senha</label>
                <input
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
             </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-leaf-600 hover:bg-leaf-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leaf-500 transition-colors shadow-lg shadow-leaf-200"
            >
              {isRegistering ? 'Criar Conta' : 'Entrar'}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="text-center">
             <button type="button" onClick={onCancel} className="text-sm text-stone-500 hover:text-stone-800 hover:underline">
                 Continuar sem login
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
