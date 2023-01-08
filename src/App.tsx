import "./App.scss";
import Home from "./Pages/Home";
import { apikey } from "./Utils/airtable";
import Airtable from "airtable";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  Airtable.configure({ apiKey: apikey });

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </>
  );
}

export default App;
