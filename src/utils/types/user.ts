export interface RandomUser {
  name: {
    first: string;
    last: string;
    title?: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  email: string;
}