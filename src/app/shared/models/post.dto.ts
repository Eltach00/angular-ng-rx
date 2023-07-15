export class PostDto {
  article: {
    body: string;
    description: string;
    tagList: string[];
    title: string;
  };
  constructor({ about, post, tags, title }) {
    const formatTags = [...(<string>tags).split(',').map((tag) => tag.trim())];
    this.article = {
      body: post,
      description: about,
      tagList: formatTags,
      title,
    };
  }
}
