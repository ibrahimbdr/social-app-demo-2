export interface PostObj {
  id?: string;
  post: string;
  notified?: boolean;
  editable?: boolean;
  liked?: boolean;
  comments?: string[];
}
