document.addEventListener("DOMContentLoaded", function () {
    const abrirModal = document.getElementById("abrirModal");
    const modal = document.getElementById("miModal");
    const cerrar = document.querySelector(".cerrar");
  
    abrirModal.addEventListener("click", function () {
      modal.style.display = "block";
    });
  
    cerrar.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    
  });
  