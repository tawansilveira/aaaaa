import React from 'react';
import { firestore } from '../../services/firebase'; // Importe o serviço de banco de dados do Firebase
import { auth } from '../../services/firebase';
const HomePage = () => {
  

  return (
    <section id="hero" className="d-flex align-items-center justify-content-center">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
          <div className="col-xl-6 col-lg-8">
            <img src="assets/img/logo.png" className="img-fluid" alt=""/>
            <h1>Barriga Cheia<span>.</span></h1>
            <h2>Reserve seu lanche, e fuja das filas!</h2>
          </div>
        </div>
        <div className="row gy-4 mt-5 justify-content-center text-decoration-none" data-aos="zoom-in" data-aos-delay="250">
          <div className="col-xl-12 text-center">
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

