<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import SelectCountry from "../../components/SelectCountry.vue";
import { IsNullOrEmpty, notify, site } from '../../utils/site';
import File from '../../components/File.vue';
import { numberCartShopping } from '../../stores/countCartShopping';
import { useRoute } from 'vue-router';
import { sp_delete_product_from_shoppingCart, sp_edit_customer, sp_get_customer, sp_proceed_to_checkout, sp_register_customer, sp_shopping_cart_client } from '../../stores/store_customers';
import Loading from '../../components/Loading.vue';

const productData = ref<any>({});
const productPrecio = ref<string>("");
const impuesto = ref<string>("");
const clientDataExists = ref<boolean>(false);
const clientData = ref<any>(null);
const finish = ref<boolean>(false);
const editar = ref<boolean>(false);


const formCheckout1 = reactive({
    name: {
        id: "name",
        value: "",
        placeholder: "Name",
        error: "",
    },
    vat_number: {
        id: "vat_number",
        value: "",
        placeholder: "Vat number",
        error: "",
    },
    address: {
        id: "address",
        value: "",
        placeholder: "Address",
        error: "",
    },
});

const formCheckout2 = reactive({
    postal_code: {
        id: "postal_code",
        value: "",
        placeholder: "Postal Code",
        error: "",
    },
    state: {
        id: "state",
        value: "",
        placeholder: "State",
        error: "",
    },
});

const formCountry = reactive({
    country: {
        id: "country",
        value: "",
        placeholder: "Country",
        error: "",
        id_pais: 0,
    },
});
const route = useRoute();

onMounted(() => {
    productos();
    infoForms1();

    if (numberCartShopping().count == 0) {
        site.RedirectPage('home');
    }

    CheckPurchasedProduct();
});


onUnmounted(() => {

});

const CheckPurchasedProduct = async () => {
    const sessionId: string = route.query.session_id as string;
    if (sessionId != undefined && sessionId != null) {
        await sp_shopping_cart_client().exec();
    }
}

const infoForms1 = async () => {
    const data: any = {
        id_usuario: site.userData().id_usuario,
    };
    const response: any = await sp_get_customer().exec(data);

    if (response) {
        clientDataExists.value = true;
        clientData.value = response;

    }
}

const AddCliente = async () => {
    const form1: any = formCheckout1;
    const form2: any = formCheckout2;

    const idsFormCheckout1: any = Object.values(
        formCheckout1
    ).map((field) => ({
        id: field.id,
        value: field.value,
    }));

    const idsFormCheckout2: any = Object.values(
        formCheckout2
    ).map((field) => ({
        id: field.id,
        value: field.value,
    }));

    for (const e of idsFormCheckout1) {
        validateForms1(e.value, e.id);
    }

    for (const e of idsFormCheckout2) {
        validateForms2(e.value, e.id);
    }
    validateCountry();

    if (
        !IsNullOrEmpty(form1.name.error) ||
        !IsNullOrEmpty(form1.vat_number.error) ||
        !IsNullOrEmpty(form1.address.error) ||
        !IsNullOrEmpty(form2.state.error) ||
        !IsNullOrEmpty(form2.postal_code.error) ||
        !IsNullOrEmpty(formCountry.country.error)
    ) {
        return;
    }

    if (site.userData()) {

        const response: any = await sp_register_customer().exec({
            id_usuario: site.userData().id_usuario,
            nombre: formCheckout1.name.value,
            numero_de_iva_empresa: formCheckout1.vat_number.value,
            direccion: formCheckout1.address.value,
            id_pais: formCountry.country.id_pais,
            estado: formCheckout2.state.value,
            codigo_postal: formCheckout2.postal_code.value,
        });

        if (response) {
            notify.success("your billing information has been saved.");
            clientData.value = response;
        }
    }
}

const validateForms1 = (value: string, type: string) => {
    const form1: any = formCheckout1;

    switch (type) {
        case "name":
            if (IsNullOrEmpty(value)) {
                form1.name.error = "This field is required.";
            } else if (value.length > 255) {
                form1.name.error = "The input cannot exceed 255 characters.";
            } else if (!/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(value)) {
                form1.name.error = "The input can only contain letters.";
            } else {
                form1.name.error = "";
            }
            break;
        case "vat_number":
            if (IsNullOrEmpty(value)) {
                form1.vat_number.error = "";
            } else if (value.length < 8 || value.length > 12) {
                form1.vat_number.error =
                    "VAT number must be between 8 and 12 characters.";
            } else if (!/^[A-Z]{2}/.test(value)) {
                form1.vat_number.error =
                    "VAT number must start with a country code (e.g., ES, DE, FR).";
            } else if (!/^[A-Z]{2}[0-9A-Z]+$/.test(value)) {
                form1.vat_number.error =
                    "VAT number can only contain letters and numbers.";
            } else {
                form1.vat_number.error = "";
            }

            break;
        case "address":
            if (IsNullOrEmpty(value)) {
                form1.address.error = "Address is required.";
            } else if (value.length > 255) {
                form1.address.error = "Address cannot exceed 255 characters.";
            } else {
                form1.address.error = "";
            }
            break;
    }
}

