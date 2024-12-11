import { SaveAnalysisData } from '../../types/analysis';
import { WebhookPayload } from '../../types/webhook';

export const formatSavePayload = (data: SaveAnalysisData): WebhookPayload => {
  return {
    Result: data.content,
    'Mot clef': data.keyword,
    'data: guide: id': data.serpamicsId,
    langue: data.language || 'en'
  };
};