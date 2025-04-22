<template>
    <div class="min-h-[200px] mb-6 max-[1060px]:min-h-[100px] ">
    </div>
    <div
        class="flex flex-row gap-4 max-[1060px]:pb-20 justify-evenly w-full min-h-screen grow shrink-0 max-[1060px]:flex-col-reverse max-[1060px]:items-center">
        <div
            class="flex flex-col w-full max-w-md max-[1060px]:max-w-2xl gap-4 min-h-full grow shrink-0 max-[1060px]:pt-6">
            <div class="flex flex-col gap-1 text-[1rem]">
                <div class="flex flex-row w-full gap-2 font-semibold">
                    <p>
                        hi user,
                    </p>
                    <p v-if="site.userData()">
                        {{ site.userData().nombre }}!
                    </p>
                </div>
                <p>
                    your details
                </p>
                <p>biling</p>
            </div>
            <div class="flex flex-col w-full min-h-full grow shrink-0">
                <div v-if="!ClientData || Editar" class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-1" v-for="item in FormCostumer.Customer.Form1">
                        <input v-model="item.value" type="text" :maxlength="item.maxLength"
                            class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder"
                            v-on:input="ValidateRegistrationForm(item)">
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="item.error">
                            {{ item.error }}
                        </span>
                    </div>
                    <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
                        <div class="flex flex-col w-full gap-1" v-for="item in FormCostumer.Customer.Form2">
                            <input v-model="item.value" type="text" :maxlength="item.maxLength"
                                v-on:input="ValidateRegistrationForm(item)"
                                class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder">
                            <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="item.error">
                                {{ item.error }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <SelectCountry v-model="FormCostumer.Customer.Form3.country.id_pais"
                            :placeholder="FormCostumer.Customer.Form3.country.placeholder" />
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="FormCostumer.Customer.Form3.country.error">
                            {{ FormCostumer.Customer.Form3.country.error }}
                        </span>
                    </div>
                    <div v-if="Editar" class="flex flex-row gap-2 w-full">
                        <button @click="FunctionEditClient()" class="bg-black py-5 px-3 rounded-full text-white w-full">
                            edit
                        </button>
                        <button @click="Editar = !Editar; FormCostumer.Reset();"
                            class="border-black border py-5 px-3 rounded-full text-black w-full">
                            to back
                        </button>
                    </div>
                </div>
                <div v-else class="flex flex-col gap-4 w-full justify-between h-[min(500px,100%)]">
                    <div class="flex flex-col leading-1">
                        <p>
                            <strong>Name:</strong> {{ ClientData.nombre }}
                        </p>
                        <p>
                            <strong>Phone:</strong> {{ ClientData.telefono }}
                        </p>
                        <p>
                            <strong>Address:</strong> {{ ClientData.direccion }}
                        </p>
                        <div class="flex flex-row gap-1">
                            <p>
                                <strong>Postal Code:</strong> {{ ClientData.codigo_postal }}, {{
                                    ClientData.municipio }}
                            </p>
                            <p>
                                <strong>State:</strong> {{ ClientData.estado }}
                            </p>
                        </div>
                        <p>
                            <strong>Country:</strong> {{ ClientData.pais }}
                        </p>
                        <span class="mt-3 text-[rgb(209,207,206)] underline underline-offset-1 cursor-pointer"
                            @click="FunctionEdit();">
                            edit
                        </span>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p>
                            click on finish
                        </p>
                        <button v-on:click="FunctionFinish()" v-if="!Finish"
                            class="bg-black py-5 px-3 rounded-full text-white">
                            finish
                        </button>
                        <button v-if="Finish" v-show="!ocultarBoton" v-on:click="CheckoutSession($event)"
                            class="bg-black py-5 px-3 rounded-full text-white animate-fade-in">
                            continue to download
                        </button>
                        <Loading v-if="LoadingHabilitado" />
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
                <div class="flex flex-col h-[120px] overflow-auto gap-2 py-2">
                    <div class="flex relative flex-row items-center gap-2" v-for="item in stores.echoStore().carrito"
                        :key="item.id_producto">
                        <div class="min-w-[100px] h-[100px] flex overflow-hidden bg-black rounded">
                            <File v-if="item.foto_producto" :file="item.foto_producto" type="img" />
                            <Loading v-else />
                        </div>
                        <div class="flex flex-row w-full justify-between gap-4 text-[clamp(.85rem,3vw,1rem)]">
                            <p class="truncate">{{ item.descripcion }}</p>
                            <p>
                                ${{ item.precio }}
                            </p>
                        </div>
                        <button class="sticky right-0 rounded-s-full bg-white" :disabled="!deleteProduct"
                            v-on:click="DeleteProduct(item.id_producto)">
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
                <div class="flex flex-row justify-between items-center gap-2 border-y border-y-black py-2">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        tax(16%)
                    </p>
                    <p class="text-[1rem]">
                        ${{ stores.echoStore().totales.impuesto }}
                    </p>
                </div>
                <div class="flex flex-row justify-between gap-2 py-2 items-center">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        total
                    </p>
                    <p class="text-[1rem]">
                        ${{ stores.echoStore().totales.total }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SelectCountry from "../../components/SelectCountry.vue";
import File from '../components/File.vue';
import Loading from '../../components/Loading.vue';
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { notify, site } from "../../../utils/site";
import stores from "../../stores/GeneralStores";
import { ProductsClass } from "../services/products-service";
import { ApiResponse } from "../../../utils/Api.interface";
import { CostumersClass, IDeleteProductFromShoppingCart, IEditCustomer, IProceedToCheckout } from "../services/costumers-service";

const LoadingHabilitado = ref<boolean>(false);
const ocultarBoton = ref<boolean>(false);

onMounted(() => {
    if (!verificarCarrito()) {
        return;
    }
    ClientData.value = JSON.parse(site.getCookie("e.c.d"));
    Productos();
});

onUnmounted(() => {

});

const ClientData = ref<any>(null);
const Finish = ref<boolean>(false);
const Editar = ref<boolean>(false);
const deleteProduct = ref<boolean>(true);
const FormCostumer = reactive({
    Customer: {
        Form1: {
            name: {
                id: "name",
                value: "",
                placeholder: "Name",
                error: "",
                maxLength: 255,
            },
            vat_number: {
                id: "vat_number",
                value: "",
                placeholder: "Vat number (optional)",
                error: "",
                maxLength: 12,
            },
            address: {
                id: "address",
                value: "",
                placeholder: "Address",
                error: "",
                maxLength: 255,
            },
            phone: {
                id: "phone",
                value: "",
                placeholder: "Phone",
                error: "",
                maxLength: 10,
            },
        },
        Form2: {
            postal_code: {
                id: "postal_code",
                value: "",
                placeholder: "Postal Code",
                error: "",
                maxLength: 10,
            },
            state: {
                id: "state",
                value: "",
                placeholder: "State",
                error: "",
                maxLength: 50,
            },
        },
        Form3: {
            country: {
                id: "country",
                value: "",
                placeholder: "Country",
                error: "",
                id_pais: 0,
            },
        },
    },

    Reset: function () {
        Object.values(this.Customer.Form1).forEach((field) => (field.value = field.error = ""));
        Object.values(this.Customer.Form2).forEach((field) => (field.value = field.error = ""));
        this.Customer.Form3.country.value = "";
        this.Customer.Form3.country.error = "";
    },
});

function verificarCarrito(carrito?: any): boolean {
    if (stores.echoStore().carrito.length == 0 || carrito?.carrito_cliente.length == 0) {
        site.RedirectPage({ name: "home" });
        return false;
    }
    return true;
}

async function Productos(): Promise<any> {
    const response: ApiResponse = await new CostumersClass().shoppingCartClient();
    if (!verificarCarrito(response.data)) {
        return;
    }
}

function ValidateRegistrationForm(item: any) {
    item.value = site.IsNullOrEmpty(item.value) ? "" : item.value.trim();
    switch (item.id) {
        case "name":
            ValidateName(item.value);
            break;
        case "address":
            ValidateAddress(item.value);
            break;
        case "vat_number":
            ValidateVatNumber(item.value);
            break;
        case "postal_code":
            ValidatePostalCode(item.value);
            break;
        case "state":
            ValidateState(item.value);
            break;
        case "country":
            ValidateCountry();
            break;
        case "phone":
            ValidatePhone(item.value);
            break;
    }
}

function ValidateName(value: string) {
    const name: any = FormCostumer.Customer.Form1.name;

    if (site.IsNullOrEmpty(value)) {
        name.error = "field is required.";
        return;
    }
    if (value.length > 255) {
        name.error = "The input cannot exceed 255 characters.";
        return;
    }
    if (!/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(value)) {
        name.error = "The input can only contain letters.";
        return;
    }
    name.error = "";
}

function ValidateVatNumber(value: string) {
    const regex: any = /^(?:(?:[A-Z&Ñ]{3,4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[A-Z\d]{3})|(?:ATU\d{8}|BE0\d{9}|BG\d{9,10}|HR\d{11}|CY\d{8}[A-Z]|CZ\d{8,10}|DE\d{9}|DK\d{8}|EE\d{9}|EL\d{9}|ES[A-Z]\d{7}[A-Z]|FI\d{8}|FR[A-HJ-NP-Z0-9]{2}\d{9}|GB(?:\d{9}|\d{12}|GD\d{3}|HA\d{3})|HU\d{8}|IE\d{7}[A-W]|IT\d{11}|LT(?:\d{9}|\d{12})|LU\d{8}|LV\d{11}|MT\d{8}|NL\d{9}B\d{2}|PL\d{10}|PT\d{9}|RO\d{2,10}|SE\d{12}|SI\d{8}|SK\d{10}))$/;
    const vat_number: any = FormCostumer.Customer.Form1.vat_number;
    if (site.IsNullOrEmpty(value)) {
        vat_number.error = "";
    } else if (!regex.test(value)) {
        vat_number.error =
            "Please enter a valid RFC or VAT number.";
    } else {
        vat_number.error = "";
    }
}

function ValidateAddress(value: string) {
    const address: any = FormCostumer.Customer.Form1.address;
    if (site.IsNullOrEmpty(value)) {
        address.error = "Address is required.";
        return;
    }
    if (value.length > 255) {
        address.error = "Address cannot exceed 255 characters.";
        return;
    }
    address.error = "";
}

function ValidatePostalCode(value: string) {
    const postal_code: any = FormCostumer.Customer.Form2.postal_code;
    if (site.IsNullOrEmpty(value)) {
        postal_code.error = "Postal code is required.";

        return;
    }
    if (value.length < 3) {
        postal_code.error = "Postal code must be at least 3 characters long.";
        return;
    }
    if (value.length > 10) {
        postal_code.error = "Postal code cannot exceed 10 characters.";
        return;
    }
    if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
        postal_code.error = "Postal code contains invalid characters.";

        return;
    }
    postal_code.error = "";
}

function ValidateState(value: string): void {
    const state: any = FormCostumer.Customer.Form2.state;
    if (site.IsNullOrEmpty(value)) {
        state.error = "State is required.";
        return;
    }
    if (value.length < 2) {
        state.error = "State must be at least 2 characters long.";
        return;
    }
    if (value.length > 50) {
        state.error = "State cannot exceed 50 characters.";
        return;
    }

    if (!/^[A-Za-z\s\-]+$/.test(value)) {
        state.error = "State contains invalid characters.";
        return;
    }
    state.error = "";
}

function ValidateCountry(): void {
    const country: any = FormCostumer.Customer.Form3.country;
    if (country.id_pais == 0) {
        country.error = "Country is required.";
        return;
    }
    country.error = "";
}

function ValidatePhone(value: string): void {
    const phone: any = FormCostumer.Customer.Form1.phone;
    if (site.IsNullOrEmpty(value)) {
        phone.error = "Phone is required.";
        return;
    }

    if (!/^[0-9\s\-]+$/.test(value)) {
        phone.error = "Phone contains invalid characters.";
        return;
    }

    if (value.length < 10 || value.length > 10) {
        phone.error = "Phone must be at least 10 characters long.";
        return;
    }

    phone.error = "";
}

async function CheckoutSession(elemento: any): Promise<any> {
    LoadingHabilitado.value = true;
    ocultarBoton.value = true;

    if (!verificarCarrito()) {
        return;
    }

    if (parseFloat(stores.echoStore().totales.total) == 0) {
        const response: ApiResponse = await new ProductsClass().addProductDownloadList();

        if (!response.data)
            return;

        site.RedirectPage({ name: response.data.redirectToDownload });
    } else {

        const params: IProceedToCheckout = {
            key: stores.guid().value
        }

        const response: ApiResponse = await new CostumersClass().proceedToCheckout(params);

        if (!response.data)
            return;

        const url: any = response.data.redirectStripePayment;

        if (site.IsNullOrEmpty(url)) return;
        window.location.href = url;
    }

    elemento.target.disabled = true;
}

function FunctionEdit(): void {
    Editar.value = !Editar.value;
    const form1: any = FormCostumer.Customer.Form1;
    const form2: any = FormCostumer.Customer.Form2;
    const form3: any = FormCostumer.Customer.Form3;

    form1.name.value = ClientData.value.nombre;
    form1.vat_number.value = ClientData.value.numero_de_iva_empresa;
    form1.address.value = ClientData.value.direccion;
    form1.phone.value = ClientData.value.telefono;
    form2.state.value = ClientData.value.estado;
    form2.postal_code.value = ClientData.value.codigo_postal;
    form3.country.id_pais = ClientData.value.id_pais;
}

async function FunctionEditClient(): Promise<any> {
    const CustomerForm1: any = FormCostumer.Customer.Form1;

    Object.keys(CustomerForm1).forEach((key) => {
        ValidateRegistrationForm(CustomerForm1[key]);
    });

    const CustomerForm2: any = FormCostumer.Customer.Form2;
    Object.keys(CustomerForm2).forEach((key) => {
        ValidateRegistrationForm(CustomerForm2[key]);
    });

    const CustomerForm3: any = FormCostumer.Customer.Form3;
    ValidateRegistrationForm(CustomerForm3.country);

    if (
        !site.IsNullOrEmpty(CustomerForm1.name.error) ||
        !site.IsNullOrEmpty(CustomerForm1.vat_number.error) ||
        !site.IsNullOrEmpty(CustomerForm1.address.error) ||
        !site.IsNullOrEmpty(CustomerForm2.state.error) ||
        !site.IsNullOrEmpty(CustomerForm2.postal_code.error) ||
        !site.IsNullOrEmpty(CustomerForm3.country.error)
    )
        return;

    const params: IEditCustomer = {
        id_cliente: ClientData.value.id_cliente,
        nombre: CustomerForm1.name.value,
        numero_de_iva_empresa: CustomerForm1.vat_number.value,
        direccion: CustomerForm1.address.value,
        codigo_postal: CustomerForm2.postal_code.value,
        estado: CustomerForm2.state.value,
        id_pais: CustomerForm3.country.id_pais,
        telefono: CustomerForm1.phone.value,
    }

    const response: ApiResponse = await new CostumersClass().editCustomer(params);

    if (response.data) {
        notify.success("your billing information has been saved.");

        ClientData.value = response.data;
        site.setCookies({
            "e.c.d": JSON.stringify(response.data),
        });
        Editar.value = false;
    }
}

function FunctionFinish(): void {
    Finish.value = !Finish.value;
}

async function DeleteProduct(id_producto: string) {
    deleteProduct.value = false;

    const params: IDeleteProductFromShoppingCart = {
        id_producto: Number(id_producto),
    };

    const response: ApiResponse = await new CostumersClass().deleteProductFromShoppingCart(params);

    if (response.data) {

        notify.success("Product deleted");

        if (!verificarCarrito()) {
            return;
        }

        deleteProduct.value = true;
    }
}


</script>

<style scoped></style>
