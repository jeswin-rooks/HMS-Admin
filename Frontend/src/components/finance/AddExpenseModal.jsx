import React, { useState } from 'react'
import { X } from 'lucide-react'

const paymentMethods = ['Card', 'UPI', 'Cash']
const expenseCategories = ['utilities', 'maintenance', 'salary', 'security', 'miscellaneous']

const toDisplayDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const AddExpenseModal = ({ activeCategory, onClose, onSave }) => {
  const [form, setForm] = useState({
    category: activeCategory,
    subCategory: '',
    invoiceId: '',
    date: '',
    paidBy: '',
    pid: '',
    paymentMethod: 'Card',
    totalBill: '',
    staffName: '',
    role: '',
    salaryMonth: '',
    amount: ''
  })

  const isSalary = form.category === 'salary'

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (isSalary) {
      if (!form.staffName || !form.role || !form.invoiceId || !form.date || !form.amount) return
      onSave({
        category: form.category,
        date: toDisplayDate(form.date),
        'Staff Name': form.staffName,
        Role: form.role,
        'Salary Month': form.salaryMonth || 'Current Month',
        'Invoice Id': form.invoiceId,
        paymentMethod: form.paymentMethod,
        Amount: form.amount.startsWith('₹') ? form.amount : `₹ ${form.amount}`
      })
      return
    }

    if (!form.subCategory || !form.invoiceId || !form.date || !form.paidBy || !form.paymentMethod || !form.totalBill) return

    onSave({
      category: form.category,
      date: toDisplayDate(form.date),
      subCategory: form.subCategory,
      invoiceId: form.invoiceId,
      paidBy: form.paidBy,
      pid: form.pid || '#NEW',
      paymentMethod: form.paymentMethod,
      totalBill: form.totalBill.startsWith('₹') ? form.totalBill : `₹ ${form.totalBill}`
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-[760px] rounded-xl bg-[#F1F2F4] shadow-2xl overflow-hidden border border-[#CBD2D9]">
        <div className="h-[44px] px-5 flex items-center justify-between bg-[#E7EAEE] border-b border-[#D5DAE0]">
          <h2 className="text-[28px] font-bold text-[#1B2E2A] leading-none">Add Expenses</h2>
          <button onClick={onClose} className="text-[#5E6B72] hover:text-[#1B2E2A]">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Category</label>
            <select
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px] text-[#374151]"
            >
              {expenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {isSalary ? (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Role</label>
                <input
                  value={form.role}
                  onChange={(e) => setField('role', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Invoice ID</label>
                <input
                  value={form.invoiceId}
                  onChange={(e) => setField('invoiceId', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setField('date', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Staff Name</label>
                <input
                  value={form.staffName}
                  onChange={(e) => setField('staffName', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setField('paymentMethod', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Amount</label>
                <input
                  value={form.amount}
                  onChange={(e) => setField('amount', e.target.value)}
                  placeholder="45000"
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Sub Category</label>
                <input
                  value={form.subCategory}
                  onChange={(e) => setField('subCategory', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Invoice ID</label>
                <input
                  value={form.invoiceId}
                  onChange={(e) => setField('invoiceId', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setField('date', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Paid By</label>
                <input
                  value={form.paidBy}
                  onChange={(e) => setField('paidBy', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setField('paymentMethod', e.target.value)}
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-[#6B7280]">Total Bill</label>
                <input
                  value={form.totalBill}
                  onChange={(e) => setField('totalBill', e.target.value)}
                  placeholder="18500"
                  className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
                />
              </div>
            </>
          )}
        </div>

        <div className="px-5 pb-4 flex justify-end">
          <button
            onClick={handleSave}
            className="h-10 min-w-[88px] rounded-lg bg-[#052B2C] text-white text-[14px] font-medium hover:bg-[#07383A] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddExpenseModal
