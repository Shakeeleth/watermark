function generateImage() {
  const fileInput = document.getElementById('imageUpload');
  const userName = document.getElementById('userName').value;
  const dateTime = document.getElementById('dateTime').value;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (!fileInput.files[0]) return alert("Please upload an image.");

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Overlay text
      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      const text = `${userName} | ${new Date(dateTime).toLocaleString()}`;
      const x = 20;
      const y = img.height - 30;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      // Optional logo (replace with your own image path)
      const logo = new Image();
      logo.src = "logo.png"; // Add your logo image to the project folder
      logo.onload = function () {
        ctx.drawImage(logo, img.width - 100, img.height - 100, 80, 80);
        const link = document.getElementById('downloadLink');
        link.href = canvas.toDataURL("image/jpeg");
      };
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}
