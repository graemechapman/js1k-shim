/**
 * Snake in under 500 bytes
 */
((d) => {
    c.width = c.height = 500; // set canvas size

    z = (d) => {
        // x = snake x coords
        // y = snake y coords
        // q = game speed
        // h = dead
        // i = score
        // k = last key pressed
        x = y = q = 245;
        i = k = h = 0;
        s = [2,2]; // snake parts - values assigned to directions [left, up, right, down]
        e = ~~(Math.random() * 48) * 10 + 15; // apple x
        f = ~~(Math.random() * 48) * 10 + 15; // apple y

        setTimeout(r,q);
    }

    o = (d) => (d&1 && d-2)*10 // get segment direction offset

    r = (d) => { //run loop
        k < 5 && Math.abs(s[0] - k) != 2 && (s[0] = k); // check key pressed

        //apple detection
        if (e == x && y == f) {
            s.push(s[i]);
            e = ~~(Math.random() * 48) * 10 + 15;
            f = ~~(Math.random() * 48) * 10 + 15;
        }

        // move snake in the right direction
        u = x += o(s[0]);
        v = y += o(s[0]-1);

        a.fillStyle='#fff';
        a.fillRect(0,0,500,500); // fill white
        a.strokeRect(0,0,500,500); // add a border

        a.fillStyle='#0f0';
        a.fillRect(e,f,10,10);
        a.fillStyle='#f00';

        s.map((d) => { // draw out all the snakey bits
            a.fillRect(u -= o(d), v -= o(d-1), 10, 10); // move each snake segment based on direction and draw them

            h = x < 0 || 490 < x || y < 0 || 490 < y || (u == x && y == v); // collision detection
        });

        s.unshift(s[0]); // add a new element to the snake, in the right direction
        s.pop(); // remove the last section of the snake

        a.fillText(i++*100, 10,15); //increment and write score

        h || setTimeout(r,q);

    }

    b.onkeydown = (d) => (k = d.which % 36) && h && z(); // modulo of 36 gives us 1-5 in order left, up, right, down

    z();
})();
