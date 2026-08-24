import { useState } from 'react';
import { CATEGORIES, PAYMENT_METHODS } from '../utils/constants';

// Component form dùng chung cho cả Thêm và Sửa giao dịch
export default function TransactionForm({ initialData, onSubmit, saving, submitLabel = 'Thêm giao dịch' }) {
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: initialData?.type || 'expense',
    amount: initialData?.amount ? String(initialData.amount) : '',
    date: initialData?.date || today,
    category: initialData?.category || 'Ăn uống',
    paymentMethod: initialData?.paymentMethod || 'Tiền mặt',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Vui lòng nhập tên giao dịch';
    if (!form.description.trim()) errs.description = 'Vui lòng nhập mô tả';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Số tiền phải lớn hơn 0';
    if (!form.date) errs.date = 'Vui lòng chọn ngày';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      type: form.type,
      amount: Number(form.amount),
      date: form.date,
      category: form.category,
      paymentMethod: form.paymentMethod,
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label>Loại giao dịch</label>
        <div className="type-toggle">
          <button type="button" className={form.type === 'expense' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'expense' })}>Chi tiêu</button>
          <button type="button" className={form.type === 'income' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'income' })}>Thu nhập</button>
        </div>
      </div>

      <div className="form-group">
        <label>Tên giao dịch</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="VD: Tiền ăn, Lương..." />
        {errors.title && <small className="field-err">{errors.title}</small>}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Ghi chú..." />
        {errors.description && <small className="field-err">{errors.description}</small>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Số tiền (VNĐ)</label>
          <input name="amount" type="number" min="1" step="1000" value={form.amount} onChange={handleChange} />
          {errors.amount && <small className="field-err">{errors.amount}</small>}
        </div>
        <div className="form-group">
          <label>Ngày</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          {errors.date && <small className="field-err">{errors.date}</small>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Danh mục</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Phương thức thanh toán</label>
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? 'Đang lưu...' : submitLabel}
      </button>
    </form>
  );
}
