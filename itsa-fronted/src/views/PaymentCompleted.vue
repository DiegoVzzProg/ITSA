<script setup lang="ts">
import { onMounted } from 'vue';
import { numberCartShopping } from '../stores/countCartShopping';
import { notify, site } from '../utils/site';


onMounted(() => {
    numberCartShopping().update();

    if (numberCartShopping().count > 0) {
        notify.error("Payment not made");
        site.RedirectPage("home");
    }
});

</script>

<template>
    <div class="flex flex-col w-full min-h-screen pt-[10em]">
        <div class="flex flex-col animate-fade-in">
            <p class="font-itsa-bold text-[2rem]">
                thank you!
            </p>
            <p>
                you can access the purchase details <br>
                packs in the downloads files <br>
                of the computer
            </p>
        </div>
    </div>
</template>

<style scoped></style>
