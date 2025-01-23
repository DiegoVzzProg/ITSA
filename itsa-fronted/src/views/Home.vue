<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import freshicons_slogan from '../assets/img/freshicons_slogan.png'
import usefulmockups_slogans from '../assets/img/usefulmockups_slogans.png'
import collillustration_slogans from '../assets/img/collillustration_slogans.png'
import lovelytype_slogans from '../assets/img/lovelytype_slogans.png'
import slogan_principal from '../assets/img/slogan_principal.png'
import { dgav, IsNullOrEmpty, notify, replaceClass, site } from '../utils/site';
import { c_productos } from '../services/s_productos';
import File from '../components/File.vue';
// Número total de secciones
const totalSections = 4;
const isSnapping = ref<boolean>(false);

// Indice de la sección actual (0, 1, 2)
const currentIndex = ref<number>(0);

// Posición en píxeles (vertical) durante el arrastre
const scrollPos = ref<number>(0);

// Alto de cada sección, lo calculamos con window.innerHeight
const sectionHeight = ref<number>(window.innerHeight);

// Flags y referencias para arrastre
const isDragging = ref<boolean>(false);
const startY = ref<number>(0);
const scrollPosWhenDragStart = ref<number>(0);

// Escuchamos el evento resize para recalcular el alto de la sección
const onResize = () => {
    sectionHeight.value = window.innerHeight;
    // Ajusta la posición de cada sección nuevamente
    // Hacemos un snap a la misma sección actual, para que no se pierda
    snapToSection(currentIndex.value);
};

/**
 * Función que encaja (snapea) la posición a una sección específica (0, 1, 2)
 */
const snapToSection = (index: number) => {
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
};

/**
 * Calculamos la sección más cercana basándonos en la posición
 */
const getNearestSectionIndex = () => {
    // redondeamos scrollPos / sectionHeight
    return Math.round(scrollPos.value / sectionHeight.value);
};

/**
 * Eventos de mouse
 */
const onMouseDown = (e: MouseEvent) => {
    isDragging.value = true;
    startY.value = e.clientY;
    scrollPosWhenDragStart.value = scrollPos.value;
};

const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || isSnapping.value) return;
    const delta = startY.value - e.clientY;
    scrollPos.value = scrollPosWhenDragStart.value + delta;
    checkIfAtEnd();
};

const onMouseUp = () => {
    if (isDragging.value) {
        isDragging.value = false;
        // Snap a la sección más cercana
        snapToSection(getNearestSectionIndex());
    }
};

// Si el usuario saca el cursor fuera del contenedor mientras arrastra
const onMouseLeave = () => {
    if (isDragging.value) {
        isDragging.value = false;
        snapToSection(getNearestSectionIndex());
    }
};

/**
 * Evento wheel: al usar la rueda de mouse, pasamos directamente
 * a la siguiente/previa sección (sin quedar a mitad).
 */
const onWheel = (e: WheelEvent) => {
    if (isSnapping.value) return;
    if (e.deltaY > 0) {
        // Scroll down => siguiente sección
        snapToSection(currentIndex.value + 1);
    } else if (e.deltaY < 0) {
        // Scroll up => sección anterior
        snapToSection(currentIndex.value - 1);
    }
    checkIfAtEnd();
};

/**
 * Eventos touch (móviles)
 */
const onTouchStart = (e: TouchEvent) => {
    isDragging.value = true;
    startY.value = e.touches[0].clientY;
    scrollPosWhenDragStart.value = scrollPos.value;
};

const onTouchMove = (e: TouchEvent) => {
    if (!isDragging.value || isSnapping.value) return;
    const delta = startY.value - e.touches[0].clientY;
    scrollPos.value = scrollPosWhenDragStart.value + delta;
    checkIfAtEnd();
};

const onTouchEnd = () => {
    if (isDragging.value) {
        isDragging.value = false;
        snapToSection(getNearestSectionIndex());
    }
};

/**
 * Estilos computados para las 3 secciones
 * Cada sección tiene un 'top' fijo (0, sectionHeight, sectionHeight*2),
 * y la propiedad transform se basa en scrollPos
 */
