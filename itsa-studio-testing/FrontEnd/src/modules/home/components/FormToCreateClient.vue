<template>
  <div class="flex flex-col w-full justify-center max-w-screen-lg items-center gap-3 max-[1020px]:flex-col">
    <button type="button" v-if="ClientData" @click="btnToBack" class="w-full flex flex-row justify-end">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M5 12l6 6" />
        <path d="M5 12l6 -6" />
      </svg>
      <p>to back</p>
    </button>
    <Form @submit="btnEditClient" class="flex w-full max-w-md flex-col gap-3 justify-between grow shrink-0"
      :initial-values="GetRecords()">
      <div class="flex flex-col gap-2 w-full">
        <div class="flex flex-col gap-1" v-for="(item, index) in FormRegister.Customer.Form1" :key="index">
          <Field :name="item.id" :placeholder="item.placeholder" :type="item.type"
            class="border border-black py-5 px-3 rounded-full" autocomplete="off" :rules="item.validations" />
          <ErrorMessage class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" :name="item.id" />
        </div>
        <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
          <div class="flex flex-col w-full gap-1" v-for="item in FormRegister.Customer.Form2">
            <Field :name="item.id" :placeholder="item.placeholder" :type="item.type"
              class="border border-black py-5 px-3 rounded-full" autocomplete="off" :rules="item.validations" />
            <ErrorMessage class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
              :name="item.id" />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <Field :rules="FormRegister.Customer.Form3.country.validations" :name="FormRegister.Customer.Form3.country.id"
            v-slot="{ field }">
            <SelectCountry :model-value="field.value" @update:model-value="value => field.onChange(value)"
              :placeholder="FormRegister.Customer.Form3.country.placeholder" />
          </Field>
          <ErrorMessage class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
            :name="FormRegister.Customer.Form3.country.id" />
        </div>
      </div>
      <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
        <Loading v-if="loading" />
        <button v-else-if="!loading && !ClientData" type="submit" class="bg-black py-5 px-3 rounded-full text-white">
          Add my info
        </button>
        <button v-else-if="!loading && ClientData" type="submit" class="bg-black py-5 px-3 rounded-full text-white">
          edit my info
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { onMounted, reactive, ref } from "vue";
import Loading from "../../components/Loading.vue";
import { notify, site } from "../../../utils/site";
import SelectCountry from "../../components/SelectCountry.vue";
// import { AuthClass, IRegister } from '../services/auth-service';
import { ApiResponse } from "../../../utils/Api.interface";
import {
  CostumersClass,
  IEditCustomer,
  IRegisterClient,
} from "../services/costumers-service";

