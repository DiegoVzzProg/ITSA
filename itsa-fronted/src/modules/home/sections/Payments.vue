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
          payments & refunds
        </p>
        <p class="text-[1.2rem] py-[15px] font-itsa-bold w-full border-t border-t-black">
          purchase and delivery
        </p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          to purchase products from itsastudiomx.com, select the resource you
          wish to purchase and complete the payment. once your purchase is
          confirmed, you will be able to download it, and your invoice will be
          sent to the email address you provided when creating your account. for
          any questions or comments, please contact us at info@itsastudiomx.com.
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">payment methods</p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          the easiest and fastest way to pay is by credit or debit card. the
          itsa studio® website uses Stripe to securely process card information.
          ee accept Visa, Mastercard, and American Express. if you don’t have a
          credit card or prefer not to pay by debit card, you can use Apple Pay
          or Google Wallet. if you encounter any problems with payment, please
          email us at info@itsastudiomx.com.
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">invocing</p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          ee issue invoices in PDF format only upon request. A copy will be
          emailed to you after the purchase process is complete. ee send
          purchase receipts for all orders; they will also be emailed to you
          after completing the purchase process. Please note that the email may
          end up in your spam folder. For any questions or to request a missing
          invoice or receipt, please email us at info@itsastudiomx.com.
        </p>
      </section>
      <section class="flex flex-col seccion-1-app-license pb-[4rem]">
        <p class="text-[1.2rem] py-[15px] font-itsa-bold">refunds</p>
        <p class="text-[clamp(.8rem,3vw,.9rem)]">
          all sales are final. ee cannot refund money or exchange incorrectly
          purchased asset licenses, as there is no way for us to verify that you
          no longer have copies of the asset. if the asset is defective, it will
          be replaced with the same asset, provided that you submit your
          purchase receipt and notify us within 7 days of purchase.
        </p>
      </section>
    </div>
    <div
      class="flex w-full md:min-h-[calc(100vh-86px)] items-center justify-center max-[500px]:pb-[2rem]"
    >
      <File
        file="payments.png"
        type="img"
        class="w-full max-w-[420px] h-full max-h-[220px] max-[500px]:max-h-[180px] max-[500px]:max-w-[280px]"
      >
      </File>
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
