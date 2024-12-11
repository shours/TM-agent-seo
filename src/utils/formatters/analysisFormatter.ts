import { FormatOptions } from '../../types/formatting';

export const formatAnalysisContent = (text: string | null, options: FormatOptions = {}): string => {
  if (!text) return '';

  const sections = text.split('###').filter(Boolean);
  
  return sections.map(section => {
    const lines = section.trim().split('\n');
    let formattedSection = '';
    let inSubList = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (index === 0) {
        formattedSection += `### ${trimmed}\n\n`;
        return;
      }

      if (trimmed.startsWith('- **')) {
        formattedSection += `\n${trimmed}\n`;
        inSubList = false;
      } else if (trimmed.startsWith('  -')) {
        formattedSection += `${trimmed}\n`;
        inSubList = true;
      } else if (trimmed.startsWith('-')) {
        if (!inSubList) formattedSection += '\n';
        formattedSection += `${trimmed}\n`;
        inSubList = false;
      } else if (trimmed) {
        formattedSection += `${trimmed}\n`;
        inSubList = false;
      }
    });

    return formattedSection;
  }).join('\n');
};