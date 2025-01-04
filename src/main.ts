import { TemplateParser } from './parser';

document.addEventListener('DOMContentLoaded', () => {
    // 获取原始模板内容
    const mainElement = document.querySelector('main');
    if (!mainElement) {
        console.error('Main element not found');
        return;
    }
    
    const template = mainElement.innerHTML;
    console.log('Template:', template);  // 调试：查看模板内容
    
    const parser = new TemplateParser(template);
    
    // 初始化数据
    const initialData = {
        show: true,
        dropdown: (document.getElementById('dropdown') as HTMLSelectElement)?.value || 'option1'
    };
    console.log('Initial data:', initialData);  // 调试：查看初始数据
    
    // 绑定数据
    parser.bindData(initialData);
    
    // 设置渲染目标
    parser.setElement(mainElement);
    
    // 监听下拉框变化
    const dropdown = document.getElementById('dropdown') as HTMLSelectElement | null;
    if (!dropdown) {
        console.error('Dropdown element not found');
        return;
    }
    
    dropdown.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        console.log('Dropdown changed:', value);  // 调试：查看值变化
        parser.set('dropdown', value);
    });
}); 