const validateForms2 = (value: string, type: string) => {
    const form2: any = formCheckout2;

    switch (type) {
        case "postal_code":
            if (IsNullOrEmpty(value)) {
                form2.postal_code.error = "Postal code is required.";
            } else if (value.length < 3) {
                form2.postal_code.error =
                    "Postal code must be at least 3 characters long.";
            } else if (value.length > 10) {
                form2.postal_code.error = "Postal code cannot exceed 10 characters.";
            } else if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
                form2.postal_code.error = "Postal code contains invalid characters.";
            } else {
                form2.postal_code.error = "";
            }
            break;
        case "state":
            if (IsNullOrEmpty(value)) {
                form2.state.error = "State is required.";
            } else if (value.length < 2) {
                form2.state.error = "State must be at least 2 characters long.";
            } else if (value.length > 50) {
                form2.state.error = "State cannot exceed 50 characters.";
            } else if (!/^[A-Za-z\s\-]+$/.test(value)) {
                form2.state.error = "State contains invalid characters.";
            } else {
                form2.state.error = "";
            }

            break;
    }
}

const productos = async () => {
    if (site.userData()) {
        let response: any = await sp_shopping_cart_client().exec();
        if (response) {
            productData.value = response.carrito_cliente;
            productPrecio.value = response.precio;
            impuesto.value = response.impuesto;
        }
    }
}

const checkoutSession = async () => {
    const response: any = await sp_proceed_to_checkout().exec();

    if (response) {
        const url: any = response.redirectStripePayment;

        if (IsNullOrEmpty(url)) {
            console.log(url);
            return;
        }

        window.location.href = url;
    }
}

const validateCountry = () => {
    if (IsNullOrEmpty(formCountry.country.id_pais)) {
        formCountry.country.error = "Country is required.";
    } else {
        formCountry.country.error = "";
    }
}

const eliminarProductoDelCarrito = async (id_producto: string) => {
    await sp_delete_product_from_shoppingCart().exec({
        id_producto: btoa(id_producto)
    });

    if (sp_delete_product_from_shoppingCart().data) {
        notify.success("Product deleted");
        numberCartShopping().update();

        if (sp_delete_product_from_shoppingCart().data.productos.length == 0) {
            site.RedirectPage("home");
            return;
        }
        window.location.reload();
    }
}

const functionEdit = async () => {
    const form1: any = formCheckout1;
    const form2: any = formCheckout2;

    form1.name.value = clientData.value.nombre;
    form1.vat_number.value = clientData.value.numero_de_iva_empresa;
    form1.address.value = clientData.value.direccion;
    form2.state.value = clientData.value.estado;
    form2.postal_code.value = clientData.value.codigo_postal;
    formCountry.country.id_pais = clientData.value.id_pais;
}

const editCliente = async () => {
    const form1: any = formCheckout1;
    const form2: any = formCheckout2;

    const idsFormCheckout1: any = Object.values(
        formCheckout1
    ).map((field) => ({
        id: field.id,
        value: field.value,
    }));

    const idsFormCheckout2: any = Object.values(
        formCheckout2
    ).map((field) => ({
        id: field.id,
        value: field.value,
    }));

    for (const e of idsFormCheckout1) {
        validateForms1(e.value, e.id);
    }

    for (const e of idsFormCheckout2) {
        validateForms2(e.value, e.id);
    }
    validateCountry();

    if (
        !IsNullOrEmpty(form1.name.error) ||
        !IsNullOrEmpty(form1.vat_number.error) ||
        !IsNullOrEmpty(form1.address.error) ||
        !IsNullOrEmpty(form2.state.error) ||
        !IsNullOrEmpty(form2.postal_code.error) ||
        !IsNullOrEmpty(formCountry.country.error)
    ) {
        return;
    }

    await sp_edit_customer().exec({
        id_cliente: clientData.value.id_cliente,
        nombre: formCheckout1.name.value,
        direccion: formCheckout1.address.value,
        numero_de_iva_empresa: formCheckout1.vat_number.value,
        estado: formCheckout2.state.value,
        id_pais: formCountry.country.id_pais,
        codigo_postal: formCheckout2.postal_code.value
    })

    if (sp_edit_customer().data) {
        notify.success("your billing information has been saved.");
        console.log(sp_edit_customer().data);

        clientData.value = sp_edit_customer().data;
        editar.value = false;
    }
}

const downloadProduct = async () => {
    site.RedirectPage("paymentcompleted");
}
</script>

