import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionById } from '../redux/transactionsSlice';
import { formatMoney, formatDate } from '../utils/format';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const transaction = useSelector((state) =>
    state.transactions.items.find((t) => t.id === id)
  );
  const status = useSelector((state) => state.transactions.status);

  // Nếu chưa có trong store thì fetch từ API
  useEffect(() => {
    if (!transaction) {
      dispatch(fetchTransactionById(id));
    }
  }, [dispatch, id, transaction]);

  if (!transaction && status === 'loading') {
    return <div className="app-container"><p className="status-msg">Đang tải...</p></div>;
  }
  if (!transaction) {
    return <div className="app-container"><div className="error-msg">Không tìm thấy giao dịch</div></div>;
  }

  return (
    <div className="app-container">
      <Link to="/transactions" className="back-link">← Quay lại</Link>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <h1>{transaction.title}</h1>
            <span className={`tag ${transaction.type}`}>
              {transaction.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
            </span>
          </div>
          <Link to={`/transactions/${id}/edit`} className="btn-primary">✏️ Sửa</Link>
        </div>

        <p className="detail-desc">{transaction.description}</p>

        <div className="amount-box">
          <span>{transaction.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}</span>
          <strong>{formatMoney(transaction.amount)}</strong>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span>Danh mục</span>
            <strong>{transaction.category}</strong>
          </div>
          <div className="info-item">
            <span>Ngày</span>
            <strong>{formatDate(transaction.date)}</strong>
          </div>
          <div className="info-item">
            <span>Phương thức thanh toán</span>
            <strong>{transaction.paymentMethod}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
