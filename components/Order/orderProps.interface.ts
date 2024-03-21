import { OrderProduct } from "@/types/order.interface";

export interface OrderProps {
	orderId: number;
	totalPrice: number;
	createdAt: string;
	orderProducts: OrderProduct[];
}
