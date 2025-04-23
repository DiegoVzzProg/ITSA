<script setup lang="ts">
import File from '../components/File.vue';

</script>

<template>
    <div class="flex max-[768px]:flex-col-reverse min-h-[calc(100vh-86px)] justify-end grow shrink-0 max-[768px]:py-7">
        <div class="flex flex-col w-full text-balance">
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[clamp(1.2rem,3vw,2.2rem)] py-[15px] font-itsa-regular">
                    privacy policy
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    this website is owned and run by itsa stduio graphic design ("we", "our", "us"). <br />
                    below is itsa studio® privacy policy, it is our policy to respect your privacy <br />
                    regarding any information we may collect from you across our website, <br />
                    https://www.itsastudiomx.com, and other sites we own and operate. Please
                    read carefully and feel free to contact us in case you have any questions
                    before you continue using our website, we advise you to read our privacy policy <br />
                    regarding our user data collection. it will help you better understand our
                    practices…
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem] py-[15px] font-itsa-regular">
                    information we collect
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    any personal information requested will be used only to process your order or <br />
                    provide support. under no any personal information requested will be used only <br />
                    to process your order or provide support. Under no circumstances will we sell or
                    otherwise give away your information.<br />
                    We do not collect your personal information on this site unless you choose to give it to us. <br />
                    there are two places on the site where you can choose to give us personal information: <br />
                    1. by purchasing an asset licence. <br />
                    2. by creating your account you have subscribed to our mailing list. if you do not wish to subscribe
                    <br />
                    to the mailing list, please send your unsubscribe request to info@itsastudiomx.com. <br />
                    when you purchase products from our shop, as part of the buying and selling process,
                    we will ask you to provide certain personal information. the information we collect includes: <br />
                    i. your name. <br />
                    2. your email address. <br />
                    3. your billing address. <br />
                    4. your vat number (if applicable). <br />
                    below is itsa studio&reg; privacy policy, it is our policy to respect your privacy <br />
                    regarding any information we may collect from you across our website, <br />
                    https://www.itsastudiomx.com, and other sites we own and operate. please <br />
                    read carefully and feel free to contact us in case you have any questions. <br />
                    itsa studio&reg; shall not make available any personal <br />
                    data of the customer to other third parties without the express consent of the <br />
                    customer, except to the extent that a disclosure is required under applicable law. <br />
                    payment information we use paypal and stripe as the payment providers for our website. you can view
                    <br />
                    their privacy policy at <a href="https://stripe.com/privacy">https://stripe.com/privacy</a>.
                </p>
            </section>
            <section class="flex flex-col seccion-1-app-license pb-[4rem]">
                <p class="text-[1.2rem] py-[15px] font-itsa-regular">
                    intellectual property
                </p>
                <p class="text-[clamp(.8rem,3vw,.9rem)]">
                    you agree that all materials, products, and services provided on this website are <br />
                    the property of itsa studio&reg;, its affiliates, directors, officers, employees, agents <br />
                    suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, <br />
                    and other intellectual property. you also agree that you will not reproduce or <br />
                    redistribute the itsa studio&reg; itsa studio digital asset boutique intellectual property in any way,
                    including <br />
                    electric, digital, or new trademark registrations. <br />
                </p>
            </section>
        </div>
        <div
            class="flex w-full min-h-[calc(100vh-86px)] max-[768px]:min-h-full items-center justify-center max-[500px]:pb-[2rem]">
            <File file="privacy_policy.png" type="img" class="w-full max-w-[410px] h-full max-h-[300px]"></File>
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
