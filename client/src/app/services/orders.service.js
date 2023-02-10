import httpService from "./http.service";
const ordersEndpoint = "orders/";

const ordersService = {
    get: async (id) => {
        const { data } = await httpService.get(ordersEndpoint, {
            params: {
                userId: id
            }
        });

        return data;
    },
    getOrdersUser: async (user) => {
        const { data } = await httpService.get(ordersEndpoint, {
            params: {
                userId: user
            }
        });
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(ordersEndpoint, content);

        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(ordersEndpoint, {
            params: {
                ordersId: id
            }
        });
        return data;
    }
};
export default ordersService;
