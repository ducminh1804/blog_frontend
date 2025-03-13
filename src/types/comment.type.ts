export type CommentContent = {
  id: number,
  username: string
  userId: string,
  content: string,
  createdAt: string,
  voteDown: number,
  voteUp: number,
  parentId: number
}

export type Pageable = {
  pageNumber: number,
  pageSize: number,
}

export type CommentResponse = {
  content: CommentContent[],
  pageable: Pageable,
  last: boolean,
  totalPages: number,
  totalElements: number,
  first: boolean,
  size: number,
  numberOfElements: number
}

// 