<template>
    <div class="flex flex-row gap-2 pt-[76px] w-full min-h-[200px] mb-6 items-end justify-center">
        <div class="flex flex-row w-full max-[1060px]:max-w-2xl gap-2">
            <p>
                hi user,
            </p>
            <p>
                {{ site.userData().nombre }}!
            </p>
        </div>
    </div>
    <div
        class="flex flex-row gap-4 max-[1060px]:pb-20 justify-evenly w-full min-h-screen grow shrink-0 max-[1060px]:flex-col-reverse max-[1060px]:items-center">
        <div class="flex flex-col w-full max-w-md max-[1060px]:max-w-2xl gap-4 min-h-full grow shrink-0">
            <div class="flex flex-col gap-1 text-[clamp(.85rem,3vw,1rem)]">
                <p>
                    your details
                </p>
                <p>biling</p>
            </div>
            <Loading v-if="!clientData" />
            <div class="flex flex-col w-full min-h-full grow shrink-0" v-else>
                <div class="flex flex-col gap-2 w-full" v-if="!clientData || editar">
                    <div class="flex flex-col gap-1" v-for="item in formCheckout1">
                        <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                            :placeholder="item.placeholder" @input="validateForms1(item.value, item.id)">
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="item.error">
                            {{ item.error }}
                        </span>
                    </div>
                    <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
                        <div class="flex flex-col w-full gap-1" v-for="item in formCheckout2">
                            <input v-model="item.value" type="text" @input="validateForms2(item.value, item.id)"
                                class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder">
                            <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="item.error">
                                {{ item.error }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <SelectCountry v-model="formCountry.country.id_pais"
                            :placeholder="formCountry.country.placeholder" :id_pais="formCountry.country.id_pais" />
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="formCountry.country.error">
                            {{ formCountry.country.error }}
                        </span>
                    </div>
                    <button @click="AddCliente()" class="bg-black py-5 px-3 rounded-full text-white" v-if="!editar">
                        continue
                    </button>
                    <div v-else class="flex flex-row gap-2 w-full">
                        <button @click="editCliente()" class="bg-black py-5 px-3 rounded-full text-white w-full">
                            edit
                        </button>
                        <button @click="editar = !editar"
                            class="border-black border py-5 px-3 rounded-full text-black w-full">
                            to back
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-4 w-full justify-between h-[min(500px,100%)]"
                    v-else-if="clientData && !editar">
                    <div class="flex flex-col leading-1">
                        <p>
                            <strong>Name:</strong> {{ clientData.nombre }}
                        </p>
                        <p>
                            <strong>Address:</strong> {{ clientData.direccion }}
                        </p>
                        <div class="flex flex-row gap-1">
                            <p>
                                <strong>Postal Code:</strong> {{ clientData.codigo_postal }},
                            </p>
                            <p>
                                <strong>State:</strong> {{ clientData.estado }}
                            </p>
                        </div>
                        <p>
                            <strong>Country:</strong> {{ clientData.pais }}
                        </p>
                        <span class="mt-3 text-[rgb(209,207,206)] underline underline-offset-1 cursor-pointer"
                            @click="editar = !editar; functionEdit();">
                            edit
                        </span>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p v-if="Number(productPrecio) > 0">
                            payment
                        </p>
                        <p v-else>
                            click to download
                        </p>
                        <button v-on:click="finish = !finish" v-if="!finish"
                            class="bg-black py-5 px-3 rounded-full text-white">
                            finish
                        </button>
                        <button v-if="finish && Number(productPrecio) > 0" v-on:click="checkoutSession()"
                            class="bg-black py-5 px-3 rounded-full text-white animate-fade-in">
                            pay with card
                        </button>
                        <button v-else-if="finish && Number(productPrecio) == 0" v-on:click="downloadProduct()"
                            class="bg-black py-5 px-3 rounded-full text-white animate-fade-in">
                            download
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full max-w-2xl gap-2">
            <p class="opacity-0 max-[1060px]:hidden before:content-['itsa']">

            </p>
            <p>
                cart
            </p>
            <div class="flex flex-col gap-2 border border-black py-5 px-10 sm:px-20 rounded-lg">
                <div class="flex flex-row justify-between text-[clamp(1.2rem,3vw,2rem)] pb-2 border-b border-b-black">
                    <p class="font-itsa-bold">
                        item
                    </p>
                    <p class="font-itsa-bold">
                        total
                    </p>
                </div>
                <div v-if="productData && productData.length > 0"
                    class="flex flex-col h-[120px] overflow-auto gap-2 py-2">
                    <div class="flex relative flex-row items-center gap-2" :key="index"
                        v-for="(item, index) in productData">
                        <div class="min-w-[100px] h-[100px] flex overflow-hidden bg-black rounded">
                            <File folder="../assets/img/gallery" :file="item.foto_producto" type="img"
                                :encrypted="false" />
                        </div>
                        <div class="flex flex-row w-full justify-between gap-4 text-[clamp(.85rem,3vw,1rem)]">
                            <p class="truncate">{{ item.descripcion }}</p>
                            <p>
                                ${{ item.precio }}
                            </p>
                        </div>
                        <button class="sticky right-0 rounded-s-full bg-white"
                            :disabled="sp_delete_product_from_shoppingCart().loading"
                            @click="eliminarProductoDelCarrito(item.id_producto)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Loading v-else />
                <div class="flex flex-row justify-between items-center gap-2 border-y border-y-black py-2">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        tax(16%)
                    </p>
                    <p class="text-[1rem]">
                        ${{ impuesto }}
                    </p>
                </div>
                <div class="flex flex-row justify-between gap-2 py-2 items-center">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        total
                    </p>
                    <p class="text-[1rem]">
                        ${{ productPrecio }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
