type Snippet = {
  publisedAt: string;
  title: string;
  description: string;
};

export type Video = {
  id: string;
  etag: string;
  kind: string;
  snippet: Snippet;
};
