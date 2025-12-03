document.addEventListener("DOMContentLoaded", function () {
  let contactForm = document.querySelector(".contact-form form");
  let contactFields = contactForm.querySelectorAll("input, textarea");

  function isEmailValid(email) {
    let atIndex = email.indexOf("@");
    if (atIndex < 1) return false;

    let userPart = email.substring(0, atIndex);
    let domainPart = email.substring(atIndex + 1);

    let dotIndex = domainPart.lastIndexOf(".");
    if (dotIndex < 1 || dotIndex === domainPart.length - 1) return false;

    let domainName = domainPart.substring(0, dotIndex);
    let domainExtension = domainPart.substring(dotIndex + 1);

    return !(
      userPart.length < 1 ||
      domainName.length < 1 ||
      domainExtension.length < 2
    );
  }

  function validateField(field) {
    let value = field.value.trim();
    let messageElement = field.nextElementSibling;

    if (!messageElement || !messageElement.classList.contains("error-msg")) {
      messageElement = document.createElement("div");
      messageElement.classList.add("error-msg");
      field.insertAdjacentElement("afterend", messageElement);
    }

    let isValid = true;

    if (field.type === "email") {
      if (value === "") {
        isValid = false;
        messageElement.textContent = "This field is required";
      } else if (!isEmailValid(value)) {
        isValid = false;
        messageElement.textContent = "Invalid email address";
      }
    } else {
      if (value === "") {
        isValid = false;
        messageElement.textContent = "This field is required";
      }
    }

    if (isValid) {
      field.classList.remove("error-border");
      field.classList.add("success-border");
      messageElement.style.display = "none";
    } else {
      field.classList.remove("success-border");
      field.classList.add("error-border");
      messageElement.style.display = "block";
    }

    return isValid;
  }

  contactFields.forEach((field) => {
    field.addEventListener("blur", function () {
      validateField(this);
    });
    field.addEventListener("input", function () {
      validateField(this);
    });
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let allValid = true;
    contactFields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });
    if (allValid) {
      alert("Message sent successfully");
      contactForm.reset();
      contactFields.forEach((field) => {
        field.classList.remove("success-border");
        field.classList.remove("error-border");
      });
    }
  });

  let newsletterEmail = document.getElementById("newsletterEmail");
  let newsletterMsg = document.getElementById("newsletterMsg");
  let subscribeButton = document.getElementById("subscribeBtn");

  function validateNewsletter() {
    let value = newsletterEmail.value.trim();
    let isValid = true;

    if (value === "") {
      isValid = false;
      newsletterMsg.textContent = "This field is required";
    } else if (!isEmailValid(value)) {
      isValid = false;
      newsletterMsg.textContent = "Invalid email address";
    }

    if (isValid) {
      newsletterEmail.classList.remove("error-border");
      newsletterEmail.classList.add("success-border");
      newsletterMsg.style.display = "none";
    } else {
      newsletterEmail.classList.remove("success-border");
      newsletterEmail.classList.add("error-border");
      newsletterMsg.style.display = "block";
    }

    return isValid;
  }

  newsletterEmail.addEventListener("blur", validateNewsletter);
  newsletterEmail.addEventListener("input", validateNewsletter);

  subscribeButton.addEventListener("click", function () {
    if (validateNewsletter()) {
      alert("Subscribed successfully");
      newsletterEmail.value = "";
      newsletterEmail.classList.remove("success-border");
    }
  });
});
