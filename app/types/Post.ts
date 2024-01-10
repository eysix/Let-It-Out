export type PostType = {
  title: string;
  id: string;
  updatedAt?: string;
  User: {
    email: string;
    id: string;
    name: string;
    image: string;
  };
  Comment?: {
    createdAt?: string;
    id: string;
    postId: string;
    userId: string;
    title: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
