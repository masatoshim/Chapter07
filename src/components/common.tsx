export type PostType = {
    "id": number,
    "title": string,
    "thumbnailUrl": string,
    "createdAt": string,
    "categories": Array<string>,
    "content": string
};

export type BlogListType = {
  "message": string,
  "posts": Array<PostType>
};

export type BlogType = {
  "message": string,
  "post": PostType
};

export type ParamsType = { id: string };

export type ContactType = {
  "name": string,
  "email": string,
  "message": string
}