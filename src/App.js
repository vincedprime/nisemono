import { BrowserRouter, Route, Routes } from "react-router-dom";

import AmazonInvoice from "./pages/AmazonInvoice";
import AmazonInvoiceForm from "./pages/AmazonInvoiceForm";
import FuelBillForm from "./pages/FuelBillForm";
import Home from "./pages/Home";
import UdemyCertificate from "./pages/UdemyCertificate";
import UdemyInvoice from "./pages/UdemyInvoice";
import WiFiForm from "./pages/WiFiForm";
import WiFiInvoice from "./pages/WiFiInvoice";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/udemy-certificate" element={<UdemyCertificate />} />
        <Route path="/udemy-invoice" element={<UdemyInvoice />} />
        <Route path="/amazon-invoice-form" element={<AmazonInvoiceForm />} />
        <Route path="/amazon-invoice" element={<AmazonInvoice />} />
        <Route path="/fuel-bill-form" element={<FuelBillForm />} />
        <Route path="/wifi-form" element={<WiFiForm />} />
        <Route path="/wifi-invoice" element={<WiFiInvoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
