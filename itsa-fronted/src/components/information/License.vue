<script setup lang="ts">
import license from '../../assets/img/license.png'
import { onMounted } from 'vue';
onMounted(() => {
    const contenedor: any = document.getElementById("main_contenedor");
    contenedor.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<template>
    <div class="flex max-[768px]:flex-col-reverse min-h-full grow shrink-0 max-[768px]:py-7">
        <div class="flex flex-col w-full text-balance">
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[clamp(1.2rem,3vw,2.2rem)] py-[15px] raleway">
                    license
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    all files that you can find and download from itsastudio.com and itsa studio on
                    behance belong to the owner of the site and the in the same agency® brand.
                    by downloading, purchasing and/or installing the design assets created by
                    itsa studio® you agree to the following user license terms:
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem)] py-[15px] raleway">
                    allowed
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    all files downloaded from itsastudio.com are royality-free and one time fee. you
                    may be used them in any number of personal and commercial projects for yourself
                    or a client. you may modify the resources accordnig to your requirements and can
                    be used digitally as well as in a printed format except in the cases mentioned in the
                    “not allowed”. no attribution or link back to this site is required.
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem)] py-[15px] raleway">
                    not allowed
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    the files downloaded from istastudio.com cannot be reselled, sublicensed or
                    redistributed (even for free). the files cannot be included on merchandansing
                    items (posters, prints, mugs, caps, or t-shirts) if you are using them as the primary
                    design element. this applies to modified and unmodified files. you cannot assign
                    the authorship as your own. you only get the license that allows you to use the asset
                    only in specified in this licemse agreement terms. you cannot complie the assets to
                    replicate a similar or competing service.

                </p>
            </section>
        </div>
        <div class="flex w-full h-full items-center justify-center">
            <img :src="license" alt="_" class="w-full max-w-[200px] h-full max-h-[200px]" loading="lazy">
        </div>
    </div>
</template>

<style scoped>
.seccion-1-app-license {
    position: relative;
}

.seccion-1-app-license::before {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    bottom: 0;
}
</style>
