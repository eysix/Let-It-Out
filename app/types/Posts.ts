

export type thePostType = {
  title: string
  id: string
  createdAt: string
  user: {
    name: string
    image: string
  }
  Comment?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
}

export type PostType = {
  postTitle: string;
  id: string;
  name: string;
  avatar: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};