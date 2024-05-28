import React, { useState } from 'react';
import '../../../pages/login/login.css';
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../../../services/firebase";

const LoginAdm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

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

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(email, password);
      const user = userCredential.user; // Get the signed-in user

      // Verificar se o UID do usuário corresponde ao UID do administrador
      const isAdmin = user.uid === 'RlCf1BU1JhNQiLXffJCOqtguGr63'; // Substitua "SEU_UID_ADMIN" pelo UID real do administrador

      if (isAdmin) {
        var userData = { // Create user object without sensitive data
          "email": user.email,
          "name": user.displayName, // Might be null if not set
          "photoURL": user.photoURL, // Might be null if not set
          "uid": user.uid
        }
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/homeAdm'); // Redirect to admin dashboard or homepage after successful login
      } else {
        setError('Acesso negado. Somente o administrador pode fazer login.');
      }
    } catch (error) {
      setError('Usuário ou senha incorretos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  console.log(auth.currentUser);

  return (
    <section id="hero" className="d-flex align-items-center justify-content-center">
      <div className="container " data-aos="fade-up">
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
          <div className="col-xl-6 col-lg-8" id="divTudo"
          style={{ backgroundColor: "#000000", borderRadius: "10px",border: "1px solid #ffc451"}}
          >

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
                      color='white'
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
                <h3>Login administrativo</h3>
                <form onSubmit={signIn} className='text-white d-flex flex-column justify-content-end '>
                  <div className="mb-3" >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control text-black mb-3"
                      placeholder="Seu e-mail"
                      id="email"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control text-black"
                      placeholder="Sua senha"
                      id="password"
                    />
                  </div>
                  <a href="#" onClick={() => setShowForgotPassword(true)}
                    className='text-white text-decoration-none mt-0'
                    style={{ width: '100%', textAlign: 'right' }}
                  >Esqueci a senha!</a>
                  <button
                    onClick={signIn}
                    className="btn  yellowButton form-control"
                    disabled={loading}

                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <span className='fw-600' style={{ color: "#ffc451" }}>
                        <i className="bi bi-check-circle"></i> FAZER LOGIN
                      </span>
                    )}
                  </button>

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

            

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAdm;
