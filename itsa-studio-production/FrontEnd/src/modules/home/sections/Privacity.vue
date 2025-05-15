<script setup lang="ts">
import File from "../components/File.vue";
</script>

<template>
  <div class="flex max-[768px]:flex-col-reverse min-h-[calc(100vh-86px)] justify-end grow shrink-0 max-[768px]:py-7">
    <div class="flex flex-col w-full text-balance">
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[clamp(1.2rem,3vw,2.2rem)] py-[15px] font-itsa-bold">
          privacy policy
        </p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          this website is owned and operated by itsa studio graphic design
          (“we,” “our,” “us”). <br />
          <br />
          below is itsa studio®’s privacy policy. it is our policy to respect
          your privacy regarding any information we may collect from you across
          our website, https://www.itsastudiomx.com, and other sites we own and
          operate. <br />
          <br />
          please read carefully, and feel free to contact us if you have any
          questions.
          <br />
          <br />
          before continuing to use our website, we advise you to read our
          privacy policy regarding our user data collection practices. it will help you understand our practices better.
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">
          information we collect
        </p>
        
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          any personal information requested will be used only to process your
          order or provide support. under no circumstances we'll sell or give
          away your information. <br />
          we will not collect your personal information on this site unless you
          choose to provide it to us.
          <br />
          <br />
          there are two places on the site where you can choose to give us
          personal information:
          <br />
          <br />
          1. by purchasing an asset license. <br />
          2. by creating an account, you are subscribing to our mailing list. if
          you do not wish to subscribe to the mailing list, please send your
          unsubscribe request to info@itsastudiomx.com.
          <br />
          <br />
          Below is itsa studio&reg;’s privacy policy. it is our policy to respect your privacy regarding any information we may collect from you across our website, 
          https://www.itsastudiomx.com, and other sites we own and operate.
          please read carefully, and feel free to contact us if you have any questions.
          <br />
          <br />
        </p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          when you purchase products from our shop, as part of the buying and selling process, we will ask you to provide certain personal information. the information we collect includes: <br>
        </p>
        <ul class="list-disc list-inside text-[clamp(.8rem,3vw,.9rem)]">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your billing address</li>
          <li>Your VAT number (if applicable)</li>
        </ul>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          itsa studio&reg; shall not make any personal data of the customer available to third parties without the express consent of the customer, except to the extent that disclosure is required under applicable law.
          we use Stripe as the payment provider for our website. You can view their privacy policy at <a href="https://stripe.com/privacy" class="underline underline-offset-1">https://stripe.com/privacy</a>.
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">
          intellectual property
        </p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          you agree that all materials, products, and services provided on this
          website are the property of itsa studio®, its affiliates, directors,
          officers, employees, agents, suppliers, or licensors, including all
          copyrights, trade secrets, trademarks, patents, and other intellectual
          property. <br />
          you also agree that you will not reproduce or redistribute the itsa
          studio® digital asset boutique’s intellectual property in any way,
          including electronic, digital, or through new trademark registrations.
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
  content: " ";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: black;
  bottom: 0;
}
</style>
