import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { db } from '../../services/firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase'; // Assuming this is where Firebase is initialized

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [createUserWithEmailAndPassword, createUserLoading, createUserError] =
        useCreateUserWithEmailAndPassword(auth);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            if (password !== confirmPassword) {
                throw new Error('Senhas não conferem'); // Handle password mismatch
            }

            const { user } = await createUserWithEmailAndPassword(email, password); // Destructure user object
            //await user.updateProfile({ displayName: name }); // Update display name asynchronously

            const userToSave = {
                email: user.email,
                name: name,
                uid: user.uid
            };

            try {
                const userRef = collection(db, 'userProfile');  // Collection reference
                const newUserRef = doc(userRef);           // Document reference within the collection
                await setDoc(newUserRef, userToSave);       // Save order data to the document
                console.log('user saved successfully:', newUserRef.id);
            } catch (error) {
                console.error('Error saving user:', error);
            }

            localStorage.setItem('user', JSON.stringify(userToSave));
            setSuccess(true);
        } catch (error) {
            setError( 'An error occurred during registration.'); // Provide a generic error message
            console.error('Registration error:', error); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    if (success) {
        navigate('/login');
    }

    return (
        <section id="hero" className="d-flex align-items-center justify-content-center">
            <div className="container" data-aos="fade-up">
                <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
                    <div className="col-xl-6 col-lg-8" id="divTudo">

                        <div className="text-white" id="divLogin">
                            <h3>Crie seu conta</h3>
                            <form>
                                <div className="mb-3">
                                <input onChange={e => setName(e.target.value)}className="form-control text-black mb-3" placeholder="Seu nome" />

                                    <input onChange={e => setEmail(e.target.value)} className="form-control text-black mb-3" placeholder="Seu e-mail" />
                                    <input onChange={e => setPassword(e.target.value)} className="form-control text-black mb-3" placeholder="Sua senha" />
                                    <input onChange={e => setConfirmPassword(e.target.value)}className="form-control text-black mb-3" placeholder="Confirme sua senha" />
                                </div>
                                <button onClick={handleSignIn} className="btn btn-success text-white form-control mb-3" disabled={loading}>
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        <span>
                                            <i className="bi bi-check-circle"></i> CRIAR CADASTRO
                                        </span>
                                    )}
                                </button>
                            </form>
                            {error && <p className="text-danger mt-2">{error}</p>}
                            <Link to="/login" style={{ color: 'white',alignSelf: 'center' }}>Já é cadastrado? Faça login</Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;