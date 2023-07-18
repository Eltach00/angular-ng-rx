export class PostDto {
  article: {
    body: string;
    description: string;
    tagList: string[];
    title: string;
  };
  constructor({ desc, body, tags, title }) {
    const formatTags = [...(<string>tags).split(',').map((tag) => tag.trim())];
    this.article = {
      body,
      description: desc,
      tagList: formatTags,
      title,
    };
  }
}
