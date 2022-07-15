interface PostImage {
  alt: string;
  url: string;
}

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  type: string;
  postedAt: Date;
  image: PostImage;
  body: string;
}