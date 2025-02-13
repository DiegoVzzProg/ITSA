import { ref } from "vue";
import { c_productos } from "../../services/s_productos";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_clientes } from "../../services/s_clientes";
import { sp_list_products } from "../../stores/sp_listProducts";

export const productos = ref<any>([]);
export const imgsPrincipal = ref<any>([
  {
    texto: "fresh icons",
    class: "imagen_1 animate-fade-in-down block",
  },
  {
    texto: "useful mockups",
    class: "imagen_2 animate-fade-in-up hidden",
  },
  {
    texto: "coll illustration",
    class: "imagen_3 animate-fade-in-up hidden",
  },
  {
    texto: "lovely type",
    class: "imagen_4 animate-fade-in-up hidden",
  },
]);

const section1 = ref<HTMLElement | null>(null);
const section2 = ref<HTMLElement | null>(null);
const section3 = ref<HTMLElement | null>(null);
const section4 = ref<HTMLElement | null>(null);

export class class_home {
  public static onInit() {
    this.Productos();

    let sessionExpire: boolean =
      Boolean(site.getCookie("session", false)) ?? false;

    if (sessionExpire) {
      site.allDeleteCookies();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    section1.value = document.getElementById("section1") as HTMLElement;
    section2.value = document.getElementById("section2") as HTMLElement;
    section3.value = document.getElementById("section3") as HTMLElement;
    section4.value = document.getElementById("section4") as HTMLElement;

    window.addEventListener("scroll", this.onHandleScroll);
  }

  public static onUnInit() {
    window.removeEventListener("scroll", this.onHandleScroll);
  }

  public static onHandleScroll() {
    if (
      !section1.value ||
      !section2.value ||
      !section3.value ||
      !section4.value
    )
      return;

    const section1Pass: boolean =
      section1.value.getBoundingClientRect().bottom <= 0;
    const section2Pass: boolean =
      section2.value.getBoundingClientRect().bottom <= 0;
    const section3Pass: boolean =
      section3.value.getBoundingClientRect().bottom <= 0;

    const elements: any = {
      imagen_1: document.querySelector(".imagen_1") as HTMLElement,
      imagen_2: document.querySelector(".imagen_2") as HTMLElement,
      imagen_3: document.querySelector(".imagen_3") as HTMLElement,
      imagen_4: document.querySelector(".imagen_4") as HTMLElement,
    };

    if (section1Pass) {
      site.replaceClass(elements.imagen_1, "block", "hidden");
      site.replaceClass(elements.imagen_2, "hidden", "block");
      site.replaceClass(elements.imagen_3, "block", "hidden");
      site.replaceClass(elements.imagen_4, "block", "hidden");
    } else {
      site.replaceClass(elements.imagen_1, "hidden", "block");
      site.replaceClass(elements.imagen_2, "block", "hidden");
      site.replaceClass(elements.imagen_3, "block", "hidden");
      site.replaceClass(elements.imagen_4, "block", "hidden");
    }

    if (section2Pass) {
      site.replaceClass(elements.imagen_1, "block", "hidden");
      site.replaceClass(elements.imagen_2, "block", "hidden");
      site.replaceClass(elements.imagen_3, "hidden", "block");
      site.replaceClass(elements.imagen_4, "block", "hidden");
    }

    if (section3Pass) {
      site.replaceClass(elements.imagen_1, "block", "hidden");
      site.replaceClass(elements.imagen_2, "block", "hidden");
      site.replaceClass(elements.imagen_3, "block", "hidden");
      site.replaceClass(elements.imagen_4, "hidden", "block");
    }
  }

  public static async Productos() {
    const data: Record<string, any> = {
      id_producto: 0,
    };

    const prueba: any = await sp_list_products().execute(data);

    const response: any = await c_productos.listProducts({
      id_producto: 0,
    });
    if (response) {
      if (!IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return;
      }
      productos.value = response;
    }
  }

  public static ObtenerHoverEfecto(): string {
    return `hover:bg-[#0000]`;
  }
}
