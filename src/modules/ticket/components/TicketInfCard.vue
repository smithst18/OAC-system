<script setup lang='ts'>
import type { TicketInterface } from "@/interfaces/ticketInterfaces";
const props = defineProps<{
    ticket: TicketInterface,
}>();
</script>

<template>
    <div class="p-5 rounded-md shadow-md my-4 h-[170px] w-full grid grid-rows-4 grid-cols-1"> 
        <div class="flex items-center mb-5 row-span-1">
            <h4 class="text-base font-medium">{{ ticket.title }}.</h4>
            <p class="ml-auto font-medium text-sm">{{ ticket.date }}</p>
        </div>
        <div class="text-sm font-light mb-5 row-span-2">
            <p class="overflow-y-auto break-words h-full">
                {{ ticket.description }}.
            </p>
        </div>
        <div class="flex text-xs mt-auto font-medium row-span-1">
            <div class="ticket_tag"
            :class="[
                { 'bg-red-200 border border-red-400 text-red-600 font-medium': ticket.status === 'pendiente' },
                { 'bg-yellow-100 border border-yellow-400 text-yellow-600 font-medium': ticket.status === 'espera' },
                { 'bg-slate-200 border border-slate-400 text-slate-600': ticket.status === 'cerrado' },
             ]">{{ ticket.status }}</div>
            <div class="ticket_tag bg-slate-200 border border-slate-400 text-slate-600">#{{ ticket.id }}</div>
            <div class="ticket_tag bg-slate-200 border border-slate-400 text-slate-600">#{{ ticket.requester }}</div>
            <div class="ticket_tag bg-slate-200 border border-slate-400 text-slate-600">#{{ ticket.location  }}</div>
            <div class="ticket_tag bg-slate-200 border border-slate-400 text-slate-600">#{{ ticket.type  }}</div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ticket_tag{
    @apply rounded-full mr-3 px-3 py-1
}
</style>