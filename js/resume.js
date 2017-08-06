var url = '/img/resume.pdf';

PDFJS.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@1.8.609/build/pdf.worker.min.js';

var loadingTask = PDFJS.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');

  pdf.getPage(1).then(function(pageOne) {
    pdf.getPage(2).then(function(pageTwo) {
      var container = document.getElementById('container');
      var scale = 1;
      var viewport = pageOne.getViewport(scale);
      scale = container.clientWidth / viewport.width;
      viewport = pageOne.getViewport(scale);

      var canvas = document.getElementById('display-canvas-one');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = pageOne.render(renderContext);
      renderTask.then(function () {
        canvas = document.getElementById('display-canvas-two');
        context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        renderTask = pageTwo.render(renderContext);
        renderTask.then(function () {
          console.log("Resume rendered");
        });
      });
    });
  });
}, function (reason) {
  console.error(reason);
});
