import { useEffect, useState } from "react";

const API_URL = "http://w.apexracing01.infora.hu/Feltalalok/api1.php";

export default function App() {
  const [kutatok, setKutatok] = useState([]);
  const [nev, setNev] = useState("");
  const [szul, setSzul] = useState("");
  const [meghal, setMeghal] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    oldFkod: null,
    newFkod: "",
    nev: "",
    szul: "",
    meghal: ""
  });

  // Betöltés
  async function loadData() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setKutatok(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Hozzáadás
  async function addItem() {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nev,
        szul: szul || null,
        meghal: meghal || null
      })
    });

    setNev("");
    setSzul("");
    setMeghal("");
    loadData();
  }

  // Törlés
  async function deleteItem(fkod) {
    if (!confirm("Biztosan törlöd?")) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _method: "DELETE", fkod })
    });

    loadData();
  }

  // Szerkesztés megnyitása
  function openEditModal(item) {
    setEditData({
      oldFkod: item.fkod,
      newFkod: item.fkod,
      nev: item.nev,
      szul: item.szul || "",
      meghal: item.meghal || ""
    });
    setModalOpen(true);
  }

  // Mentés
  async function saveEdit() {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _method: "PUT",
        ...editData
      })
    });

    setModalOpen(false);
    loadData();
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>Kutatók CRUD (React)</h1>

      {/* Hozzáadás */}
      <div>
        <input placeholder="Név" value={nev} onChange={e => setNev(e.target.value)} />
        <input placeholder="Születési év" type="number" value={szul} onChange={e => setSzul(e.target.value)} />
        <input placeholder="Halálozási év" type="number" value={meghal} onChange={e => setMeghal(e.target.value)} />
        <button onClick={addItem}>Hozzáadás</button>
      </div>

      {/* Lista */}
      <table style={{ margin: "20px auto", width: "80%", borderCollapse: "collapse" }}>
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
          {kutatok.map(k => (
            <tr key={k.fkod}>
              <td>{k.fkod}</td>
              <td>{k.nev}</td>
              <td>{k.szul || ""}</td>
              <td>{k.meghal || ""}</td>
              <td>
                <button onClick={() => openEditModal(k)}>Szerkesztés</button>
                <button onClick={() => deleteItem(k.fkod)} style={{ marginLeft: 8, color: "red" }}>
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "white", padding: 20, borderRadius: 10, width: 300 }}>
            <h3>Szerkesztés</h3>

            <label>FKOD:</label>
            <input
              type="number"
              value={editData.newFkod}
              onChange={e => setEditData({ ...editData, newFkod: e.target.value })}
            />

            <label>Név:</label>
            <input
              value={editData.nev}
              onChange={e => setEditData({ ...editData, nev: e.target.value })}
            />

            <label>Születési év:</label>
            <input
              type="number"
              value={editData.szul}
              onChange={e => setEditData({ ...editData, szul: e.target.value })}
            />

            <label>Halálozási év:</label>
            <input
              type="number"
              value={editData.meghal}
              onChange={e => setEditData({ ...editData, meghal: e.target.value })}
            />

            <button onClick={saveEdit} style={{ marginTop: 10 }}>Mentés</button>
            <button onClick={() => setModalOpen(false)} style={{ marginLeft: 10 }}>Mégse</button>
          </div>
        </div>
      )}
    </div>
  );
}