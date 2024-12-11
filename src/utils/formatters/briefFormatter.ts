import { FormatOptions } from '../../types/formatting';

export const formatBriefContent = (text: string, options: FormatOptions = {}): string => {
  if (!text) return '';
  
  const lines = text.split('\n');
  let formattedContent = '';
  let previousLineWasHeading = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#')) {
      formattedContent += previousLineWasHeading ? `${trimmed}\n` : `\n${trimmed}\n`;
      previousLineWasHeading = true;
    } else if (trimmed.startsWith('- **')) {
      formattedContent += `\n${trimmed}\n`;
      previousLineWasHeading = false;
    } else if (trimmed) {
      formattedContent += `${trimmed}\n`;
      previousLineWasHeading = false;
    }
  });
  
  return formattedContent;
};