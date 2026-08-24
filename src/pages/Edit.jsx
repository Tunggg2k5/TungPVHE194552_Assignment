import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionById, editTransaction } from '../redux/transactionsSlice';
import TransactionForm from '../components/TransactionForm';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const transaction = useSelector((state) =>
    state.transactions.items.find((t) => t.id === id)
  );
  const [saving, setSaving] = useState(false);

  // Nếu chưa có trong store thì fetch
  useEffect(() => {
    if (!transaction) {
      dispatch(fetchTransactionById(id));
    }
  }, [dispatch, id, transaction]);

  async function handleSubmit(data) {
    setSaving(true);
    try {
      await dispatch(editTransaction({ id, data })).unwrap();
      navigate(`/transactions/${id}`);
    } catch (err) {
      alert(err.message || 'Cập nhật thất bại');
    } finally {
      setSaving(false);
    }
  }

  if (!transaction) {
    return <div className="app-container"><p className="status-msg">Đang tải...</p></div>;
  }

  return (
    <div className="app-container">
      <button className="back-link" onClick={() => navigate(`/transactions/${id}`)}>← Quay lại</button>
      <h1>Sửa giao dịch</h1>
      <TransactionForm
        initialData={transaction}
        onSubmit={handleSubmit}
        saving={saving}
        submitLabel="Cập nhật giao dịch"
      />
    </div>
  );
}
