const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const getUserLogged = () => {
    const emailLogged = getEmailLogged();
    console.log(emailLogged);
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = prevUsers.find((user) => user.email === emailLogged);
    console.log("user:" + user);
    return user;
  };
  
  const writeWelcomeMessage = () => {
    const email = getEmailLogged();
    const user = getUserLogged();
    console.log(user);
    if (user && user.counter > 1) {
      document.getElementById("root").innerHTML = `
      <div class="text-center">
    <h1>Bentornat* ${email}</h1>
    <div class="text-center">
    <h1>Ultimo accesso: ${user.lastAccess}</h1>
    <h3>Numero accessi: ${user.counter}</h3>
    <button id='button-logout' class="btn btn-primary">Logout</button>
    `;
    } else {
      document.getElementById("root").innerHTML = `
      <div class="text-center">
    <h1>Benvenut* ${email}</h1>
    <br>
    <button id='button-logout' class="btn btn-primary ms-auto">Logout</button>
    </div>
    `;
    }
  
    document
      .getElementById("button-logout")
      .addEventListener("click", onClickLogout);
  };
  
  const writeFormLogin = () => {
    document.getElementById("root").innerHTML = `
    <div class="container">
    <div class="d-flex justify-content-center">
        <div class="text-center">
        <br>
            <input id="input-login" class="form-control w-100" placeholder="Email"/>
            <br>
            <button id="button-login" class="btn btn-primary" disabled>Login</button>
        </div>
    </div>
</div>`;
    const btnLogin = document.getElementById("button-login");
    btnLogin.addEventListener("click", onClickLogin);
    const inputLogin = document.getElementById("input-login");
    inputLogin.addEventListener("input", () => {
      if (validateEmail(inputLogin.value)) {
        console.log("ci siamo");
        btnLogin.disabled = false;
      }
    });
  };
  
  const saveEmailLogged = () => {
    const email = document.getElementById("input-login").value;
    localStorage.setItem("email", email);
  };
  
  const deleteEmailLogged = () => {
    localStorage.removeItem("email");
  };
  
  const onClickLogin = () => {
    saveEmailLogged();
    saveUserToStorage();
    writeWelcomeMessage();
  };
  
  const updateUser = () => {
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailLogged = getEmailLogged();
    const newUsers = prevUsers.map(({ onAccess, ...user }) => {
      if (user.email === emailLogged) {
        return {
          ...user,
          onAccess: new Date(),
          lastAccess: onAccess,
          counter: user.counter + 1,
        };
      } else return { ...user };
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
  };
  
  const saveNewUser = () => {
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = [
      ...prevUsers,
      {
        email: getEmailLogged(),
        onAccess: new Date(),
        lastAccess: "",
        counter: 1,
      },
    ];
    localStorage.setItem("users", JSON.stringify(newUsers));
  };
  
  const saveUserToStorage = () => {
    const user = getUserLogged();
    if (!!user) updateUser();
    else saveNewUser();
  };
  
  const onClickLogout = () => {
    writeFormLogin();
    deleteEmailLogged();
  };
  
  const getEmailLogged = () => {
    const email = localStorage.getItem("email");
    return email;
  };
  
  window.onload = () => {
    const email = getEmailLogged();
    const isLogged = !!email;
    console.log(isLogged);
    if (isLogged) writeWelcomeMessage();
    else writeFormLogin();
  };