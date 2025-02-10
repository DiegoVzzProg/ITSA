import { ref } from "vue";
import { c_productos } from "../../services/s_productos";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_clientes } from "../../services/s_clientes";
import Cookies from "js-cookie";

export const productos = ref<any>([]);
export const imgsPrincipal = ref<any>(null);

const section1 = ref<HTMLElement | null>(null);
const section2 = ref<HTMLElement | null>(null);
const section3 = ref<HTMLElement | null>(null);
const section4 = ref<HTMLElement | null>(null);

export class class_home {
  public static onInit() {
    this.Productos();

    section1.value = document.getElementById("section1") as HTMLElement;
    section2.value = document.getElementById("section2") as HTMLElement;
    section3.value = document.getElementById("section3") as HTMLElement;
    section4.value = document.getElementById("section4") as HTMLElement;

    imgsPrincipal.value = [
      {
        texto: "fresh icons",
        class: "block imagen_1",
      },
      {
        texto: "useful mockups",
        class: "hidden imagen_2",
      },
      {
        texto: "coll illustration",
        class: "hidden imagen_3",
      },
      {
        texto: "lovely type",
        class: "hidden imagen_4",
      },
    ];

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
    const section4Pass: boolean =
      section4.value.getBoundingClientRect().bottom <= 0;

    const imagen_1: HTMLElement = document.querySelector(
      ".imagen_1"
    ) as HTMLElement;
    const imagen_2: HTMLElement = document.querySelector(
      ".imagen_2"
    ) as HTMLElement;
    const imagen_3: HTMLElement = document.querySelector(
      ".imagen_3"
    ) as HTMLElement;
    const imagen_4: HTMLElement = document.querySelector(
      ".imagen_4"
    ) as HTMLElement;

    if (section1Pass) {
      site.replaceClass(imagen_1, "block", "hidden");
      site.replaceClass(imagen_2, "hidden", "block");
      site.replaceClass(imagen_3, "block", "hidden");
      site.replaceClass(imagen_4, "block", "hidden");
    } else {
      site.replaceClass(imagen_1, "hidden", "block");
      site.replaceClass(imagen_2, "block", "hidden");
      site.replaceClass(imagen_3, "block", "hidden");
      site.replaceClass(imagen_4, "block", "hidden");
    }

    if (section2Pass) {
      site.replaceClass(imagen_1, "block", "hidden");
      site.replaceClass(imagen_2, "block", "hidden");
      site.replaceClass(imagen_3, "hidden", "block");
      site.replaceClass(imagen_4, "block", "hidden");
    }

    if (section3Pass) {
      site.replaceClass(imagen_1, "block", "hidden");
      site.replaceClass(imagen_2, "block", "hidden");
      site.replaceClass(imagen_3, "block", "hidden");
      site.replaceClass(imagen_4, "hidden", "block");
    }
  }

  public static async Productos() {
    const response: any = await c_productos.fn_l_productos({
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
}
