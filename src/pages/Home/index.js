import { Link } from 'react-router-dom';

import AppLayout from "../../components/AppLayout";

const Home = () => {
    return (
        <AppLayout>
            <section>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-3 p-3 text-center">
                            <Link to="/udemy-certificate">
                                <div className="card border-secondary mb-3 p-3">
                                    <div className="card-body">
                                        <img src='/assets/images/certificate.png' alt='Udemy Certificate' />
                                        <p>Udemy Certificate</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-md-3 p-3 text-center">
                            <Link to="/amazon-invoice-form">
                                <div className="card border-secondary mb-3 p-3">
                                    <div className="card-body">
                                        <img src='/assets/images/invoice.png' alt='Amazon Invoice' />
                                        <p>Amazon Invoice</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-md-3 p-3 text-center">
                            <Link to="/fuel-bill-form">
                                <div className="card border-secondary mb-3 p-3">
                                    <div className="card-body">
                                        <img src='/assets/images/fuel.png' alt='Fuel Bill' />
                                        <p>Fuel Bill</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-md-3 p-3 text-center">
                            <Link to="/wifi-form">
                                <div className="card border-secondary mb-3 p-3">
                                    <div className="card-body">
                                        <img src='/assets/images/wifi.png' alt='WiFi' />
                                        <p>WiFi</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

export default Home;