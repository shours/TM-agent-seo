import { FormatOptions } from '../../types/formatting';

export const formatWritingContent = (text: string, options: FormatOptions = {}): string => {
  if (!text) return '';
  
  const lines = text.split('\n');
  let formattedContent = '';
  let inBlock = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      formattedContent += `\n${trimmed}\n\n`;
      inBlock = true;
    } else if (trimmed.startsWith('<')) {
      formattedContent += `\n${trimmed}\n`;
      inBlock = true;
    } else if (trimmed.endsWith('>')) {
      formattedContent += `${trimmed}\n\n`;
      inBlock = false;
    } else if (trimmed) {
      formattedContent += inBlock ? `${trimmed}\n` : `${trimmed}\n\n`;
    }
  });
  
  return formattedContent;
};