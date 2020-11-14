import moment from "moment";
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

	get readableDate() {
		// return this.date.toLocaleDateString("en-EN", {
		// 	year: "numeric",
		// 	month: "long",
		// 	day: "numeric",
		// 	hour: "2-digit",
		// 	minute: "2-digit",
		// });
		return moment(this.date).format("MMMM Do YYYY, hh:mm");
	}
}
