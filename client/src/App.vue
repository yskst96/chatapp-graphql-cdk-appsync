<template>
  <div id="app">
    <suspense>
      <template #default>
        <div id="nav"></div>
        <router-view />
      </template>
      <template #fallback>loading...</template>
    </suspense>
  </div>
</template>

<style>
body {
  font-family: "Open Sans", sans-serif;
}
</style>
