window.addEventListener("load", () => {
  const div = document.querySelector("#timer");
  let count = 0;

  const interval = setInterval(() => {
    timer.textContent = ++count;

    if (!(count % 5)) {
      setTimeout(() => {
        timer.textContent = count + ",5";
      }, 500);
    }

    if (!(count % 7)) {
      this.clearInterval(interval);
    }
  }, 1000);
});
