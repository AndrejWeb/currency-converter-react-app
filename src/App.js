/**
 * AAWeb.tech
 * https://aaweb.tech
 */
import './App.css';
import { useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageCurrency from "./pages/ManageCurrency";
import ManageExchangeRate from "./pages/ManageExchangeRate";
import Currencies from "./pages/Currencies";
import DeleteCurrency from "./pages/DeleteCurrency";
import ExchangeRates from "./pages/ExchangeRates";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {

    useEffect(() => {
        document.title = 'Currency Converter - React App';
    }, []);

  return (
    <div className="App pt-3">
        <div className="container">
            <NavLink to="/" className={({ isActive }) => isActive ? 'btn btn-primary me-2' : 'btn btn-default me-2'}>Dashboard</NavLink>
            <NavLink to="/currency" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn btn-default me-2'}>Manage Currency</NavLink>
            <NavLink to="/currencies" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn btn-default me-2'}>Currencies</NavLink>
            <NavLink to="/exchange" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn btn-default me-2'}>Manage Exchange Rate</NavLink>
            <NavLink to="/exchangerates" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn btn-default me-2'}>Exchange Rates</NavLink>
        </div>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/currency" element={<ManageCurrency />} />
            <Route path="/currency/:name" element={<ManageCurrency />} />
            <Route path="/currencies" element={<Currencies />} />
            <Route path="/exchange" element={<ManageExchangeRate />} />
            <Route path="/exchangerates" element={<ExchangeRates />} />
            <Route path="/delete/:name" element={<DeleteCurrency />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
