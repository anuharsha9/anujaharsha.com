export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#02080a] min-h-screen text-white font-sans print:bg-[#02080a] print:text-white pb-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide things that shouldn't be printed */
          nav, header:not(.print-header), footer, .hide-on-print {
            display: none !important;
          }
          /* Force page breaks where needed */
          .page-break {
            page-break-before: always;
          }
          /* Prevent breaks inside critical sections */
          .no-break {
            page-break-inside: avoid;
          }
          /* Remove scroll constraints and force motion elements to be visible */
          * {
            overflow: visible !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            transition: none !important;
            animation: none !important;
          }
          
          /* Remove all box styling from Bento grids and tiles */
          .bento-grid, .bento-row, .text-tile, .image-tile, .video-tile, [class*="bg-zinc"], [class*="border-zinc"], [class*="bg-[var"], [class*="ring-"], [class*="shadow-"] {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            --tw-ring-shadow: none !important;
            --tw-ring-color: transparent !important;
            padding: 0 !important;
            margin-bottom: 2rem !important;
          }

          /* Keep text clean */
          h1, h2, h3, h4, p, span {
            color: black !important;
          }
          
          /* Unroll carousels/stacks for print */
          .carousel-container, .screenshot-stack {
            display: block !important;
            height: auto !important;
            overflow: visible !important;
          }
          
          .carousel-container > div, .screenshot-stack > div {
            position: relative !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            margin-bottom: 2rem !important;
          }

          /* Rotate sketchbook images if needed */
          .print-rotate {
            transform: rotate(90deg) !important;
            max-width: 80% !important;
            margin: 2rem auto !important;
            display: block !important;
          }

          /* Hide Macbook frames if they exist */
          .macbook-frame, [class*="macbook"] {
            display: none !important;
          }
        }
      `}} />
      {children}
    </div>
  )
}
