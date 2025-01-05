export function renderTemplate(template: string, data: Record<string, any>): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    return key in data ? data[key] : match;
  });
} 