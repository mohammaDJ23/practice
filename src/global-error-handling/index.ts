window.onerror = function (event, source, lineno, colno, error) {
  const errorElement = document.createElement('div');

  while (document.body.children.length) {
    document.body.removeChild(document.body.children[0]);
  }

  errorElement.innerHTML = `
    <div style="padding: 50px">
      <p>${error?.message}</p>
    </div>
  `;

  document.body.append(errorElement);

  return true;
};
