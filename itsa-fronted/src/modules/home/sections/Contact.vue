<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full min-h-full grow shrink-0">
        <section
            class="seccion-1-app-license max-w-[900px] py-[10rem] flex w-full h-full max-h-[360px] items-center justify-center pb-[4rem]">
            <File file="contact.png" type="img" class="w-auto h-full">
            </File>
        </section>
        <div class="flex flex-col w-full h-full max-w-[900px]">
            <section class="flex flex-col pb-[4rem]">
                <p class="text-[1.2rem)] py-[15px] raleway">
                    we will glad to help you
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    if you have a general enquiry or licensing-related question, or you need a custom illustration set,
                    icon
                    set, <br />
                    please, drop us a line. <br />
                    info@itsastudio.com
                </p>
            </section>
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
