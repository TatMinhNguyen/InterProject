export const TotalPrice = (a, b) =>{
    return a * b;
}

export const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};