const transformStyle1 = computed(() => {
    return {
        top: '0px',
        transform: `translateY(${-scrollPos.value}px)`
    };
});
const transformStyle2 = computed(() => {
    return {
        top: `${sectionHeight.value}px`,
        transform: `translateY(${-scrollPos.value}px)`
    };
});
const transformStyle3 = computed(() => {
    return {
        top: `${sectionHeight.value * 2}px`,
        transform: `translateY(${-scrollPos.value - 10}px)`
    };
});
const transformStyle4 = computed(() => {
    return {
        top: `${sectionHeight.value * 3}px`,
        transform: `translateY(${-scrollPos.value - 24}px)`
    };
});

const showSection = ref<boolean>(false);

const checkIfAtEnd = () => {
    // Altura total de todas las secciones
    const totalHeight = totalSections * sectionHeight.value;

    // Verificamos si el scrollPos ha alcanzado o superado la altura total
    if (scrollPos.value >= totalHeight - sectionHeight.value) {

        setTimeout(() => {
            showSection.value = true;
        }, 1000);

        setTimeout(() => {
            document.getElementById('footer')?.classList.remove('hidden');
            document.getElementById('footer')?.classList.add('flex');
        }, 1300);
    }
};

const productos: any = ref([]);

const Productos = async () => {
    const response: any = await c_productos.fn_l_productos({
        id_producto: 0
    });
    if (response) {
        if (!IsNullOrEmpty(dgav.dataBase.message)) {
            notify.error(dgav.dataBase.message);
            return;
        }
        productos.value = response;
    }
};

onMounted(() => {
    document.getElementById('footer')?.classList.remove('flex');
    document.getElementById('footer')?.classList.add('hidden');

    window.addEventListener('resize', onResize);

    Productos();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
});

</script>

<template>
    <div v-if="!showSection"
        class="flex flex-col w-full justify-center items-center min-h-screen grow shrink-0 relative"
        @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseLeave"
        @wheel.prevent="onWheel" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
        <div class="flex relative flex-col items-center justify-start gap-2 w-screen h-[40px] overflow-hidden">
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="transformStyle1">
                <img :src="freshicons_slogan" alt="_" loading="lazy" class=" w-full max-w-[230px]">
            </span>
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="transformStyle2">
                <img :src="usefulmockups_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            </span>
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="transformStyle3">
                <img :src="collillustration_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            </span>
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="transformStyle4">
                <img :src="lovelytype_slogans" alt="_" loading="lazy" class=" w-full max-w-[220px] scale-[.9]">
            </span>
        </div>
        <div class="flex w-full items-center justify-center">
            <span class="flex flex-col items-center w-full h-full">
                <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
            </span>
        </div>
    </div>
    <div v-else
        class="flex flex-col pt-[76px] w-full justify-start items-end min-h-screen grow shrink-0 relative animate-fade-in">
        <div class="flex dgav-fade-up flex-row-reverse justify-end max-[768px]:flex-col max-[768px]:items-center w-full gap-2 py-5 transition-all"
            v-if="productos.length > 0">
            <div v-for="(producto, index) in productos" :key="index"
                class="bg-[rgb(244,242,239)] w-full max-w-[508px] h-full max-h-[508px] min-h-[508px] max-[620px]:min-h-[408px] max-[620px]:max-h-[408px] rounded-[12px] p-5 flex flex-col group hover:bg-[rgba(201,117,249,0.4)]">
                <div class="flex flex-row group-hover:text-white">
                    <div class="flex flex-col w-full gap-1">
                        <p class="font-itsa-bold text-[clamp(1.8em,5vw,2.5em)] mb-[-18px] leading-8">
                            {{ producto.titulo }}
                        </p>
                        <span class="w-full max-w-[230px] leading-6 ms-1 mt-4">
                            <i class="times-new-roman-font text-[1rem] lg:text-[1.4rem] xl:text-[1.4rem]">{{
                                producto.subtitulo }}</i>
                        </span>
                        <p class="text-[clamp(.6em,2vw,.7em)]">
                            {{ producto.descripcion }}
                        </p>
                    </div>
                    <div class="flex items-start justify-end">
                        <button @click="site.RedirectPage(String(producto.url))"
                            class="text-white bg-black py-2 rounded-full px-[clamp(15px,3vw,28px)] poppins-font font-bold text-[clamp(12px,3vw,20px)]">
                            {{ parseFloat(producto.precio) > 0 ? `$${producto.precio}` : 'free' }}
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full h-full">
                    <span class="flex w-full max-w-[320px]">
                        <File folder="../assets/img/gallery" :file="producto.imagen" type="img" :encrypted="false" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
