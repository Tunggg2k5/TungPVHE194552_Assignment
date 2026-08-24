import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/transactionsSlice';
import TransactionForm from '../components/TransactionForm';

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(data) {
    setSaving(true);
    try {
      await dispatch(addTransaction(data)).unwrap();
      navigate('/transactions');
    } catch (err) {
      alert(err.message || 'Thêm thất bại');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-container">
      <Link to="/transactions" className="back-link">← Quay lại</Link>
      <h1>Thêm giao dịch mới</h1>
      <TransactionForm onSubmit={handleSubmit} saving={saving} />
    </div>
  );
}
