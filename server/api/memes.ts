import { MemeResponse } from '~/models/Meme';
const API_URL = 'https://api.imgflip.com/get_memes'

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch<MemeResponse>(API_URL)
    if (response.success) {
      return response.data.memes
    }
    return []
  } catch (error) {
    console.error(error)
  }
})
