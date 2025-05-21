<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-primary">Detalles del Proveedor y Licitación</h2>

    <div v-if="proveedor">
      <form class="needs-validation" novalidate @submit.prevent="updateCotizacion">
        <div class="mb-3 row">
          <label for="razonSocial" class="col-sm-3 col-form-label">Razón Social:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="razonSocial"
              :value="proveedor['Razon Social']"
              readonly
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="rif" class="col-sm-3 col-form-label">RIF:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="rif"
              :value="proveedor.RIF"
              readonly
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="licitacion" class="col-sm-3 col-form-label">Licitación:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="licitacion"
              :value="proveedor.Licitacion"
              readonly
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="fechaTope" class="col-sm-3 col-form-label">Fecha Tope:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="fechaTope"
              :value="proveedor['Fecha tope']"
              readonly
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="adjuntarDatos" class="col-sm-3 col-form-label">Adjuntar Cotización:</label>
          <div class="col-sm-9">
            <template v-if="!hasExistingAttachments">
              <input
                type="file"
                accept="application/pdf"
                class="form-control"
                id="adjuntarDatos"
                @change="handleFileUpload"
                multiple
                :disabled="hasExistingAttachments"
              /> 
            </template>
            <small v-if="hasExistingAttachments" class="form-text text-muted">
              Ya existen adjuntos para esta licitación.
            </small>
            <div v-if="uploadedFiles.length" class="mt-2">
              <p>Archivos cargados:</p>
              <ul>
                <li v-for="file in uploadedFiles" :key="file.name">
                  {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="!hasExistingAttachments" class="row mt-4">
          <div class="col-sm-9 offset-sm-3">
            <button type="submit" class="btn btn-success">Enviar Datos</button>
          </div>
        </div>
      </form>
    </div>

    <div v-else-if="loading">
      <p class="text-info">Cargando datos...</p>
    </div>
    <div v-else class="alert alert-danger" role="alert">
      <p>No se pudo cargar la cotizacion.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import getBase64 from "../utils/getBase64.js";

const proveedor = ref(null);
const loading = ref(true); // Estado de carga
const uploadedFiles = ref([]); // Para almacenar los archivos seleccionados

const getProveedor = async () => {
  const segments = window.location.pathname.split('/');
  const id = segments[segments.length - 1];

  if (!id) {
    console.error('Error: ID de proveedor no válido o no encontrado en la URL.');
    proveedor.value = null;
    loading.value = false;
    return;
  }

  fetch(import.meta.env.VITE_GET_COTIZACION_API+"&ID="+id)
    .then(response => response.json())
    .then(data => {
      proveedor.value = data;
      uploadedFiles.value = [...proveedor.value.datosAdjuntos]
    })  
    .catch(error => {
      console.error('Error:', error);
      proveedor.value = null;
      loading.value = false; // Cambia el estado de carga a falso en caso de error
      return null;
    });
}

const hasExistingAttachments = computed(() => {
  // Verifica si proveedor existe y si tiene la propiedad archivosAdjuntos que no esté vacía
  return proveedor.value && proveedor.value.datosAdjuntos && proveedor.value.datosAdjuntos.length > 0;
});

const updateCotizacion = async () => {
  const formData = {
    ID: proveedor.value.ID,
    datosAdjuntos: await Promise.all([...uploadedFiles.value].map(async file => ({
      name: file.name,
      contentBytes: await getBase64(file)
    })))
  };

  fetch(import.meta.env.VITE_UPDATE_COTIZACION_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      alert("Datos enviados correctamente!");
    } else {
      alert("Error al enviar datos.");
    }
  })
}

// Maneja la selección de archivos
const handleFileUpload = async (event) => {
  uploadedFiles.value = Array.from(event.target.files);
};

onMounted(() => {
  getProveedor();
});

</script>

<style>

</style>