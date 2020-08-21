<template>
  <div class="form-wrapper">
    <h1>Sign In</h1>
    <div class="form-item">
      <label for="username"></label>
      <input
        type="text"
        name="username"
        required="required"
        placeholder="username"
        v-model="username"
      />
    </div>
    <div class="form-item">
      <label for="password"></label>
      <input
        type="password"
        name="password"
        required="required"
        placeholder="password"
        v-model="pw"
      />
    </div>
    <div class="button-panel">
      <button class="button" title="Sign In" @click="signin">
        Sign In
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Auth } from "aws-amplify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();

    const username = ref("");
    const pw = ref("");

    const signin = async () => {
      try {
        await Auth.signIn(username.value, pw.value);
      } catch (e) {
        console.log("err,", e);
        return;
      }
      console.log("signed in");
      router.push("/rooms");
    };

    return {
      username,
      pw,
      signin
    };
  }
});
</script>
<style scoped>
/* Fonts */
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400);

/* fontawesome */
@import url(http://weloveiconfonts.com/api/?family=fontawesome);
[class*="fontawesome-"]:before {
  font-family: "FontAwesome", sans-serif;
}

/* Simple Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* body */
body {
  background: #e9e9e9;
  color: #5e5e5e;
  font: 400 87.5%/1.5em "Open Sans", sans-serif;
}

/* Form Layout */
.form-wrapper {
  background: #fafafa;
  margin: 3em auto;
  padding: 0 1em;
  max-width: 370px;
}

h1 {
  text-align: center;
  padding: 1em 0;
}

form {
  padding: 0 1.5em;
}

.form-item {
  margin-bottom: 0.75em;
  width: 100%;
}

.form-item input {
  background: #fafafa;
  border: none;
  border-bottom: 2px solid #e9e9e9;
  color: #666;
  font-size: 1em;
  height: 50px;
  transition: border-color 0.3s;
  width: 100%;
}

.form-item input:focus {
  border-bottom: 2px solid #c0c0c0;
  outline: none;
}

.button-panel {
  margin: 2em 0 0;
  width: 100%;
}

.button-panel .button {
  background: #42b983;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.button:hover {
  background: #27d888;
}

.form-footer {
  font-size: 1em;
  padding: 2em 0;
  text-align: center;
}

.form-footer a {
  color: #8c8c8c;
  text-decoration: none;
  transition: border-color 0.3s;
}

.form-footer a:hover {
  border-bottom: 1px dotted #8c8c8c;
}
</style>
