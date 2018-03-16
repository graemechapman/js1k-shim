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
    console.log(x,e,y, f);

    u = x;
    v = y;

    //apple detection
    if (x == e && y == f) {
        q=q*.95;
        s.push(z)
        e=m()
        f=m()
    }
    // move snake in the right direction
    y -= o(z);
    x += o(z-1);


    a.fillStyle='#fff';
    a.fillRect(0,0,500,500); // fill white
    a.strokeRect(0,0,500,500); // add a border
    a.fillStyle='#6f0';

    a.fillText('🍏',e,f+8); //draw the apple - with your offset as it appears above the line
    a.fillStyle='red';


    a.fillRect(u, v, 10, 10);

    s.map((d,p) => { // draw out all the snakey bits
        u -= o(d-1); // increment snake segment based on direction
        v += o(d);

        h=(u == x && v == y);

        a.fillRect(u, v, 10, 10);
    });
    s.splice(0, 0, z); // add a new element to the snake, in the right direction
    s.pop(); // remove the last section of the snake

    [x,y].map((d) => d < 0 || d > 490?h=1:0) // wall collision detection

    i++;

    a.fillText(i*100, 10,10); //write score

    h ? 0 : w.setTimeout(r, 250*q);
  }

  w.onkeydown = (d) => {
    // z = (direction = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(d.key)) >= 0 ? Math.abs(direction - z) != 2 ? direction : z : z;
    z = (direction = [38, 39, 40, 37].indexOf(d.keyCode)) >= 0 ? Math.abs(direction - s[0]) != 2 ? direction : z : z;
  };

  w.setTimeout(r, 250*q);
})(window);
