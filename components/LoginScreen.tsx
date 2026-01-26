
import React, { useState } from 'react';
import { User, UserType } from '../types';
import { User as UserIcon, Building2, ArrowRight, Sprout, AlertCircle, CheckCircle2, Mail, ChevronLeft, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onCancel }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('PF');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  
  // UI States
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setResetSent(true);
      } else if (isRegistering) {
        // Cadastro Real no Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              user_type: userType,
              document: document
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          onLogin({
            id: data.user.id,
            name: name,
            email: email,
            type: userType,
            document: document
          });
        }
      } else {
        // Login Real no Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          onLogin({
            id: data.user.id,
            name: data.user.user_metadata?.full_name || 'Cliente MyPlant',
            email: data.user.email!,
            type: data.user.user_metadata?.user_type || 'PF',
            document: data.user.user_metadata?.document || ''
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setIsValidating(false);
    }
  };

  const toggleMode = (mode: 'login' | 'register' | 'forgot') => {
    setIsRegistering(mode === 'register');
    setIsForgotPassword(mode === 'forgot');
    setError('');
    setResetSent(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-earth-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-stone-100">
        
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-leaf-100 rounded-full flex items-center justify-center mb-4">
             <Sprout className="h-8 w-8 text-leaf-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800">
            {isForgotPassword ? 'Recuperar Senha' : isRegistering ? 'Crie sua conta' : 'Acesse sua conta'}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            {isForgotPassword 
              ? 'Enviaremos um link de redefinição para o seu e-mail.'
              : isRegistering 
                ? 'Junte-se a nós e comece a plantar memórias.' 
                : 'Bem-vindo de volta à MyPlant.'}
          </p>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
            </div>
        )}

        {!isForgotPassword && (
          <div className="flex p-1 bg-stone-100 rounded-lg">
             <button 
               onClick={() => toggleMode('login')}
               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isRegistering ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
             >
               Entrar
             </button>
             <button 
               onClick={() => toggleMode('register')}
               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isRegistering ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
             >
               Cadastrar
             </button>
          </div>
        )}

        {resetSent ? (
          <div className="text-center py-6 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">E-mail Enviado!</h3>
              <p className="text-sm text-stone-500 mb-6 px-4">
                Verifique sua caixa de entrada (<strong>{email}</strong>) e siga as instruções para redefinir sua senha.
              </p>
              <button 
                onClick={() => toggleMode('login')}
                className="text-leaf-600 font-bold hover:underline flex items-center gap-2 justify-center w-full"
              >
                <ChevronLeft className="w-4 h-4" /> Voltar para o Login
              </button>
          </div>
        ) : (
          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            
            {isRegistering && !isForgotPassword && (
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
               {isRegistering && !isForgotPassword && (
                   <div className="animate-in fade-in slide-in-from-top-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                          {userType === 'PF' ? 'Nome Completo' : 'Razão Social / Nome Fantasia'}
                      </label>
                      <input
                          type="text"
                          required
                          className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm transition-all"
                          placeholder={userType === 'PF' ? "Seu nome" : "Nome da Empresa"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                   </div>
               )}

               <div className="relative">
                  <label className="block text-sm font-medium text-stone-700 mb-1">E-mail</label>
                  <input
                      type="email"
                      required
                      className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm transition-all"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               {isRegistering && !isForgotPassword && (
                   <div className="animate-in fade-in slide-in-from-top-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                          {userType === 'PF' ? 'CPF' : 'CNPJ'}
                      </label>
                      <input
                          type="text"
                          required
                          className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm transition-all"
                          placeholder={userType === 'PF' ? "000.000.000-00" : "00.000.000/0000-00"}
                          value={document}
                          onChange={(e) => setDocument(e.target.value)}
                      />
                   </div>
               )}

               {!isForgotPassword && (
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Senha</label>
                    <input
                        type="password"
                        required
                        className="appearance-none relative block w-full px-3 py-3 border border-stone-300 placeholder-stone-400 text-stone-900 rounded-lg focus:outline-none focus:ring-leaf-500 focus:border-leaf-500 focus:z-10 sm:text-sm transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
               )}
            </div>

            {!isRegistering && !isForgotPassword && (
              <div className="text-right">
                 <button 
                  type="button" 
                  onClick={() => toggleMode('forgot')}
                  className="text-xs font-medium text-stone-500 hover:text-leaf-600 transition-colors"
                >
                  Esqueci minha senha
                </button>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isValidating}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-leaf-600 hover:bg-leaf-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-leaf-500 transition-all shadow-lg shadow-leaf-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4 text-white" />
                    Processando...
                  </span>
                ) : (
                  <>
                    {isForgotPassword ? 'Enviar link' : isRegistering ? 'Criar Conta' : 'Entrar'}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center space-y-3 pt-2">
               {isForgotPassword && (
                  <button 
                    type="button" 
                    onClick={() => toggleMode('login')}
                    className="text-sm text-leaf-600 font-bold hover:underline block w-full"
                  >
                    Voltar para o Login
                  </button>
               )}
               
               <button 
                 type="button" 
                 onClick={onCancel} 
                 className="text-sm text-stone-400 hover:text-stone-600 transition-colors hover:underline decoration-stone-300 block w-full"
               >
                   Continuar como visitante
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
