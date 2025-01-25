import { replaceClass } from "../../utils/site";

export class c_universalIconsView {
  public static onInit() {
    const header: any = document.getElementById("header") as HTMLElement;
    const footer: any = document.getElementById("footer") as HTMLElement;
    const overflow2: any = document.getElementById("overflow2") as HTMLElement;

    window.scrollTo({ top: 0, behavior: "smooth" });
    const main_contenedor: any = document.getElementById(
      "main_contenedor"
    ) as HTMLElement;
    replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]");

    const div_contenedor_gallery_basics_1: any = document.getElementById(
      "div_contenedor_gallery_basics_1"
    ) as HTMLElement;
    const div_contenedor_gallery_basics_2: any = document.getElementById(
      "div_contenedor_gallery_basics_2"
    ) as HTMLElement;
    const div_sub_contenedor_2 = document.getElementById(
      "div_sub_contenedor_2"
    ) as HTMLElement;
    const targetRect = div_sub_contenedor_2.getBoundingClientRect();

    div_contenedor_gallery_basics_1.addEventListener("scroll", () => {
      if (
        div_contenedor_gallery_basics_1.scrollTop >=
        targetRect.height - 100
      ) {
        replaceClass(overflow2, "opacity-0", "opacity-60");
        replaceClass(footer, "hidden", "flex");
        replaceClass(div_contenedor_gallery_basics_2, "hidden", "flex");
      } else {
        replaceClass(overflow2, "opacity-60", "opacity-0");
        replaceClass(header, "bg-white", "bg-transparent");
        replaceClass(footer, "flex", "hidden");
        replaceClass(div_contenedor_gallery_basics_2, "flex", "hidden");
      }
    });

    window.addEventListener("scroll", c_universalIconsView.handleScroll);
  }

  public static handleScroll = () => {
    const header: any = document.getElementById("header") as HTMLElement;
    const targetRect: any = document
      .getElementById("div_sub_contenedor_2")
      ?.getBoundingClientRect();

    if (window.scrollY >= targetRect.height) {
      replaceClass(header, "bg-transparent", "bg-white");
    } else {
      replaceClass(header, "bg-white", "bg-transparent");
    }
  };
}
