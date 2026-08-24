import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTransactions, removeTransaction } from '../redux/transactionsSlice';
import { formatMoney, formatDate } from '../utils/format';
import { CATEGORIES } from '../utils/constants';
import useFilter from '../hooks/useFilter';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: transactions, status, error } = useSelector((state) => state.transactions);

  // Dùng custom hook để lọc
  const {
    search, setSearch,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    filtered, hasFilter, resetFilters,
  } = useFilter(transactions);

  // Gọi API lấy danh sách khi component mount
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Xóa giao dịch
  function handleDelete(id, title) {
    if (window.confirm(`Xóa "${title}"?`)) {
      dispatch(removeTransaction(id));
    }
  }

  // Tính tổng thu nhập, chi tiêu
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="app-container">
      <h1>Quản Lý Thu Chi Cá Nhân</h1>

      {/* Tóm tắt thu chi */}
      <div className="summary-row">
        <div className="summary-card">
          <span>Thu nhập</span>
          <strong className="text-green">{formatMoney(income)}</strong>
        </div>
        <div className="summary-card">
          <span>Chi tiêu</span>
          <strong className="text-red">{formatMoney(expense)}</strong>
        </div>
        <div className="summary-card">
          <span>Số dư</span>
          <strong className="text-blue">{formatMoney(income - expense)}</strong>
        </div>
      </div>

      {/* Thanh công cụ */}
      <div className="toolbar">
        <h2>Danh sách giao dịch</h2>
        <button className="btn-primary" onClick={() => navigate('/transactions/create')}>+ Thêm mới</button>
      </div>

      {/* Bộ lọc */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">Tất cả loại</option>
          <option value="income">Thu nhập</option>
          <option value="expense">Chi tiêu</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Tất cả danh mục</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {hasFilter && (
          <button className="btn-reset" onClick={resetFilters}>Đặt lại bộ lọc</button>
        )}
      </div>

      {hasFilter && (
        <p className="count">Tìm thấy <strong>{filtered.length}</strong> giao dịch</p>
      )}

      {/* Trạng thái loading / error */}
      {status === 'loading' && <p className="status-msg">Đang tải dữ liệu...</p>}
      {status === 'failed' && (
        <div className="error-msg">
          <span>{error}</span>
          <button onClick={() => dispatch(fetchTransactions())}>Thử lại</button>
        </div>
      )}

      {/* Bảng dữ liệu */}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="empty-msg">Không có giao dịch nào.</p>
      )}

      {status === 'succeeded' && filtered.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Giao dịch</th>
              <th>Danh mục</th>
              <th>Ngày</th>
              <th>Số tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>
                  <strong>{t.title}</strong>
                  <small>{t.description}</small>
                </td>
                <td>
                  <span className={`tag ${t.type}`}>{t.category}</span>
                </td>
                <td>{formatDate(t.date)}</td>
                <td className={t.type === 'income' ? 'text-green' : 'text-red'}>
                  <strong>{t.type === 'income' ? '+' : '-'}{formatMoney(t.amount)}</strong>
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn-sm btn-view" onClick={() => navigate(`/transactions/${t.id}`)}>Xem</button>
                    <button className="btn-sm btn-edit" onClick={() => navigate(`/transactions/${t.id}/edit`)}>Sửa</button>
                    <button className="btn-sm btn-del" onClick={() => handleDelete(t.id, t.title)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
