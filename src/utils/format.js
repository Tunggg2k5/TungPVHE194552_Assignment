export function formatMoney(value) {
  return Number(value).toLocaleString('vi-VN') + ' ₫';
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString('vi-VN');
}