const ClientData = ref<Record<string, any> | undefined>(undefined);
const RegexVatNumber = ref<RegExp>(
  /^(?:(?:[A-Z&Ñ]{3,4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[A-Z\d]{3})|(?:ATU\d{8}|BE0\d{9}|BG\d{9,10}|HR\d{11}|CY\d{8}[A-Z]|CZ\d{8,10}|DE\d{9}|DK\d{8}|EE\d{9}|EL\d{9}|ES[A-Z]\d{7}[A-Z]|FI\d{8}|FR[A-HJ-NP-Z0-9]{2}\d{9}|GB(?:\d{9}|\d{12}|GD\d{3}|HA\d{3})|HU\d{8}|IE\d{7}[A-W]|IT\d{11}|LT(?:\d{9}|\d{12})|LU\d{8}|LV\d{11}|MT\d{8}|NL\d{9}B\d{2}|PL\d{10}|PT\d{9}|RO\d{2,10}|SE\d{12}|SI\d{8}|SK\d{10}))$/
);

const GetRecords = (): Record<string, any> | undefined => {
  if (!site.getCookie("e.c.d")) return undefined;

  const data = JSON.parse(site.getCookie("e.c.d"));
  return {
    nombre: data.nombre,
    numero_de_iva_empresa: data.numero_de_iva_empresa,
    direccion: data.direccion,
    telefono: data.telefono,
    codigo_postal: data.codigo_postal,
    estado: data.estado,
    id_pais: data.id_pais,
  };
};
const FormRegister = reactive({
  Customer: {
    Form1: {
      name: {
        id: "nombre",
        placeholder: "Name",
        validations: yup
          .string()
          .required("this field is required")
          .min(4, "this field must have at least 4 characters")
          .max(255, "this field must have a maximum of 255 characters")
          .matches(
            /^[a-zA-Z\u00C0-\u00FF\s]+$/,
            "the input can only contain letters"
          ),
        type: "text",
      },
      vat_number: {
        id: "numero_de_iva_empresa",
        placeholder: "Vat number (optional)",
        validations: yup.string().notRequired().matches(RegexVatNumber.value, {
          message: "please enter a valid RFC or VAT number",
          excludeEmptyString: true,
        }),
        type: "text",
        class: "uppercase"
      },
      address: {
        id: "direccion",
        placeholder: "Address",
        validations: yup
          .string()
          .required("this field is required")
          .min(4, "this field must have at least 4 characters")
          .max(255, "this field must have a maximum of 255 characters"),
        type: "text",
      },
      phone: {
        id: "telefono",
        placeholder: "Phone",
        maxLength: 10,
        validations: yup
          .string()
          .required("this field is required")
          .length(10, "this field must have 10 characters"),
        type: "text",
      },
    },
    Form2: {
      postal_code: {
        id: "codigo_postal",
        placeholder: "Postal Code",
        validations: yup
          .string()
          .required("this field is required")
          .min(3, "this field must have at least 3 characters")
          .max(10, "this field must have a maximum of 10 characters")
          .matches(
            /^[A-Za-z0-9\s\-]+$/,
            "postal code contains invalid characters"
          ),
        type: "text",
      },
      state: {
        id: "estado",
        placeholder: "State",
        validations: yup
          .string()
          .required("this field is required")
          .min(2, "this field must have at least 2 characters")
          .max(50, "this field must have a maximum of 50 characters")
          .matches(/^[A-Za-z\s\-]+$/, "state contains invalid characters"),
        type: "text",
      },
    },
    Form3: {
      country: {
        id: "id_pais",
        placeholder: "Country",
        id_pais: 0,
        validations: yup.number().required().moreThan(0, "country is required"),
      },
    },
  },
});
onMounted(() => {
  if (site.getCookie("e.c.d"))
    ClientData.value = JSON.parse(site.getCookie("e.c.d"));
});

const emit = defineEmits<{
  (e: "cambiar", data: boolean): void;
}>();

function btnToBack() {
  emit("cambiar", false);
}

const loading = ref<boolean>(false);

const btnEditClient = async (data: any) => {
  if (ClientData.value) {
    btnFunctionEdit(data);
  } else {
    btnFunctionAdd(data);
  }
};

async function btnFunctionEdit(data: any) {
  loading.value = true;
  if (!ClientData.value) return;

  const params: IEditCustomer = {
    id_cliente: ClientData.value.id_cliente,
    nombre: data.nombre,
    numero_de_iva_empresa: data.numero_de_iva_empresa,
    direccion: data.direccion,
    codigo_postal: data.codigo_postal,
    estado: data.estado,
    id_pais: data.id_pais,
    telefono: data.telefono,
  };

  const response: ApiResponse = await new CostumersClass().editCustomer(params);

  if (!response.data) {
    emit("cambiar", false);
    loading.value = false;
    return;
  }
  notify.success("your billing information has been saved.");

  ClientData.value = response.data;
  site.setCookies({
    "e.c.d": JSON.stringify(response.data),
  });
  loading.value = false;
  emit("cambiar", true);
}

async function btnFunctionAdd(data: any) {
  loading.value = true;

  const dataI: IRegisterClient = {
    nombre: data.nombre,
    numero_de_iva_empresa: data.numero_de_iva_empresa,
    direccion: data.direccion,
    codigo_postal: data.codigo_postal,
    estado: data.estado,
    id_pais: data.id_pais,
    telefono: data.telefono,
  };

  const response: ApiResponse = await new CostumersClass().registerClient(
    dataI
  );

  if (!response.data) {
    loading.value = false;
    emit("cambiar", false);
    return;
  }
  notify.success("your billing information has been saved.");

  site.setCookies({
    "e.c.d": JSON.stringify(response.data.client_data),
  });
  loading.value = false;
  emit("cambiar", true);
}
</script>

<style scoped></style>
