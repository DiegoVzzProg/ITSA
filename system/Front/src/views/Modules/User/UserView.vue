<template>

    <p class="title-view">
        User Options Catalog
    </p>
    <div class="flex flex-col mt-3 gap-2">
        <button type="button" v-on:click="Functions.RedirectPage('user_add')"
            class="bg-[#31d842] p-[10px] opacity-80 transition-all hover:opacity-100 rounded text-[#121212] font-black flex justify-center gap-1 items-center w-full max-w-xs">
            <UserPlus />
            Add a user
        </button>
        <DataTableComponent :columns="columns" :data="userList">
            <template #acciones="{ row }">
                <button v-on:click="goToEditUser(row.id)"
                    class="bg-blue-500 rounded p-2 px-3 transition-all duration-300 opacity-80 hover:opacity-100">
                    <Pencil :width="18" stroke-width="2.6" />
                </button>
            </template>
        </DataTableComponent>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { UserService } from '../../../services/modules/users-service';
import type { ApiResponse } from '../../../interfaces/api-response-interface';
import DataTableComponent from '../../../components/DataTableComponent.vue';
import type { ColumnDef } from '../../../interfaces/dataTable-interface';
import { Pencil, Trash, UserPlus } from 'lucide-vue-next';
import { Functions, type RouterParams } from '../../../utilities/functions';
import type { IGetUsers } from '../../../services/interfaces/user-interface';


const userList = ref([]);
const columns = ref<ColumnDef[]>([
    { label: 'ID', field: 'id', type: 'text' },
    { label: 'User name', field: 'name', type: 'text' },
    { label: 'Active', field: 'is_active', type: 'boolean' },
])
onMounted(async () => {
    await getOptions();
});

const goToEditUser = (user_id: string) => {

    const params: RouterParams = {
        name: 'user_edit',
        params: {
            user_id: user_id
        }
    }

    Functions.RedirectPage(params);
}

const getOptions = async () => {
    const entities: IGetUsers = {
        user_id: 0,
    }
    const response: ApiResponse = await new UserService().getUsers(entities);

    userList.value = response.data;
}

</script>

<style scoped></style>
