// self executing anonymous, entry point for your app
((d) => {
  c.width = c.height = 500; // set canvas size

  i = 0; //score

  m = (d) => Math.floor(Math.random() * 48) * 10 + 15;

  x = 245 // snake x coords
  y = 245 // y coords
  z = 0 // direction

  s = [0]; // snake parts - values assigned to directions [up, right, down, left]
  e = m(); // apple x
  f = m(); // apple y
  q = 250; // game speed
  h = 0; // game running

  o = (d) => d == 0 ? 10 : d == 2 ? -10 : 0 // get segment direction offset

  r = (d) => { //run loop
    u = x;
    v = y;

    //apple detection
    if (e == x && y == f) {
        q*=.95;
        s.push(s[i])
        e=m()
        f=m()
    }

    // move snake in the right direction
    y -= o(z);
    x += o(z-1);

    a.fillStyle='#fff';
    a.fillRect(0,0,500,500); // fill white
    a.strokeRect(0,0,500,500); // add a border
    // a.fillStyle='#ff0';

    a.fillStyle='#f00';
    a.fillText('🍏',e,f+8); //draw the apple - with y offset as it appears above the line

    a.fillRect(u, v, 10, 10); //draw snake head

    s.map((d) => { // draw out all the snakey bits
        u -= o(d-1); // increment snake segment based on direction
        v += o(d);

        h=(u == x && y == v);

        a.fillRect(u, v, 10, 10);
    });

    s.unshift(z); // add a new element to the snake, in the right direction
    s.pop(); // remove the last section of the snake

    h = h || x < 0 || 490 < x || y < 0 || 490 < y; // wall collision detection

    i++;

    a.fillText(i*100, 10,10); //write score

    h || window.setTimeout(r,q);
  }

  b.onkeydown = (d) => z = (direction = [38, 39, 40, 37].indexOf(d.which)) >= 0 ? Math.abs(direction - s[0]) != 2 ? direction : z : z;

  window.setTimeout(r,q);
})();
