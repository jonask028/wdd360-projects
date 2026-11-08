<script lang="ts">
  let email = $state("");
  let password = $state("");
  let emailInput: any = $state();
  let passwordInput: any = $state();
  let emailValidationError = $state(false);
  let passwordValidationError = $state(false);

  async function loginHandler(event: any) {
    console.log("login handler hit");
    event.preventDefault();
    emailValidationError = false;
    passwordValidationError = false;
    const emailIsValid = emailInput.checkValidity();
    const passwordIsValid = passwordInput.checkValidity();
    if (emailIsValid && passwordIsValid) {
      console.log("logging in");
    } else {
      if (!emailIsValid) {
        emailValidationError = true;
      }
      if (!passwordIsValid) {
        passwordValidationError = true;
      }
    }
  }
</script>

<div class="form-container">
  <form id="loginForm" novalidate onsubmit={loginHandler}>
    <label>
      Email
      <input
        type="email"
        id="email"
        name="email"
        bind:this={emailInput}
        bind:value={email}
        required
        placeholder="example@email.com"
      />
    </label>
    <label>
      Password
      <input
        type="password"
        id="password"
        name="password"
        bind:this={passwordInput}
        bind:value={password}
        required
        minlength="12"
      />
    </label>
    <button disabled={!email || !password} type="submit">Log in</button>
  </form>
  <div>
    <p style="color: #ff0000" hidden={!emailValidationError}>
      Email input must be valid email
    </p>
    <p style="color: #ff0000" hidden={!passwordValidationError}>
      Password input must be at least 12 characters long
    </p>
  </div>
</div>

<style>
  form {
    display: grid;
    align-content: center;
    align-self: center;
  }

  .form-container {
    display: flex;
    margin: 1em;
    padding: 3em;
    border-color: black;
    border-radius: 15px;
    border-width: 2px;
    justify-content: center;
  }

  label {
    padding-bottom: 0.5em;
    justify-self: end;
  }

  button {
    border-radius: 2em;
  }
</style>
