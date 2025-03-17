const mario = document.getElementById("mario");
let isJumping = false;
let position = 0;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      // Falling down
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          mario.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Jumping up
      position += 20;
      mario.style.bottom = position + "px";
    }
  }, 20);
}
