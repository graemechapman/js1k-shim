// self executing anonymous, entry point for your app
(function(w) {
  c.width = c.height = 500; // set canvas size

  i = 0; //score

  m = (d) => Math.floor(Math.random() * 48) * 10 + 15;

  x = 245 // snake x coords
  y = 245 // y coords
  z = 0 // direction

  s = [0,0]; // snake - values assigned to directions [up, right, down, left]
  e = m(); // apple x
  f = m(); // apple y
  q = 1; // game speed
  h = 0; // game running

  o = (d,p) => d == 0 ? 10 : d == 2 ? -10 : 0 // get segment direction offset

  r = (d,p) => { //run loop
    s.splice(1, 0, z); // add a new element to the snake, in the right direction
    s.pop(); // remove the last section of the snake

    y -= o(z);
    x += o(z-1);

    a.fillStyle='#fff';
    a.fillRect(0,0,500,500); // fill white
    a.strokeRect(0,0,500,500); // add a border
    a.fillStyle='#0f0';

    a.fillText('🍏',e,f); //draw the apple
    a.fillStyle='red';

    u = x;
    v = y;

    s.map((d,p) => { // draw out all the snakey bits
        if (u == e && v == f) {
            q=q*.95;
            s.push(z);
            e=m()
            f=m();
        }

        u -= o(d-1); // increment snake segment based on direction
        v += o(d);

        (p > 1 && u == x && v == y)?h=1:0;

        a.fillRect(u, v, 10, 10);
    });

    [x,y].map((d) => d < 0 || d > 480?h=1:0) // wall collision detection

    i++;

    a.fillText(i*100, 10,10); //write score

    h ? 0 : w.setTimeout(r, 150*q);
  }

  w.onkeydown = (d) => {
    // z = (direction = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(d.key)) >= 0 ? Math.abs(direction - z) != 2 ? direction : z : z;
    z = (direction = [38, 39, 40, 37].indexOf(d.keyCode)) >= 0 ? Math.abs(direction - z) != 2 ? direction : z : z;
  };

  w.setTimeout(r, 150*q);
})(window);
