import type { CommentContent } from "../types/comment.type";

export const initComment = (
  cmt: CommentContent, id: number, postId: string
) => ({
  "pages": [
    {
      "data": {
        "code": 9000,
        "data": {
          "content": [
            cmt],
          "pageable": {
            "pageNumber": 0,
            "pageSize": 2,
            "sort": {
              "empty": true,
              "unsorted": true,
              "sorted": false
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
          },
          "last": false,
          "totalPages": 2,
          "totalElements": 3,
          "first": true,
          "size": 2,
          "number": 0,
          "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": false
          },
          "numberOfElements": 2,
          "empty": false
        }
      },
      "status": 200,
      "statusText": "",
      "headers": {
        "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
        "content-type": "application/json",
        "expires": "0",
        "pragma": "no-cache"
      },
      "config": {
        "transitional": {
          "silentJSONParsing": true,
          "forcedJSONParsing": true,
          "clarifyTimeoutError": false
        },
        "adapter": [
          "xhr",
          "http",
          "fetch"
        ],
        "transformRequest": [
          null
        ],
        "transformResponse": [
          null
        ],
        "timeout": 10000,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
          "Accept": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkNTgwODkwNi05OTZhLTQzYmQtOWRlOC1jMmEyOGI3NGZmM2EiLCJzdWIiOiJtaW5oIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzQyODc3MCwiZXhwIjoxNzQzNTE1MTcwfQ.xnI0xGteKpbXaAFsbCAsImSjwBdU5w54U9JjfEZwNL0"
        },
        "baseURL": "http://localhost:8080/",
        "params": {
          "parentId": id,
          "page": 0,
          "size": 2
        },
        "method": "get",
        "url": `/comments/${postId}`
      },
      "request": {}
    }
  ],
  "pageParams": [
    0
  ]
})
