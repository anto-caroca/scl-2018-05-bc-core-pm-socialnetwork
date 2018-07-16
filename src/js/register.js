//Registro
function registerWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value;
    const nameValue = document.getElementById("name").value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then((datos) => {
            console.log("Usuario creado con éxito");
            let user = firebase.auth().currentUser;
            user.updateProfile({ displayName: nameValue })
                .then(() => {
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location = "comentarios.html"
                })
                .catch((error) => {
                    console.log(error)
                })

        })
        .catch((error) => {
            let msn = document.getElementById("msnUsuario");
            if (error.code === "auth/email-already-in-use") {
                msn.innerHTML = "<span class='error'>Usuario registrado</span>";
            }

            if (error.code === "auth/invalid-email") {
                msn.innerHTML = "<span class='error'>Debes ingresar tus datos</span>";
            }
            if (error.code === "auth/weak-password") {
                msn.innerHTML = "<span class='error'>Debes ingresar contraseña de al menos 6 caracteres</span>";
            }
            console.log("Error de firebase > Código > " + error.code);
            console.log("Error de firebase > Mensaje > " + error.message);
        });
}