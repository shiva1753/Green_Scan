import { useState, useEffect } from "react";

export default function PrintLog({ userEmail, onPrintSubmit }) {
  const [documentName, setDocumentName] = useState("");
  const [pages, setPages] = useState("");
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/print");
      const data = await res.json();
      // Reverse so the latest print appears at the top
      setLogs(data.slice().reverse()); 
    } catch (e) {
      console.error("Fetch Logs Error:", e);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pages || !documentName) return;

    try {
      const res = await fetch("http://localhost:5000/api/print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: userEmail, 
          documentName, 
          pages: Number(pages) 
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        onPrintSubmit(data.newBalance); // Update paper count in Home.jsx
        setDocumentName("");
        setPages("");
        fetchLogs(); // Refresh the table logs
      }
    } catch (err) {
      console.error("Submission Error:", err);
    }
  };

  return (
    <div id="printModule" className="print-module-container" style={{marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #ddd'}}>
      <h3>New Print Job</h3>
      <form onSubmit={handleSubmit}>
        <input id="docNameInput" className="form-input" placeholder="Document Name" value={documentName} onChange={(e) => setDocumentName(e.target.value)} required />
        <input id="pagesInput" className="form-input" placeholder="Pages" type="number" value={pages} onChange={(e) => setPages(e.target.value)} required />
        <button id="submitPrintBtn" type="submit" className="primary-btn">Submit Print</button>
      </form>

      <h4 style={{marginTop: '20px'}}>Recent Logs</h4>
      <table className="log-table" border="1" style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: '#f4f4f4'}}>
            <th>ID</th>
            <th>Document</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? logs.map((log) => (
            <tr key={log.id}>
              <td>{String(log.id).slice(-4)}</td>
              <td>{log.documentName}</td>
              <td>{log.pages}</td>
            </tr>
          )) : (
            <tr><td colSpan="3" style={{textAlign: 'center'}}>No print history found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
