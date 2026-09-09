declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    enableLinks?: boolean;
    html2canvas?: any;
    jsPDF?: any;
    pagebreak?: { mode?: string | string[]; before?: string | string[]; after?: string | string[]; avoid?: string | string[] };
  }

  interface Html2PdfWorker {
    from(element: HTMLElement | null): Html2PdfWorker;
    set(options: Html2PdfOptions): Html2PdfWorker;
    save(): Promise<void>;
    output(type?: string, options?: any): Promise<any>;
  }

  function html2pdf(): Html2PdfWorker;
  function html2pdf(element: HTMLElement | null, options?: Html2PdfOptions): Html2PdfWorker;

  export default html2pdf;
}
