<script setup lang="ts">
import payments from '../../../assets/img/payments.png'

</script>

<template>
    <div class="flex max-[768px]:flex-col-reverse min-h-[calc(100vh-86px)] justify-end grow shrink-0 max-[768px]:py-7">
        <div class="flex flex-col w-full text-balance">
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[clamp(1.2rem,3vw,2.2rem)] py-[15px] raleway">
                    purchase and delivery
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)] ">
                    to buy products on itsastudio.com, select the asset you wish to purchase and
                    complete the payment. once your purchase is confirmed, you can download
                    the asset and access your invoice directly from your account on our website.
                    this ensures all your purchases and invoices are easily accessible at any time.
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem)] py-[15px] raleway">
                    payment methods
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)] ">
                    the easiest and fastest way to pay is by credit card or paypal. itsa studio® site
                    uses stripe to securely process credit card card data. we accept visa, mastercard
                    and american express credit cards. if you don't have a credit card and don't want
                    to pay with paypal, please send a mail to info@itsastudio.com
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem)] py-[15px] raleway">
                    invocing
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    we issue pdf invoices for all orders. a copy will be sent via email once the purchse
                    process has been completed. the mail may go into your junk mail folder.
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem)] py-[15px] raleway">
                    refunds
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    all sales of files are final. sorry, but we can neither refund money nor swap
                    incorrect asset license purchases. there is no way for us to verify that you no longer
                    hold copies of the asset. if the asset is defective it shall be replaced by the same
                    asset if accompained with purchase receipt and we are notified within 7 days of
                    purchase.
                </p>
            </section>
        </div>
        <div class="flex w-full md:min-h-[calc(100vh-86px)] items-center justify-center max-[500px]:pb-[2rem]">
            <img :src="payments" alt="_"
                class="w-full max-w-[320px] h-full max-h-[220px] max-[500px]:max-h-[180px] max-[500px]:max-w-[280px]"
                loading="lazy">
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
