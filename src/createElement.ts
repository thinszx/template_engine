export type Props = Record<string, any>;
export type Child = HTMLElement | string | number | boolean | null | undefined;

export function createElement(
  tag: string | Function,
  props: Props | null,
  ...children: Child[]
): HTMLElement {
  // If tag is a function component
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }

  const element = document.createElement(tag);

  // Process attributes
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        // Event handling
        const eventName = key.toLowerCase().substring(2);
        element.addEventListener(eventName, value);
      } else {
        // Ordinary attribute
        element.setAttribute(key, value.toString());
      }
    });
  }

  // Process child elements
  children.flat().forEach(child => {
    if (child === null || child === undefined) return;
    
    const node = 
      typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean'
        ? document.createTextNode(child.toString())
        : child;
    
    element.appendChild(node);
  });

  return element;
}

export function Fragment(props: { children: Child[] }): DocumentFragment {
  const fragment = document.createDocumentFragment();
  props.children.forEach(child => {
    if (child === null || child === undefined) return;
    
    const node = 
      typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean'
        ? document.createTextNode(child.toString())
        : child;
    
    fragment.appendChild(node);
  });
  return fragment;
} 