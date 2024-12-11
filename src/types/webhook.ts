export interface WebhookResponse {
  content: string;
  metadata: {
    serpamicsId: string;
    keyword: string;
    language: string;
  };
}

export interface WebhookPayload {
  Result: string;
  'Mot clef': string;
  'data: guide: id': string;
  langue: string;
}