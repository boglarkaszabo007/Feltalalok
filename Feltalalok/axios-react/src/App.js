import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "/Feltalalok/api1.php"
    : "http://w.apexracing01.infora.hu/Feltalalok/api1.php";
    
axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  const [kutatok, setKutatok] = useState([]);
  const [nev, setNev] = useState("");
  const [szul, setSzul] = useState("");
  const [meghal, setMeghal] = useState("");
  const [editItem, setEditItem] = useState(null);

  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      setKutatok(res.data);
    } catch (error) {
      console.error("Hiba a betöltésnél:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = async () => {
    if (!nev.trim()) {
      alert("A név megadása kötelező!");
      return;
    }

    try {
      await axios.post(API_URL, {
          nev,
          szul: szul !== "" ? parseInt(szul) : null,
          meghal: meghal !== "" ? parseInt(meghal) : null,
      });
      setNev("");
      setSzul("");
      setMeghal("");
      loadData();
    } catch (error) {
      console.error("Hiba a hozzáadásnál:", error);
    }
  };

  const deleteItem = async (fkod) => {
    if (!window.confirm("Biztosan törli?")) return;

    try {
      await axios.post(API_URL, {
        _method: "DELETE",
        fkod,
      });
      loadData();
    } catch (error) {
      console.error("Hiba a törlésnél:", error);
    }
  };

  const saveEdit = async () => {
    if (!editItem.nev.trim()) {
      alert("A név megadása kötelező!");
      return;
    }

    try {
      await axios.post(API_URL, {
        _method: "PUT",
        oldFkod: editItem.fkod,
        newFkod: editItem.fkod,
        nev: editItem.nev,
        szul: editItem.szul ? parseInt(editItem.szul) : null,
        meghal: editItem.meghal ? parseInt(editItem.meghal) : null,
      });
      setEditItem(null);
      loadData();
    } catch (error) {
      console.error("Hiba a mentésnél:", error);
    }
  };

  return (
    <div className="container">
      <h1>Kutatók CRUD – React + Axios</h1>

      <div className="form">
        <input
          value={nev}
          onChange={(e) => setNev(e.target.value)}
          placeholder="Név"
        />
        <input
          value={szul}
          onChange={(e) => setSzul(e.target.value)}
          type="number"
          placeholder="Születési év"
        />
        <input
          value={meghal}
          onChange={(e) => setMeghal(e.target.value)}
          type="number"
          placeholder="Halálozási év"
        />
        <button onClick={addItem}>Hozzáadás</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>FKOD</th>
            <th>Név</th>
            <th>Született</th>
            <th>Meghalt</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {kutatok.map((k) => (
            <tr key={k.fkod}>
              <td>{k.fkod}</td>
              <td>{k.nev}</td>
              <td>{k.szul ?? ""}</td>
              <td>{k.meghal ?? ""}</td>
              <td>
                <button onClick={() => setEditItem({ ...k })}>Szerkesztés</button>
                <button onClick={() => deleteItem(k.fkod)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Szerkesztő modal */}
      {editItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Szerkesztés</h3>
            <input
              value={editItem.nev}
              onChange={(e) => setEditItem({ ...editItem, nev: e.target.value })}
            />
            <input
              value={editItem.szul ?? ""}
              type="number"
              onChange={(e) => setEditItem({ ...editItem, szul: e.target.value })}
            />
            <input
              value={editItem.meghal ?? ""}
              type="number"
              onChange={(e) => setEditItem({ ...editItem, meghal: e.target.value })}
            />
            <button onClick={saveEdit}>Mentés</button>
            <button onClick={() => setEditItem(null)}>Mégse</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;