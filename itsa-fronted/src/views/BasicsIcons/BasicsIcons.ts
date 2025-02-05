import { ref } from "vue";
import { site } from "../../utils/site";

export const headerComponent = ref<HTMLElement | null>(null);
export const padre_contenedor_scroll = ref<HTMLElement | null>(null);
export const contenedor_scroll = ref<HTMLElement | null>(null);
export const contenedor_children_scroll = ref<HTMLElement | null>(null);
export const children_elemento1_scroll = ref<HTMLElement | null>(null);
export const children_elemento2_scroll = ref<HTMLElement | null>(null);
export const contenedor_gallery_basics = ref<HTMLElement | null>(null);

export class class_basicsIcons {
  public static onInit() {
    headerComponent.value = document.getElementById("header") as HTMLElement;
    headerComponent.value?.classList.add("bg-transparent");
    headerComponent.value?.classList.remove("bg-white");
    padre_contenedor_scroll.value = document.getElementById(
      "padre_contenedor_scroll"
    ) as HTMLElement;
    contenedor_scroll.value = document.getElementById(
      "contenedor_scroll"
    ) as HTMLElement;
    contenedor_children_scroll.value = document.getElementById(
      "contenedor_children_scroll"
    ) as HTMLElement;
    children_elemento1_scroll.value = document.getElementById(
      "children_elemento1_scroll"
    ) as HTMLElement;
    children_elemento2_scroll.value = document.getElementById(
      "children_elemento2_scroll"
    ) as HTMLElement;
    contenedor_gallery_basics.value = document.getElementById(
      "contenedor_gallery_basics"
    ) as HTMLElement;

    window.addEventListener("scroll", this.handleScroll);
  }
  public static onUnInit() {
    headerComponent.value?.classList.add("bg-white");
    headerComponent.value?.classList.remove("bg-transparent");
    window.removeEventListener("scroll", this.handleScroll);
  }

  public static handleScroll = () => {
    if (
      contenedor_scroll.value &&
      contenedor_children_scroll.value &&
      padre_contenedor_scroll.value &&
      contenedor_gallery_basics.value
    ) {
      const rect = contenedor_scroll.value.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const topAbsoluto = rect.top + scrollTop;

      const vpadre_contenedor_scroll: any = padre_contenedor_scroll.value;
      const IsMiddle =
        vpadre_contenedor_scroll.getBoundingClientRect().height / 2 <=
        topAbsoluto;
      const vchildren_elemento1_scroll: any = children_elemento1_scroll.value;
      const vchildren_elemento2_scroll: any = children_elemento2_scroll.value;

      if (IsMiddle) {
        site.replaceClass(vchildren_elemento1_scroll, "flex", "hidden");
        site.replaceClass(vchildren_elemento2_scroll, "hidden", "flex");
        site.replaceClass(
          vpadre_contenedor_scroll,
          "bg-[rgba(183,164,237,0.45)]",
          "bg-[rgba(25,18,44,0.7)]"
        );
      } else {
        site.replaceClass(vchildren_elemento1_scroll, "hidden", "flex");
        site.replaceClass(vchildren_elemento2_scroll, "flex", "hidden");
        site.replaceClass(
          vpadre_contenedor_scroll,
          "bg-[rgba(25,18,44,0.7)]",
          "bg-[rgba(183,164,237,0.45)]"
        );
      }

      const headerRect = headerComponent.value?.getBoundingClientRect();
      const galleryRect =
        contenedor_gallery_basics.value?.getBoundingClientRect();

      if (headerRect && galleryRect) {
        const headerBottom = headerRect.bottom;
        const galleryTop = galleryRect.top;
        const distance = galleryTop - headerBottom;

        if (distance <= 0) {
          headerComponent.value?.classList.add("bg-white");
          headerComponent.value?.classList.remove("bg-transparent");
        } else {
          headerComponent.value?.classList.add("bg-transparent");
          headerComponent.value?.classList.remove("bg-white");
        }
      }
    }
  };
}
