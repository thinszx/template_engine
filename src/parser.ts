export class TemplateParser {
    private template: string;
    private data: Map<string, any> = new Map();
    private callbacks: Map<string, Function[]> = new Map();
    private element: HTMLElement | null = null;
    private watchedKeys: Set<string> = new Set();

    constructor(template: string, element?: HTMLElement) {
        this.template = template;
        this.element = element || null;
        this.initializeWatchers();
    }

    // Find all template variables and initialize watchers
    private initializeWatchers(): void {
        const pattern = /{{[\s]*([^}]+)[\s]*}}/g;
        let match;
        
        while ((match = pattern.exec(this.template)) !== null) {
            const key = match[1].trim();
            this.watchedKeys.add(key);
            
            if (!this.data.has(key)) {
                this.data.set(key, '');
            }
        }
    }

    // Bind data object to template variables
    bindData(data: Record<string, any>): void {
        Object.entries(data).forEach(([key, value]) => {
            this.set(key, value);
        });
    }

    // Set DOM element for updates
    setElement(element: HTMLElement): void {
        this.element = element;
        this.render();
    }

    // Set value for a template variable
    set(key: string, value: any): void {
        this.data.set(key, value);
        this.notifyUpdate(key);
    }

    // Add callback for variable changes
    watch(key: string, callback: Function): void {
        if (!this.callbacks.has(key)) {
            this.callbacks.set(key, []);
        }
        this.callbacks.get(key)?.push(callback);
    }

    // Trigger update callbacks
    private notifyUpdate(key: string): void {
        this.callbacks.get(key)?.forEach(callback => callback(this.data.get(key)));
        this.render();
    }

    // Update DOM with current template state
    private render(): void {
        if (this.element) {
            this.element.innerHTML = this.result;
        }
    }

    // Get current template state
    get result(): string {
        let boundTemplate = this.template;
        
        // Process variable replacements
        for (const [key, value] of this.data.entries()) {
            boundTemplate = this.bindAttribute(boundTemplate, key, value);
        }
        
        return boundTemplate;
    }

    private bindAttribute(template: string, attribute: string, value: string): string {
        return template.replace(
            new RegExp(`{{\\s*${attribute}\\s*}}`, 'g'), 
            String(value)
        );
    }

    // Getter for data access
    getData(key: string): any {
        return this.data.get(key);
    }
}

export async function parse(templatePath: string, data?: Record<string, any>) {
    const response = await fetch(templatePath);
    const template = await response.text();
    const parser = new TemplateParser(template);
    
    if (data) {
        parser.bindData(data);
    }
    
    return parser;
}