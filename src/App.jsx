import { useState } from "react";
import "./App.css";
const DynamicTable = () => {
  const [columns, setColumns] = useState([
    { key: "col1", title: "Column 1", type: "text", options: [] },
  ]);
  const [data, setData] = useState([]);

  const handleAddRow = () => {
    const newRow = { key: Date.now().toString() };
    columns.forEach((col) => (newRow[col.key] = ""));
    setData([...data, newRow]);
  };

  const handleAddColumn = () => {
    const newColKey = `col${columns.length + 1}`;
    setColumns([...columns, { key: newColKey, title: `Column ${columns.length + 1}`, type: "text", options: [] }]);
  };

  const handleEditTitle = (key, newTitle) => {
    setColumns(columns.map(col => col.key === key ? { ...col, title: newTitle } : col));
  };

  const handleTypeChange = (key, type) => {
    setColumns(columns.map(col => col.key === key ? { ...col, type, options: type === "select" || type === "multiselect" ? [] : col.options } : col));
  };

  const handleCellChange = (rowKey, colKey, value) => {
    setData(data.map(row => row.key === rowKey ? { ...row, [colKey]: value } : row));
  };

  const handleAddOption = (colKey, option) => {
    setColumns(columns.map(col => 
      col.key === colKey ? { ...col, options: [...col.options, option] } : col
    ));
  };

  const renderCell = (col, record) => {
    switch (col.type) {
      case "number":
        return <input type="number" value={record[col.key]} onChange={(e) => handleCellChange(record.key, col.key, e.target.value)} className="input-cell" />;
      case "select":
        return (
          <select value={record[col.key]} onChange={(e) => handleCellChange(record.key, col.key, e.target.value)} className="select-cell">
            {col.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );
      case "multiselect":
        return (
          <select multiple value={record[col.key] || []} onChange={(e) => 
            handleCellChange(record.key, col.key, Array.from(e.target.selectedOptions, option => option.value))
          } className="multiselect-cell">
            {col.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );
      default:
        return <input type="text" value={record[col.key]} onChange={(e) => handleCellChange(record.key, col.key, e.target.value)} />;
    }
  };

  return (
    <div className="table-container">
      <div className="table-actions">
        <button onClick={handleAddRow} className="action-button">➕ Add Row</button>
        <button onClick={handleAddColumn} className="action-button">➕ Add Column</button>
      </div>
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="table-header">
                <input type="text" defaultValue={col.title} onBlur={(e) => handleEditTitle(col.key, e.target.value)} className="header-input" />
                <select value={col.type} onChange={(e) => handleTypeChange(col.key, e.target.value)} className="type-selector">
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                  <option value="multiselect">Multi-Select</option>
                </select>
                {(col.type === "select" || col.type === "multiselect") && (
                  <input type="text" placeholder="Add option" 
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddOption(col.key, e.target.value);
                        e.target.value = "";
                      }
                    }} className="option-input"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.key}>
              {columns.map(col => (
                <td key={col.key} className="table-cell">{renderCell(col, row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .table-container { padding: 20px; max-width: 800px; margin: auto; }
        .table-actions { margin-bottom: 10px; display: flex; gap: 10px; }
        .action-button { padding: 8px 12px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 5px; }
        .dynamic-table { width: 100%; border-collapse: collapse; }
        .table-header { background: #f4f4f4; padding: 8px; }
        .table-cell { padding: 8px; border: 1px solid #ccc; }
        .input-cell, .select-cell, .multiselect-cell { width: 100%; padding: 6px; }
        .header-input, .type-selector, .option-input { width: 100%; padding: 4px; }
      `}</style>
    </div>
  );
};

export default DynamicTable;
