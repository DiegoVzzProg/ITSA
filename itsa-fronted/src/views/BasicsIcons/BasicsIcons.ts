import { replaceClass } from "../../utils/site";

export class c_basicsIcons {
  public static handleScroll() {
    const header: any = document.getElementById("header") as HTMLElement;
    const targetRect: any = document
      .getElementById("div_sub_contenedor_2")
      ?.getBoundingClientRect();

    if (window.scrollY >= targetRect.height) {
      replaceClass(header, "bg-transparent", "bg-white");
    } else {
      replaceClass(header, "bg-white", "bg-transparent");
    }
  }
}
