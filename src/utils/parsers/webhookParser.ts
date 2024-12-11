import { WebhookResponse } from '../../types/webhook';
import { AnalysisFormData, AnalysisResponse } from '../../types/analysis';

export const parseWebhookResponse = (
  response: string | WebhookResponse,
  formData: AnalysisFormData
): AnalysisResponse => {
  if (typeof response === 'string') {
    // Split the response into parts
    const parts = response.split(/\s+(?=\w{24}\s+(?:English|Français)\s+)/);
    
    if (parts.length >= 2) {
      const [content, metadata] = parts;
      
      // Extract metadata
      const metadataMatch = metadata.match(/(\w{24})\s+(English|Français)\s+(.+)/);
      
      if (metadataMatch) {
        const [, serpamicsId, language, analysis] = metadataMatch;
        
        return {
          content: content.trim(),
          serpamicsId,
          keyword: formData.keyword,
          language: language === 'Français' ? 'fr' : 'en',
          analysis: analysis.trim()
        };
      }
    }
    
    // Fallback if parsing fails
    return {
      content: response,
      serpamicsId: '',
      keyword: formData.keyword,
      language: formData.language,
      analysis: ''
    };
  }

  // Handle structured response
  return {
    content: response.content,
    serpamicsId: response.metadata?.serpamicsId || '',
    keyword: response.metadata?.keyword || formData.keyword,
    language: response.metadata?.language || formData.language,
    analysis: response.metadata?.analysis || ''
  };
};