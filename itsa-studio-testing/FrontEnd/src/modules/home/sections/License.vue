<script setup lang="ts">
import File from "../components/File.vue";
</script>

<template>
  <div
    class="flex max-[768px]:flex-col-reverse min-h-[calc(100vh-86px)] justify-end grow shrink-0 max-[768px]:py-7"
  >
    <div class="flex flex-col w-full text-balance">
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[clamp(1.2rem,3vw,2.2rem)] py-[15px] font-itsa-bold">
          license
        </p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          all files available for download from itsastudiomx.com and itsa studio
          on Behance belong to the owner of the site and IN THE SAME AGENCY®
          brand. By downloading, purchasing, and/or installing the design assets
          created by Itsa Studio®, you agree to the following user license
          terms:
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">allowed</p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          all files downloaded from itsastudiomx.com are royalty-free and
          require a one-time fee. you may use them in any number of personal and
          commercial projects for yourself or a client. you may modify the
          resources according to your requirements, and they can be used
          digitally as well as in printed format, except in the cases mentioned
          under “not allowed.” no attribution or link back to this site is
          required.
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">not allowed</p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          the files downloaded from itsastudiomx.com cannot be resold,
          sub-licensed, or redistributed (even for free). the files cannot be
          included on merchandising items (posters, prints, mugs, caps, or
          t-shirts) if you are using them as the primary design element. this
          applies to both modified and unmodified files. you cannot claim
          authorship as your own. you can only receive a license that allows you to
          use the asset as specified in these license agreement terms. you
          cannot compile the assets to replicate a similar or competing service.
        </p>
      </section>
    </div>
    <div
      class="flex w-full min-h-[calc(100vh-86px)] max-[768px]:min-h-full items-center justify-center"
    >
      <File
        file="license.png"
        type="img"
        class="w-full max-w-[200px] h-full max-h-[200px]"
      />
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
