import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_productos } from "../../services/s_productos";
export const headerComponent = ref<HTMLElement | null>(null);
export const padre_contenedor_scroll = ref<HTMLElement | null>(null);
export const contenedor_scroll = ref<HTMLElement | null>(null);
export const contenedor_children_scroll = ref<HTMLElement | null>(null);
export const children_elemento1_scroll = ref<HTMLElement | null>(null);
export const children_elemento2_scroll = ref<HTMLElement | null>(null);
export const contenedor_gallery_basics = ref<HTMLElement | null>(null);

export class class_universalIcons {
  public static existeArticuloEnCarrito = ref<boolean>(false);
  public static producto = ref<any>(undefined);

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

    this.Producto();
  }

  public static async Producto() {
    const data: any = {
      id_producto: 2,
    };

    let response: any = await c_productos.fn_l_productos(data);

    if (!IsNullOrEmpty(dgav.dataBase.message)) {
      notify.error(dgav.dataBase.message);
      return;
    }

    if (response) {
      this.producto.value = response;
    }
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
          "after:opacity-0",
          "after:opacity-30"
        );
      } else {
        site.replaceClass(vchildren_elemento1_scroll, "hidden", "flex");
        site.replaceClass(vchildren_elemento2_scroll, "flex", "hidden");
        site.replaceClass(
          vpadre_contenedor_scroll,
          "after:opacity-30",
          "after:opacity-0"
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
