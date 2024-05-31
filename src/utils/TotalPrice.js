export const TotalPrice = (a, b) =>{
    return a * b;
}

export const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const removeSpecialCharacters = (text) => {
    return text.replace(/[^0-9-]/g, ''); // Giữ lại số và ký tự "-"
  };