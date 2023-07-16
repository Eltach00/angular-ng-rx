export class CommentDto {
  comment: {
    body: string;
  };

  constructor(body: string) {
    this.comment = {
      body,
    };
  }
}
