// assets/js/resume.js
document.addEventListener('DOMContentLoaded', function() {
  const printButton = document.getElementById('print-resume');
  
  if (printButton) {
    printButton.addEventListener('click', function() {
      window.print();
    });
  }
});
