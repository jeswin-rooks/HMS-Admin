import React, { useEffect, useState } from 'react'

const PurchaseEditModal = ({
  isOpen,
  purchase,
  paymentMethods,
  onClose,
  onSave,
}) => {
  const [invoiceId, setInvoiceId] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  useEffect(() => {
    if (!purchase) {
      return
    }

    setInvoiceId(purchase.invoiceId || '')
    setPaidBy(purchase.paidBy || '')
    setPaymentMethod(purchase.paymentMethod || paymentMethods[0] || '')
  }, [purchase, paymentMethods])

  if (!isOpen || !purchase) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onSave({
      ...purchase,
      invoiceId,
      paidBy,
      paymentMethod,
      action: '✎',
    })
  }

  return (
    <div className="purchase-modal-backdrop" role="dialog" aria-modal="true">
      <form className="purchase-modal-card" onSubmit={handleSubmit}>
        <header className="purchase-modal-header">
          <h3>Edit Purchase</h3>
          <button type="button" className="purchase-modal-close" onClick={onClose}>
            x
          </button>
        </header>

        <div className="purchase-modal-body">
          <label className="purchase-field">
            <span>Invoice</span>
            <input
              type="text"
              value={invoiceId}
              onChange={(event) => setInvoiceId(event.target.value)}
              required
            />
          </label>

          <div className="purchase-grid-two">
            <label className="purchase-field">
              <span>Paid By</span>
              <input
                type="text"
                value={paidBy}
                onChange={(event) => setPaidBy(event.target.value)}
                required
              />
            </label>

            <label className="purchase-field">
              <span>Payment Method</span>
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <footer className="purchase-modal-footer">
          <button type="submit" className="purchase-save-btn">
            Save
          </button>
        </footer>
      </form>
    </div>
  )
}

export default PurchaseEditModal
