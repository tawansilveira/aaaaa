import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../../services/firebase";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate para navegação

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth); // Destructure only sendPasswordResetEmail

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!forgotPasswordEmail) {
      alert('Por favor, digite seu endereço de e-mail');
      return;
    }

    try {
      await sendPasswordResetEmail(forgotPasswordEmail); // Call directly without wrapping in a function
      alert('E-mail de redefinição de senha enviado com sucesso!');
      setShowForgotPassword(false); // Hide forgot password form
    } catch (err) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', err);
      alert('Ocorreu um erro ao redefinir sua senha. Tente novamente.');
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(email, password);
      var user = {
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/cardapio'); // Redirecionar para a página do cardápio após o login
    } catch (error) {
      setError('Usuário ou senha incorretos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" className="d-flex align-items-center justify-content-center">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
          <div className="col-xl-6 col-lg-8" id="divTudo">
            {showForgotPassword ? (
              <div className="text-white" id="divForgotPassword">
                <h3>Esqueceu a senha?</h3>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="form-control text-black mb-3"
                      placeholder="Seu e-mail"
                    />
                  </div>
                  <button className="btn btn-success text-white form-control">
                    <i className="bi bi-envelope"></i> ENVIAR RESET DE SENHA
                  </button>
                </form>
                <button className="btn btn-link text-white" onClick={() => setShowForgotPassword(false)}>
                  Voltar ao Login
                </button>
              </div>
            ) : (
              <div className="text-white" id="divLogin">
                <h3>Já é cadastrado?</h3>
                <form onSubmit={signIn}>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control text-black mb-3"
                      placeholder="Seu e-mail"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control text-black"
                      placeholder="Sua senha"
                    />
                  </div>
                  <button
                    onClick={signIn}
                    className="btn btn-success text-white form-control"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <span>
                        <i className="bi bi-check-circle"></i> FAZER LOGIN
                      </span>
                    )}
                  </button>
                  <a href="#" onClick={() => setShowForgotPassword(true)}>Esqueci a senha</a>
                </form>
              </div>
            )}
            {error && (
              <div className="text-white" id="divError">
                <p>Erro: {error.message}</p>
              </div>
            )}
            {loading && (
              <div className="text-white" id="divLoading">
                <p>Carregando...</p>
              </div>
            )}
            <div className="text-white" id="divCadastro">
              <h3>Seu primeiro pedido?</h3>
              <Link to="/register" className="btn bg-primary text-white form-control">
                <i className="bi bi-person"></i> CADASTRE-SE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
