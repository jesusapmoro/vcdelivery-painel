import { Order } from "@/Types/Order";
import { OrderStatus } from "@/Types/OrderStatus";
import { Product } from "@/Types/Product";

const tmpProduct: Product = {
    id: 999,
    image:'htpps://saopaulosecreto.com/wp-content/uploads/2022/20/Get-burger-1024x683.jpg',
    category: {
        id: 99,
        name: 'Burger'
    },
    name: 'Burgão Boladão',
    price: 35.3,
    description: 'Um burger boladão muito lega'
}

export const api = {
    login: async (email: string, password: string): Promise<{ error: string, token?: string }> =>{
        return new Promise(resolve => {
            setTimeout(() => {
                if (email !== 'vestcasamoro@gmail.com') {
                    resolve({
                        error: 'E-mail e/ou senha não batem.'
                    });
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    });
                }
            }, 1000);
        });
    },
    forgotPassword: async (email: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ error: '' });
            }, 1000);
        });
    },
    redefinePassword: async (password: string , toke: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ error: '' });
            }, 1000);
        });
    },
    getOrders: async (): Promise<Order[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orders: Order[] = [];
                const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered'];

                for(let i=0;i<6;i++) {
                    orders.push({
                        id: parseInt('12' + i),
                        status: statuses[Math.floor(Math.random() * 3)],
                        orderDate: '2023-01-03 18:30',
                        userid: '1',
                        userName: 'Pedro',
                        shippingAddress: {
                            id: 99,
                            cep: '99999999',
                            address: 'Rua bla bla bal',
                            number: '1200',
                            neighborhood: 'Algem',
                            city: 'São Paulo',
                            state: 'SP',
                            complement: 'AAAAA2'
                        },
                        shippingPrice: 12,
                        paymentType: 'card',
                        changeValue: 0,
                        cupom: 'BLA',
                        cupomDiscount: 2,
                        products: [
                            { qt: 2, product: tmpProduct },
                            { qt: 3, product: {...tmpProduct, id: 888, name: 'Burger Vegetariano' }}
                        ],
                        subtotal: 99,
                        total: 120
                    });

                }
                resolve(orders);
            }, 1000);
        });
    },
    changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
        return true;
    }
}