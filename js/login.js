document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailError = document.getElementById("email-error");
    const passwordEerror = document.getElementById("password-error");
    emailError.innerText = "";
    passwordEerror.innerText = "";

  if (!email) {
    emailError.innerText = "Please enter a valid email address.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.")
    return;
  }

  if (password.length < 6) {
    passwordEerror.innerText="Password must be at least 6 characters.";
    return;
  }

 Swal.fire({
   title: "Success!",
   text: "Log In successful!",
   icon: "success",
   confirmButtonText: "OK",
 }).then(() => {
   window.location.href = "./index.html";
 });
});
