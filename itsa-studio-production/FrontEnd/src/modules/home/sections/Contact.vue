<script setup lang="ts">
import File from "../components/File.vue";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full min-h-full grow shrink-0"
  >
    <section
      class="seccion-1-app-license max-w-[900px] py-[10rem] flex w-full h-full max-h-[360px] items-center justify-center pb-[4rem]"
    >
      <File
        file="contact.png"
        type="img"
        class="w-full max-w-[410px] h-full max-h-[300px]"
      >
      </File>
    </section>
    <div class="flex flex-col w-full h-full max-w-[900px]">
      <section class="flex flex-col pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">
          we will glad to help you
        </p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          if you have a general inquiry, a licensing-related question, or need a
          custom illustration pack or icon pack, please drop us a line.

          <br />
          <br />
          <a href="mailto:info@itsastudiomx.com">info@itsastudiomx.com</a>
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
  content: " ";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: black;
  bottom: 0;
}
</style>
