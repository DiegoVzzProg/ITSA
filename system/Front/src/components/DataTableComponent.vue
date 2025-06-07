<template>
    <div class="overflow-x-auto shadow rounded-lg">
        <table id="dataTable" class="table-auto w-full divide-y divide-[var(--clr-surface-a40)] text-white">
            <thead class="bg-[var(--clr-surface-a10)]">
                <tr>
                    <th class="px-6 py-3 text-center text-xs font-medium uppercase w-[150px]"
                        v-if="hasAccionesSlot && props.data.length > 0">
                        Actions
                    </th>
                    <th v-for="(col, idx) in props.columns" :key="idx"
                        class="px-6 py-3 text-center text-xs font-medium uppercase">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-[var(--clr-surface-a10)] divide-y divide-[var(--clr-surface-a40)]">
                <tr v-for="(row, rowIndex) in props.data" :key="rowIndex" class="hover:bg-[var(--clr-surface-a20)]">
                    <td class="px-4 py-2" v-if="hasAccionesSlot">
                        <div class="flex flex-row gap-1 w-full justify-around flex-wrap">
                            <slot name="acciones" :row="row" />
                        </div>
                    </td>
                    <td v-for="(col, colIndex) in props.columns" :key="colIndex" :class="cellClasses(col.type)"
                        class="px-6 py-4 whitespace-nowrap text-sm">
                        <template v-if="col.type === 'boolean'">
                            <div class="flex w-full justify-center">
                                <CheckBoxComponent :disabled="true" :checked="Boolean(row[col.field])" />
                            </div>
                        </template>

                        <template v-else-if="col.type === 'decimal'">
                            <div class="flex w-full justify-center">
                                {{ formatDecimal(row[col.field]) }}
                            </div>
                        </template>

                        <template v-else>
                            <div class="flex w-full justify-center">
                                {{ row[col.field] }}
                            </div>
                        </template>
                    </td>
                </tr>

                <tr v-if="props.data.length === 0">
                    <td :colspan="props.columns.length" class="px-6 py-4 text-center">
                        No hay registros.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, ref, useSlots } from 'vue'
import type { ColumnDef } from '../interfaces/dataTable-interface';
import CheckBoxComponent from './CheckBoxComponent.vue';



interface Props {
    columns: ColumnDef[]
    data: Record<string, any>[]
}

const props = defineProps<Props>()
const slots = useSlots();
const hasAccionesSlot = !!slots.acciones;
onMounted(() => {

});

onBeforeUnmount(() => {

})

function formatDecimal(value: unknown): string {
    const num = Number(value)
    if (isNaN(num)) return '-'
    return num.toFixed(2)
}

function cellClasses(type: string): string {
    switch (type) {
        case 'decimal':
            return 'text-right font-mono'
        case 'integer':
            return 'text-right font-mono'
        case 'boolean':
            return 'text-center'
        default:
            return 'text-left'
    }
}

</script>

<style scoped></style>