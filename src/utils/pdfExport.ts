import html2pdf from 'html2pdf.js';

export const exportElementToPDF = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found`);
    return;
  }

  const opt = {
    margin:       [0.2, 0.2, 0.2, 0.2],
    filename:     filename || 'HavenCare_Memorial_Program.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

export const printElementDirectly = () => {
  window.print();
};
