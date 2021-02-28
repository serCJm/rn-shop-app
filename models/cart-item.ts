export default class CartItem {
	constructor(
		public quantity: number,
		public productPrice: number,
		public productTitle: string,
		public pushToken: string,
		public sum: number
	) {
		this.quantity = quantity;
		this.productPrice = productPrice;
		this.productTitle = productTitle;
		this.pushToken = pushToken;
		this.sum = sum;
	}
}
