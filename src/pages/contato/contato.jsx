import React, { useState } from 'react';

const Contato = () => {


    return (
        <section className="mx-5">

<div className="container d-flex align-items-center justify-content-center">
                <div className="col-lg-4 col-md-6 mb-4 ">
                    <div className="card h-100">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.jpg"
                                        className="card-img"
                                        alt="Contato"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between align-items-center">Contato</h5>
                                    <p style={{ borderBottom: '1px solid #ccc' }} className="card-text">Entre em contato conosco para mais informações</p>
                                    <p className="card-text">
                                    Whatsapp: 
                                        <a href="whatsapp://send?phone=5511999999999&text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20seus%20produtos">
                                            (11) 99999-9999
                                        </a>
                                    </p>
                                    <p className="card-text">Email:
                                        <a href="mailto:barriga.lanches@gmail.com">
                                            barriga.lanches@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contato;
