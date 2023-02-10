import httpService from "../services/http.service";

const userEndpoint = "user/";
const userService = {
    update: async (id, formData) => {
        const { data } = await httpService.patch(userEndpoint + id, formData);
        return data;
    },
    put: async (id, formData) => {
        const { data } = await httpService.put(userEndpoint + id, formData);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(userEndpoint, {
            userId: id
        });
        return data;
    },

    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    post: async (formData) => {
        const { data } = await httpService.post(userEndpoint, {
            userId: formData
        });
        return data;
    },

    postCurrentUser: async (UserId) => {
        const { data } = await httpService.post(userEndpoint, {
            userId: UserId
        });
        return data;
    }
};

export default userService;
