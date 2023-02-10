import httpService from "./http.service";
const favouriteEndpoint = "favourite/";

const favouriteService = {
    update: async (id, content) => {
        const { data } = await httpService.put(favouriteEndpoint + id, content);
        return data;
    },
    getfavouriteUserAuth: async (id) => {
        const { data } = await httpService.get(favouriteEndpoint, {
            params: {
                userId: id
            }
        });
        return data;
    },

    create: async (content) => {
        const { data } = await httpService.post(favouriteEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(favouriteEndpoint, {
            params: {
                id: id
            }
        });
        return data;
    }
};
export default favouriteService;
