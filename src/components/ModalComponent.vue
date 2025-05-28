<template>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modalElement">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="staticBackdropLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="handleCancel"></button>
        </div>
        <div class="modal-body">
          <h2 class="fs-5 mb-4">{{ description }}</h2>
          <slot :data="body"></slot> 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="handleCancel">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="handleConfirm">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as bootstrap from 'bootstrap';

const props = defineProps({
  open: Boolean,
  title: String,
  description: String,
  body: {
    type: Object,
    default: () => ({}),
  }
});

const emit = defineEmits(['update:open', 'confirm', 'cancel']);

const modalElement = ref(null);
let modal = null;

onMounted(() => {
  if (modalElement.value) {
    modal = new bootstrap.Modal(modalElement.value);
    modalElement.value.addEventListener('hidden.bs.modal', () => {
      emit('update:open', false);
    });
  }
})

watch(() => props.open, (newVal) => {
  if (modal) { // Asegurarse de que la instancia del modal ya esté creada
    if (newVal) {
      modal.show();
    } else {
      modal.hide();
    }
  }
}, { immediate: true });

const showModal = () => {
  emit('update:open', true);
};

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
  emit('update:open', false);
};
</script>

<style></style>