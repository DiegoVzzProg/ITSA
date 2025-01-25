import { computed, ref } from "vue";
import { c_productos } from "../../services/s_productos";
import { dgav, IsNullOrEmpty, notify } from "../../utils/site";

export const totalSections = 4;
export const isSnapping = ref<boolean>(false);

// Indice de la sección actual (0, 1, 2)
export const currentIndex = ref<number>(0);

// Posición en píxeles (vertical) durante el arrastre
export const scrollPos = ref<number>(0);

// Alto de cada sección, lo calculamos con window.innerHeight
export const sectionHeight = ref<number>(window.innerHeight);

// Flags y referencias para arrastre
export const isDragging = ref<boolean>(false);
export const startY = ref<number>(0);
export const scrollPosWhenDragStart = ref<number>(0);
export const showSection = ref<boolean>(false);
export const productos = ref<any>([]);
export class home {
  // Escuchamos el evento resize para recalcular el alto de la sección
  public static onResize() {
    sectionHeight.value = window.innerHeight;
    // Ajusta la posición de cada sección nuevamente
    // Hacemos un snap a la misma sección actual, para que no se pierda
    this.snapToSection(currentIndex.value);
  }

  /**
   * Función que encaja (snapea) la posición a una sección específica (0, 1, 2)
   */
  public static snapToSection(index: number) {
    if (index < 0) index = 0;
    if (index >= totalSections) index = totalSections - 1;
    currentIndex.value = index;
    // Calculamos en pixeles la posición a donde debe "encajar"
    scrollPos.value = currentIndex.value * sectionHeight.value;

    // Activar el estado de snapping
    isSnapping.value = true;

    // Detener el scroll durante un breve momento
    setTimeout(() => {
      isSnapping.value = false; // Permitir el scroll normal después de un tiempo
    }, 500);
  }

  /**
   * Calculamos la sección más cercana basándonos en la posición
   */
  public static getNearestSectionIndex() {
    // redondeamos scrollPos / sectionHeight
    return Math.round(scrollPos.value / sectionHeight.value);
  }

  /**
   * Eventos de mouse
   */
  public static onMouseDown(e: MouseEvent) {
    isDragging.value = true;
    startY.value = e.clientY;
    scrollPosWhenDragStart.value = scrollPos.value;
  }

  public static onMouseMove(e: MouseEvent) {
    if (!isDragging.value || isSnapping.value) return;
    const delta = startY.value - e.clientY;
    scrollPos.value = scrollPosWhenDragStart.value + delta;
    this.checkIfAtEnd();
  }

  public static onMouseUp() {
    if (isDragging.value) {
      isDragging.value = false;
      // Snap a la sección más cercana
      this.snapToSection(this.getNearestSectionIndex());
    }
  }

  // Si el usuario saca el cursor fuera del contenedor mientras arrastra
  public static onMouseLeave() {
    if (isDragging.value) {
      isDragging.value = false;
      this.snapToSection(this.getNearestSectionIndex());
    }
  }

  /**
   * Evento wheel: al usar la rueda de mouse, pasamos directamente
   * a la siguiente/previa sección (sin quedar a mitad).
   */
  public static onWheel(e: WheelEvent) {
    if (isSnapping.value) return;
    if (e.deltaY > 0) {
      // Scroll down => siguiente sección
      this.snapToSection(currentIndex.value + 1);
    } else if (e.deltaY < 0) {
      // Scroll up => sección anterior
      this.snapToSection(currentIndex.value - 1);
    }
    this.checkIfAtEnd();
  }

  /**
   * Eventos touch (móviles)
   */
  public static onTouchStart(e: TouchEvent) {
    isDragging.value = true;
    startY.value = e.touches[0].clientY;
    scrollPosWhenDragStart.value = scrollPos.value;
  }

  public static onTouchMove(e: TouchEvent) {
    if (!isDragging.value || isSnapping.value) return;
    const delta = startY.value - e.touches[0].clientY;
    scrollPos.value = scrollPosWhenDragStart.value + delta;
    this.checkIfAtEnd();
  }

  public static onTouchEnd() {
    if (isDragging.value) {
      isDragging.value = false;
      this.snapToSection(this.getNearestSectionIndex());
    }
  }

  /**
   * Estilos computados para las 3 secciones
   * Cada sección tiene un 'top' fijo (0, sectionHeight, sectionHeight*2),
   * y la propiedad transform se basa en scrollPos
   */
  public static transformStyle1 = computed(() => {
    return {
      top: "0px",
      transform: `translateY(${-scrollPos.value}px)`,
    };
  });
  public static transformStyle2 = computed(() => {
    return {
      top: `${sectionHeight.value}px`,
      transform: `translateY(${-scrollPos.value}px)`,
    };
  });
  public static transformStyle3 = computed(() => {
    return {
      top: `${sectionHeight.value * 2}px`,
      transform: `translateY(${-scrollPos.value - 10}px)`,
    };
  });
  public static transformStyle4 = computed(() => {
    return {
      top: `${sectionHeight.value * 3}px`,
      transform: `translateY(${-scrollPos.value - 24}px)`,
    };
  });

  public static checkIfAtEnd() {
    // Altura total de todas las secciones
    const totalHeight = totalSections * sectionHeight.value;

    // Verificamos si el scrollPos ha alcanzado o superado la altura total
    if (scrollPos.value >= totalHeight - sectionHeight.value) {
      setTimeout(() => {
        showSection.value = true;
      }, 1000);

      setTimeout(() => {
        document.getElementById("footer")?.classList.remove("hidden");
        document.getElementById("footer")?.classList.add("flex");
      }, 1300);
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
