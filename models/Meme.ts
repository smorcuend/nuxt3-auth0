export type Meme = {
  id: string
  name: string
  url: string
  width: number
  height: number
}

export type MemeResponse = {
  success: boolean
  data: {
    memes: Meme[]
  }
}
