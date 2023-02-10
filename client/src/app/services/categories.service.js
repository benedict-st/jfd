import httpService from "./http.service";
const categoriesEndpoint = "categories/";

const CategoriesService = {
    update: async (id, content) => {
        const { data } = await httpService.put(
            categoriesEndpoint + id,
            content
        );
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(categoriesEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(categoriesEndpoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(categoriesEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(categoriesEndpoint + id);
        return data;
    }
};
export default CategoriesService;
