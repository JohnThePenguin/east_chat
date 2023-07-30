import Cookies from "js-cookie";

export const setToken = async (token: string) => {
    await Cookies.set("token", token);

    console.log("setToken", token, await Cookies.get("token"));
};

export const getToken = async (): Promise<string> => {
    return await Cookies.get("token");
};
