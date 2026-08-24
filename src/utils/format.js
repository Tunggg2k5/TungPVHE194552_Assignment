export function formatMoney(value) {
  return Number(value).toLocaleString('vi-VN') + ' vn₫';
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString('vi-VN');
}
