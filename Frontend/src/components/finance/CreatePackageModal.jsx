import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import PackageSummaryPanel from './PackageSummaryPanel'

const Field = ({ label, type = 'text', value, onChange, placeholder = '' }) => (
  <div className="flex flex-col gap-[5px]">
    <label className="text-[12px] font-medium text-[#555]">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-[38px] px-[12px] border border-[#E5E7EB] rounded-[8px] text-[13px] text-[#212121] bg-[#F9FAFB] outline-none focus:border-[#235347] focus:bg-white transition-colors"
    />
  </div>
)

const SectionTitle = ({ title }) => (
  <h3 className="text-[13px] font-bold text-[#212121] mb-[12px] pb-[8px] border-b border-[#E5E7EB]">{title}</h3>
)

const emptyForm = {
  name: '', type: '', daysIncluded: '', basePrice: '', intraDayCharge: '',
  medicines: { unitType: '', unitValue: '', quantityAvailable: '', totalAvailableCost: '' },
  therapy: { sessionsIncluded: '', extraSessionCost: '' },
  foodAndDiet: { dietType: '', mealsPerDay: '' },
  additionalCharges: { additionalCharge: '', adjustmentCharge: '' },
  doctorAndNursing: { consultationRate: '', dailyRate: '', nursing: '' },
  packageSummary: {
    basePackage: 200, roomCharges: 0, medicines: 200, therapy: 200,
    foodAndDiet: 250, additionalCharges: 250, doctorNursingCharges: 250, packageDiscount: -200
  }
}

const CreatePackageModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))
  const setNested = (group, field, val) =>
    setForm(f => ({ ...f, [group]: { ...f[group], [field]: val } }))

  const handleSave = () => {
    const pkg = {
      ...form,
      id: Date.now(),
      packageFee: (() => {
        const s = form.packageSummary
        return (
          (Number(s.basePackage) || 0) + (Number(s.roomCharges) || 0) +
          (Number(s.medicines) || 0) + (Number(s.therapy) || 0) +
          (Number(s.foodAndDiet) || 0) + (Number(s.additionalCharges) || 0) +
          (Number(s.doctorNursingCharges) || 0) + (Number(s.packageDiscount) || 0)
        )
      })(),
      daysIncluded: Number(form.daysIncluded) || 0,
      basePrice: Number(form.basePrice) || 0,
      intraDayCharge: Number(form.intraDayCharge) || 0,
      medicines: {
        ...form.medicines,
        quantityAvailable: Number(form.medicines.quantityAvailable) || 0,
        totalAvailableCost: Number(form.medicines.totalAvailableCost) || 0
      },
      therapy: {
        sessionsIncluded: Number(form.therapy.sessionsIncluded) || 0,
        extraSessionCost: Number(form.therapy.extraSessionCost) || 0
      },
      foodAndDiet: {
        ...form.foodAndDiet,
        mealsPerDay: Number(form.foodAndDiet.mealsPerDay) || 0
      },
      additionalCharges: {
        additionalCharge: Number(form.additionalCharges.additionalCharge) || 0,
        adjustmentCharge: Number(form.additionalCharges.adjustmentCharge) || 0
      },
      doctorAndNursing: {
        consultationRate: Number(form.doctorAndNursing.consultationRate) || 0,
        dailyRate: Number(form.doctorAndNursing.dailyRate) || 0,
        nursing: Number(form.doctorAndNursing.nursing) || 0
      },
      packageSummary: Object.fromEntries(
        Object.entries(form.packageSummary).map(([k, v]) => [k, Number(v) || 0])
      )
    }
    onSave(pkg)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-[30px]">
      <div className="bg-white rounded-[16px] w-[900px] max-w-[95vw] shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-start px-[28px] pt-[24px] pb-[18px] border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-[18px] font-bold text-[#212121]">Create Package</h2>
            <p className="text-[12px] text-[#9CA3AF] mt-[2px]">Select a competitive billing package including room, medicines and services.</p>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#212121] transition-colors mt-[2px]">
            <X size={20} />
          </button>
        </div>

        {/* Body — two columns */}
        <div className="flex gap-[24px] p-[28px]">

          {/* LEFT column */}
          <div className="flex-1 flex flex-col gap-[24px] min-w-0">

            {/* Basic Info */}
            <div>
              <SectionTitle title="Basic Package Information" />
              <div className="grid grid-cols-2 gap-[12px]">
                <Field label="Package Name"    value={form.name}            onChange={e => set('name', e.target.value)} />
                <Field label="Days Included"   value={form.daysIncluded}    onChange={e => set('daysIncluded', e.target.value)}   type="number" />
                <Field label="Base Price"      value={form.basePrice}       onChange={e => set('basePrice', e.target.value)}      type="number" />
                <Field label="Intra Day Charge" value={form.intraDayCharge} onChange={e => set('intraDayCharge', e.target.value)} type="number" />
              </div>
            </div>

            {/* Medicines */}
            <div>
              <SectionTitle title="Medicines" />
              <div className="grid grid-cols-2 gap-[12px]">
                <Field label="Unit Type"            value={form.medicines.unitType}           onChange={e => setNested('medicines', 'unitType', e.target.value)} />
                <Field label="Unit Value"           value={form.medicines.unitValue}          onChange={e => setNested('medicines', 'unitValue', e.target.value)} />
                <Field label="Quantity Available"   value={form.medicines.quantityAvailable}  onChange={e => setNested('medicines', 'quantityAvailable', e.target.value)} type="number" />
                <Field label="Total Available Cost" value={form.medicines.totalAvailableCost} onChange={e => setNested('medicines', 'totalAvailableCost', e.target.value)} type="number" />
              </div>
            </div>

            {/* Therapy */}
            <div>
              <SectionTitle title="Therapy" />
              <div className="grid grid-cols-2 gap-[12px]">
                <Field label="Sessions Included"  value={form.therapy.sessionsIncluded} onChange={e => setNested('therapy', 'sessionsIncluded', e.target.value)} type="number" />
                <Field label="Extra Session Cost" value={form.therapy.extraSessionCost} onChange={e => setNested('therapy', 'extraSessionCost', e.target.value)} type="number" />
              </div>
            </div>

            {/* Food & Diet */}
            <div>
              <SectionTitle title="Food & Diet" />
              <div className="grid grid-cols-2 gap-[12px]">
                <Field label="Diet Type"    value={form.foodAndDiet.dietType}    onChange={e => setNested('foodAndDiet', 'dietType', e.target.value)} />
                <Field label="Meals Per Day" value={form.foodAndDiet.mealsPerDay} onChange={e => setNested('foodAndDiet', 'mealsPerDay', e.target.value)} type="number" />
              </div>
            </div>

            {/* Additional Charges */}
            <div>
              <SectionTitle title="Additional Charges" />
              <div className="grid grid-cols-2 gap-[12px]">
                <Field label="Additional Charge"  value={form.additionalCharges.additionalCharge}  onChange={e => setNested('additionalCharges', 'additionalCharge', e.target.value)}  type="number" />
                <Field label="Adjustment Charge"  value={form.additionalCharges.adjustmentCharge}  onChange={e => setNested('additionalCharges', 'adjustmentCharge', e.target.value)}  type="number" />
              </div>
            </div>

            {/* Doctor & Nursing */}
            <div>
              <SectionTitle title="Doctor & Nursing Charges" />
              <div className="grid grid-cols-3 gap-[12px]">
                <Field label="Consultation Rate" value={form.doctorAndNursing.consultationRate} onChange={e => setNested('doctorAndNursing', 'consultationRate', e.target.value)} type="number" />
                <Field label="Daily Rate"        value={form.doctorAndNursing.dailyRate}        onChange={e => setNested('doctorAndNursing', 'dailyRate', e.target.value)}        type="number" />
                <Field label="Nursing"           value={form.doctorAndNursing.nursing}          onChange={e => setNested('doctorAndNursing', 'nursing', e.target.value)}          type="number" />
              </div>
            </div>
          </div>

          {/* RIGHT column — Package Summary */}
          <div className="w-[240px] flex-shrink-0 flex flex-col gap-[16px]">
            <div>
              <SectionTitle title="Room Charges" />
              <Field label="Room Charges" value={form.packageSummary.roomCharges}
                onChange={e => setNested('packageSummary', 'roomCharges', e.target.value)} type="number" />
            </div>

            <div>
              <SectionTitle title="Summary Values" />
              <div className="flex flex-col gap-[8px]">
                {[
                  ['Base Package', 'basePackage'], ['Medicines', 'medicines'],
                  ['Therapy', 'therapy'], ['Food & Diet', 'foodAndDiet'],
                  ['Additional Charges', 'additionalCharges'],
                  ['Doctor & Nursing', 'doctorNursingCharges'],
                  ['Package Discount', 'packageDiscount'],
                ].map(([label, key]) => (
                  <Field key={key} label={label} type="number"
                    value={form.packageSummary[key]}
                    onChange={e => setNested('packageSummary', key, e.target.value)} />
                ))}
              </div>
            </div>

            <PackageSummaryPanel summary={form.packageSummary} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-[12px] px-[28px] pb-[24px] pt-[8px] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="h-[40px] px-[20px] rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#666666] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-[40px] px-[24px] rounded-[8px] bg-[#051F20] text-white text-[13px] font-medium hover:bg-[#0d3638] transition-colors"
          >
            Save Package
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePackageModal
