// self executing anonymous, entry point for your app
((d) => {
  c.width = c.height = 500; // set canvas size

  i = 0; //score

  m = (d) => ~~(Math.random() * 48) * 10 + 15;

  // x = snake x coords
  // y = snake y coords
  // q = game speed
  x = y = q = 245; // snake x coords
  z = 0; // direction - start moving left
  k = 0; // last key pressed
  s = [0]; // snake parts - values assigned to directions [left, up, right, down]
  e = m(); // apple x
  f = m(); // apple y
  h = 0; // game running (1 = game over)

  o = (d) => d == 0 ? -10 : d == 2 ? 10 : 0 // get segment direction offset

  r = (d) => { //run loop
    k < 4 && Math.abs(z- k) != 2 && (z = k); // check key pressed
    u = x;
    v = y;

    //apple detection
    if (e == x && y == f) {
        q*=.95;
        s.push(s[i]);
        e=m();
        f=m();
    }

    // move snake in the right direction
    x += o(z);
    y += o(z-1);

    a.fillStyle='#fff';
    a.fillRect(0,0,500,500); // fill white
    a.strokeRect(0,0,500,500); // add a border

    a.fillStyle='#f00';
    a.fillText('🍏',e,f+8); //draw the apple - with y offset as it appears above the line

    a.fillRect(u, v, 10, 10); //draw snake head

    s.map((d) => { // draw out all the snakey bits
        u -= o(d); // move each snake segment based on direction
        v -= o(d-1);

        h=(u == x && y == v); // collision detect with snake head

        a.fillRect(u, v, 10, 10);
    });

    s.unshift(z); // add a new element to the snake, in the right direction
    s.pop(); // remove the last section of the snake

    h = h || x < 0 || 490 < x || y < 0 || 490 < y; // wall collision detection

    i++;

    a.fillText(i*100, 10,10); //write score

    h || window.setTimeout(r,q);
  }

  b.onkeydown = (d) => k = d.which % 37; // modulo of 37 gives us 0-4 in order left, up, right, down

  window.setTimeout(r,q);
})();
