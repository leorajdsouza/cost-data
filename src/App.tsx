import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Application from "./features/applications/Application";
import Resource from "./features/resources/Resource";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Application />} />
        <Route path="resources" element={<Resource />} />
      </Route>
    </Routes>
  );
}

export default App;
