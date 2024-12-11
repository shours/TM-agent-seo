export const formatAnalysisContent = (text: string | null): string => {
  if (!text) return '';

  // Split content into sections
  const sections = text.split('###').filter(Boolean);
  
  return sections.map(section => {
    // Process each section
    const lines = section.trim().split('\n');
    let formattedSection = '';
    let inSubList = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Handle section titles
      if (index === 0) {
        formattedSection += `### ${trimmed}\n\n`;
        return;
      }

      // Handle different line types
      if (trimmed.startsWith('- **')) {
        // Add extra spacing before main bullet points
        formattedSection += `\n${trimmed}\n`;
        inSubList = false;
      } else if (trimmed.startsWith('  -')) {
        // Handle sub-bullet points
        formattedSection += `${trimmed}\n`;
        inSubList = true;
      } else if (trimmed.startsWith('-')) {
        // Regular bullet points
        if (!inSubList) {
          formattedSection += '\n';
        }
        formattedSection += `${trimmed}\n`;
        inSubList = false;
      } else if (trimmed) {
        // Regular text
        formattedSection += `${trimmed}\n`;
        inSubList = false;
      }
    });

    return formattedSection;
  }).join('\n');
};

export const formatBriefContent = (text: string): string => {
  if (!text) return '';
  
  const lines = text.split('\n');
  let formattedContent = '';
  let previousLineWasHeading = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('#')) {
      // Add extra spacing before headings
      formattedContent += previousLineWasHeading ? `${trimmed}\n` : `\n${trimmed}\n`;
      previousLineWasHeading = true;
    } else if (trimmed.startsWith('- **')) {
      // Add spacing before main bullet points
      formattedContent += `\n${trimmed}\n`;
      previousLineWasHeading = false;
    } else if (trimmed) {
      formattedContent += `${trimmed}\n`;
      previousLineWasHeading = false;
    }
  });
  
  return formattedContent;
};

export const formatWritingContent = (text: string): string => {
  if (!text) return '';
  
  const lines = text.split('\n');
  let formattedContent = '';
  let inBlock = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      // HTML-like tags get extra spacing
      formattedContent += `\n${trimmed}\n\n`;
      inBlock = true;
    } else if (trimmed.startsWith('<')) {
      // Opening tags
      formattedContent += `\n${trimmed}\n`;
      inBlock = true;
    } else if (trimmed.endsWith('>')) {
      // Closing tags
      formattedContent += `${trimmed}\n\n`;
      inBlock = false;
    } else if (trimmed) {
      // Regular content
      formattedContent += inBlock ? `${trimmed}\n` : `${trimmed}\n\n`;
    }
  });
  
  return formattedContent;
};