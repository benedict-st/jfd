import httpService from "./http.service";
const basketEndpoint = "basket/";

const basketService = {
    update: async (content) => {
        const { data } = await httpService.put(basketEndpoint, content);
        return data;
    },

    getBasketUser: async (id) => {
        const { data } = await httpService.get(basketEndpoint, {
            params: {
                userId: id
            }
        });
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(basketEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(basketEndpoint, {
            params: {
                productId: id
            }
        });
        return data;
    }
};
export default basketService;
