import React from 'react'

const StockTable = ({ columns, rows, loading, error }) => {
  return (
    <div className="stock-table-wrap">
      {loading ? <p className="stock-empty">Loading data...</p> : null}
      {error ? <p className="stock-empty">{error}</p> : null}

      {!loading && !error ? (
        <table className="stock-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.key]

                    if (column.key === 'total' || column.key === 'totalBill' || column.key === 'unitPrice') {
                      return <td key={column.key}>${value.toLocaleString()}</td>
                    }

                    return <td key={column.key}>{value}</td>
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="stock-empty">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

export default StockTable
