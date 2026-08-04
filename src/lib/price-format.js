export default function getFormattedPrice(price) {
    // is price is a valid number
    if (price == null) {
        return "N/A"
    }
    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
        return "N/A"
    } else {
        return "LKR" + priceNumber.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

}