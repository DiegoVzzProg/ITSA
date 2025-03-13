class JQueryV2 {
  private elements: Element[];

  constructor(elements: NodeListOf<Element> | Element[]) {
    this.elements = Array.isArray(elements) ? elements : Array.from(elements);
  }

  replaceClass(oldClass: string, newClass: string): JQueryV2 {
    this.elements.forEach((element) => {
      if (element.classList.contains(oldClass)) {
        element.classList.replace(oldClass, newClass);
      }
    });
    return this;
  }

  addClass(newClass: string): JQueryV2 {
    this.elements.forEach((element) => {
      element.classList.add(newClass);
    });
    return this;
  }

  removeClass(oldClass: string): JQueryV2 {
    this.elements.forEach((element) => {
      if (element.classList.contains(oldClass)) {
        element.classList.remove(oldClass);
      }
    });
    return this;
  }

  addStyle(newStyle: string): JQueryV2 {
    this.elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.cssText += ` ${newStyle}`;
      }
    });
    return this;
  }

  find(selector: string): JQueryV2 {
    const foundElements: Element[] = [];
    this.elements.forEach((element) => {
      // querySelectorAll busca dentro de cada elemento del conjunto actual
      const children = element.querySelectorAll(selector);
      foundElements.push(...Array.from(children));
    });
    return new JQueryV2(foundElements);
  }
}

export function $v2(selector: string | HTMLElement): JQueryV2 {
  let elements: NodeListOf<Element> | Element[];

  if (typeof selector === "string") {
    elements = document.querySelectorAll(selector);
  } else {
    elements = [selector];
  }

  return new JQueryV2(elements);
}
