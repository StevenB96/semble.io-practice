import { ContentType } from "./Enums";

export type Comment = {
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string,
}

export type Post = {
    id: number,
    userId: number,
    title: string,
    body: string,
    comments?: Comment[],
}

export type UpdateForm = {
    id: number,
    type: ContentType,
    title: string,
    text: string,
}