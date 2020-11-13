import CartItem from "./cart-item";

export default class Order {
	constructor(
		public id: string,
		public items: CartItem[],
		public totalAmount: number,
		public date: Date
	) {
		this.id = id;
		this.items = items;
		this.totalAmount = totalAmount;
		this.date = date;
	}
}
