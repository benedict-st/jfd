import httpService from "./http.service";
const userEndpoint = "products/";

const productsService = {
    update: async (id, formData) => {
        const { data } = await httpService.put(userEndpoint + id, formData);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    post: async (formData) => {
        const { data } = await httpService.post(userEndpoint, formData);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }
};

export default productsService;
