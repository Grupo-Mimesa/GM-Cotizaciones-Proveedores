<template>
  <div id="content">
    <header>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://grupomimesa.com/wp-content/uploads/2021/11/log-grupo-mimesa.png" alt="Grupo Mimesa">
          </a>
          <div class="collapse navbar-collapse" id="navbarText">
          <span class="navbar-text fs-5">
            <strong>Registro de Cotizaciones</strong>
          </span>
        </div>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-5 d-flex align-items-center">
            <span class="mb-3 mb-md-0 text-body-secondary">
              Copyright © MIMESA ALIMENTOS C.A. RIF J-07032176-8
            </span>
          </div>
        </footer>
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>

<style>
#content {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header" "main" "footer";
}

.navbar {
  height: 80px;
  max-height: 80px;
  & img {
    max-width:160px;
    margin: 0 20px 0 20px;
  }
}
</style>