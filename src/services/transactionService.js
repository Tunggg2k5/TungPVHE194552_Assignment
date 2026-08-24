import axios from 'axios';

const API_URL = 'http://localhost:3001/transactions';

// Lấy tất cả giao dịch
export async function getAllTransactions() {
  try {
    const res = await axios.get(API_URL + '?_sort=-date');
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể tải dữ liệu');
  }
}

// Lấy 1 giao dịch theo id
export async function getTransactionById(id) {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không tìm thấy giao dịch');
  }
}

// Thêm giao dịch mới (POST)
export async function createTransaction(data) {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Thêm giao dịch thất bại');
  }
}

// Cập nhật giao dịch (PUT)
export async function updateTransaction(id, data) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Cập nhật thất bại');
  }
}

// Xóa giao dịch (DELETE)
export async function deleteTransaction(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Xóa thất bại');
  }
}
