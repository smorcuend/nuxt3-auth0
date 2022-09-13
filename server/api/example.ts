const API_URL = "https://api.imgflip.com/get_memes";

type MemeResponse = {
  success: boolean;
  data: {
    memes: {
      id: string;
      name: string;
      url: string;
      width: number;
      height: number;
    }[];
  };
};

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch<MemeResponse>(API_URL);
    if (response.success) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
});
