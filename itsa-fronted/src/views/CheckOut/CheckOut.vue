<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import SelectCountry from "../../components/SelectCountry.vue";

import { dgav, IsNullOrEmpty, notify, site } from '../../utils/site';
import File from '../../components/File.vue';
import Loading from '../../components/Loading.vue';
import { c_clientes } from '../../services/s_clientes';

const productData = ref<any>({});
const productPrecio = ref<string>("");
const impuesto = ref<string>("");
const userData = ref<any>({});

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
    },
});

onMounted(() => {
    userData.value = JSON.parse(site.getCookie("e.u.d") || "{}");

    productos();
    infoForms1();
});


onUnmounted(() => {

});


const infoForms1 = async () => {
    const dataUser: any = JSON.parse(site.getCookie("e.u.d"));

    const data: any = {
        id_usuario: dataUser.id_usuario,
    };

    const response: any = await c_clientes.fn_l_clientes(data);
    if (response) {
        console.log(response);
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
        IsNullOrEmpty(form1.name.error) ||
        IsNullOrEmpty(form1.vat_number.error) ||
        IsNullOrEmpty(form1.address.error) ||
        IsNullOrEmpty(form2.state.error) ||
        IsNullOrEmpty(form2.postal_code.error) ||
        IsNullOrEmpty(formCountry.country.error)
    ) {
        return;
    }

    if (userData.value) {
        await c_clientes.fn_a_clientes({
            id_usuario: userData.value.id_usuario,
            nombre: formCheckout1.name.value,
            numero_de_iva_empresa: formCheckout1.vat_number.value,
            direccion: formCheckout1.address.value,
            id_pais: 1,
            estado: formCheckout2.state.value,
            codigo_postal: formCheckout2.postal_code.value,
        });

        let message: string = dgav.dataBase.message;
        if (!IsNullOrEmpty(message)) {
            notify.error(message);
            return;
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
    if (userData.value) {
        let response: any = await c_clientes.fn_l_carrito_cliente({
            id_usuario: userData.value.id_usuario,
        });

        let message: string = dgav.dataBase.message;

        if (response) {
            if (!IsNullOrEmpty(message)) {
                notify.error(message);
                return;
            }

            productData.value = response;

            response = await c_clientes.fn_l_precio_carrito_cliente({
                id_usuario: userData.value.id_usuario,
            });

            if (response) {
                if (!IsNullOrEmpty(message)) {
                    notify.error(message);
                    return;
                }

                productPrecio.value = response.precio;
                impuesto.value = response.impuesto;
            }
        }
    }
}

const checkoutSession = async (cadena: string) => {
    const response: any = await c_clientes.proceedToCheckout({
        cadena: cadena,
    });

    if (!IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return;
    }

    if (response) {
        const url: any = response.redirectStripePayment;

        if (IsNullOrEmpty(url)) {
            console.log(url);
            return;
        }

        window.open(url, "_blank");
    }
}

const validateCountry = () => {
    if (IsNullOrEmpty(formCountry.country.value)) {
        formCountry.country.error = "Country is required.";
    } else {
        formCountry.country.error = "";
    }
}
</script>

<template>
    <div class="flex flex-row gap-2 pt-[76px] w-full min-h-[200px] mb-6 items-end justify-center">
        <div class="flex flex-row w-full max-[1060px]:max-w-2xl gap-2">
            <p>
                hi,
            </p>
            <p>
                {{ userData.nombre }}!
            </p>
        </div>
    </div>
    <div
        class="flex flex-row gap-4 max-[1060px]:pb-20 justify-between w-full min-h-screen grow shrink-0 max-[1060px]:flex-col-reverse max-[1060px]:items-center">
        <div class="flex flex-col w-full max-w-md max-[1060px]:max-w-2xl gap-2">
            <div class="flex flex-col gap-1 text-[clamp(.85rem,3vw,1rem)]">
                <p>
                    your details
                </p>
                <p>biling</p>
            </div>
            <div class="flex flex-col gap-1" v-for="item in formCheckout1">
                <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                    :placeholder="item.placeholder" @input="validateForms1(item.value, item.id)">
                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="item.error">
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
                <SelectCountry v-model="formCountry.country.value" @change="validateCountry"
                    :placeholder="formCountry.country.placeholder" />
                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                    v-if="formCountry.country.error">
                    {{ formCountry.country.error }}
                </span>
            </div>
            <button type="submit" @click="AddCliente()" class="bg-black py-5 px-3 rounded-full text-white">
                continue
            </button>
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
