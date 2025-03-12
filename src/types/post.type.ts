export interface PostReponse {
  id: string,
  title: string,
  body: string,
  tags: TagResponse[],
  username: string,
  kind: string,
  createdAt: string,
  upVoted: number,
  downVoted: number
}

export type TagResponse = {
  id: string,
  name: string
}