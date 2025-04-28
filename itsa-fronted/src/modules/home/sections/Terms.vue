<script setup lang="ts">
import File from '../components/File.vue';


</script>

<template>
    <div class="flex max-[768px]:flex-col-reverse min-h-[calc(100vh-86px)] justify-end grow shrink-0 max-[768px]:py-7">
        <div class="flex flex-col w-full text-balance">
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[clamp(1.2rem,3vw,2.2rem)] py-[15px] font-itsa-bold">
                    condition of use
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    by using this website, you certify that you have read and reviewed this
                    agreement and that you agree to comply with its terms. if you do not
                    want to be bound by the terms of this agreement, you are advised to
                    leave the website accordingly. itsa studio® only grants use and access
                    of this website, its products, and its services to those who have accepted
                    its terms
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem] py-[15px] font-itsa-bold">
                    applicable law
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    by visiting this website, you agree that the laws of mexico, without regard to
                    principles of conflict laws, will govern these terms and conditions, or any dispute
                    of any sort that might come between itsa studio® and you, or its business partners
                    and associates
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem] py-[15px] font-itsa-bold">
                    disputes
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    any dispute related in any way to your visit to this website or to products you purchase
                    from us shall be arbitrated by state or federal court mexico and you consent to exclusive
                    jurisdiction and venue of such courts
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem] py-[15px] font-itsa-bold">
                    indemnification
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    you agree to indemnify itsa studio® and its affiliates and hold itsa studio® harmless
                    against legal claims and demands that may arise from your use or misuse of our
                    services. we reserve the right to select our own legal counsel.
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem] py-[15px] font-itsa-bold">
                    limitation on liability
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    itsa studio® is not liable for any damages tha may occur to you as a result of
                    your misuse of our website. itsa studio® reserves the right to edit, modify, and change
                    this agreement at any time. we shall let our users know of these changes through
                    electronic mail. this agreement is an understanding between [name] and the user,
                    this supersedes and replaces all prior agreements regarding the use of this website.
                    if you have any questions about these terms and conditions, please contact us
                </p>
            </section>
        </div>
        <div
            class="flex w-full min-h-[calc(100vh-86px)] max-[768px]:min-h-full items-center justify-center max-[500px]:pb-[2rem]">
            <File file="terms_and_conditions.png" type="img" class="w-full max-w-[210px] h-full max-h-[200px]" />
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
