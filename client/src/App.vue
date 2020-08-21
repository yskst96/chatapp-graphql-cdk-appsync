<template>
  <div id="app">
    <div id="nav"></div>
    <suspense>
      <template #default>
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
