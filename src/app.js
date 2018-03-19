// self executing anonymous, entry point for your app
((d) => {
    c.width = c.height = 500; // set canvas size
    i = 0; //score

    m = (d) => ~~(Math.random() * 48) * 10 + 15;

    // x = snake x coords
    // y = snake y coords
    // q = game speed
    x = y = q = 245; // snake x coords
    k = 0; // last key pressed
    s = [0]; // snake parts - values assigned to directions [left, up, right, down]
    e = m(); // apple x
    f = m(); // apple y
    h = 0; // game running (true = game over)

    a.lineWidth=10;
    a.lineCap='round';
    a.lineJoin='round';

    o = (d) => d == 0 ? -10 : d == 2 ? 10 : 0 // get segment direction offset

    r = (d) => { //run loop
        k < 4 && Math.abs(s[0]- k) != 2 && (s[0] = k); // check key pressed

        //apple detection
        if (e == x && y == f) {
            q*=.95;
            s.push(s[i]);
            e=m();
            f=m();
        }

        // move snake in the right direction
        x += o(s[0]);
        y += o(s[0]-1);

        u = x;
        v = y;

        a.fillStyle='#fff';
        a.fillRect(0,0,500,500); // fill white
        a.strokeRect(0,0,500,500); // add a border

        a.fillStyle='#f00';
        a.fillText('🍏',e,f+8); //draw the apple - with y offset as it appears above the line

        a.beginPath();
        a.moveTo(u+5,v+5);
        s.map((d) => { // draw out all the snakey bits
            u -= o(d); // move each snake segment based on direction
            v -= o(d-1);
            a.lineTo(u+5,v+5);

            h = h || x < 0 || 490 < x || y < 0 || 490 < y || (u == x && y == v); // collision detection
        });
        a.strokeStyle='#f00';
        a.stroke();
        a.strokeStyle='#000';

        s.unshift(s[0]); // add a new element to the snake, in the right direction
        s.pop(); // remove the last section of the snake

        i++;

        a.fillText(i*100, 10,15); //write score

        h && a.fillText('GAME OVER',210,245);
        h || setTimeout(r,q);
    }

    b.onkeydown = (d) => k = d.which % 37; // modulo of 37 gives us 0-4 in order left, up, right, down

    setTimeout(r,q);
})();
