<script setup lang='ts'>
    import { defineAsyncComponent } from 'vue';
    const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'));

</script>

<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="w-3/4 p-5 rounded-md shadow-md bg-white">
            <h1 class="text-2xl font-semibold text-center my-5 text-primary">Nuevo usuario</h1>
            <form action="" class="p-5 grid grid-cols-2 gap-x-9 w-full">
                <div class="relative z-0 w-full mb-10">
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder=""
                    />
                    <label for="name" class="origin-0">Problema</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder=""
                    />
                    <label for="name" class="origin-0">Problema</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder=""
                    />
                    <label for="name" class="origin-0">Problema</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder=""
                    />
                    <label for="name" class="origin-0">Problema</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder=""
                    />
                    <label for="name" class="origin-0">Problema</label>
                </div>
                <div class="relative z-0 w-full mb-10">
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder=""
                    />
                    <label for="name" class="origin-0">Problema</label>
                </div>
            </form>
            <div class="w-[96%] mx-auto">
                <submitButton :full-size="true" title="Agregar" class="text-center mb-5"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
    input {
      @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-300
    }
    label{
        @apply absolute duration-300 top-3 -z-1 text-gray-500
    }
    /* estilos para evitar errores en ela utocompletar de el formulario */ 
    input {
        color: #000000 !important;
        -webkit-text-fill-color: #000000 !important;
        -webkit-background-clip: text !important;
        background-clip:  text !important;
    }

    .-z-1 {
        z-index: -1;
    }
      .origin-0 {
        transform-origin: 0%;
    }
    input:focus ~ label,
    input:not(:placeholder-shown) ~ label,
    textarea:focus ~ label,
    textarea:not(:placeholder-shown) ~ label,
    select:focus ~ label,
    select:not([value='']):valid ~ label {
      /* @apply transform; scale-75; -translate-y-6; */
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
        skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      --tw-scale-x: 0.75;
      --tw-scale-y: 0.75;
      --tw-translate-y: -1.5rem;
    }
    input:focus ~ label,
    select:focus ~ label {
      /* @apply text-black; left-0; */
      --tw-text-opacity: 1;
      color: rgba(0, 0, 0, var(--tw-text-opacity));
      left: 0px;
    }
</style>