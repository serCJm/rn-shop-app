export default class CartItem {
	constructor(
		public quantity: number,
		public productPrice: number,
		public productTitle: string,
		public sum: number
	) {
		this.quantity = quantity;
		this.productPrice = productPrice;
		this.productTitle = productTitle;
		this.sum = sum;
	}
}
