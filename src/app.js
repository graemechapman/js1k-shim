/**
* Snake in under 500 bytes
*/

// x = snake x coords
// y = snake y coords
// e = apple x
// f = apple y
// q = game speed
// h = dead
// i = score
// k = last key pressed
z = (d) => {
    e = f = x = y = 245;
    i = k = h = 0;
    s = [2]; // snake parts - values assigned to directions [left, up, right, down]
}

b.onkeydown = (d) => (k = d.which % 36) && h && z(); // modulo of 36 gives us 1-4 in order left, up, right, down

o = (d) => (d&1 && d-2)*10 // get segment direction offset

z();

setInterval((d) => { //run loop
    if (!h) {
        s.unshift(s[0]); //add a new snake section

        //apple detection
        if (e == x && y == f) {
            e = ~~(Math.random() * 48) * 10 + 15; // move the apple
            f = ~~(Math.random() * 48) * 10 + 15;
        } else s.pop(); // remove the end section unless it's eaten an apple

        k < 5 && s[0]&1^k&1 && (s[0] = k); // check key pressed

        c.height = c.width = 500; // hax... resetting canvas width clears canvas and all properties (font, colours etc)

        // move snake in the right direction
        u = x += o(s[0]);
        v = y += o(s[0]-1);

        a.strokeRect(0,0,500,500); // add a border

        a.fillStyle='#f00';

        a.fillText(i++*100, 10,15); //increment and write score
        a.fillRect(e,f,10,10);
        a.fillStyle='#0f0';

        s.map((d) => { // draw out all the snakey bits
            a.fillRect(u -= o(d), v -= o(d-1), 10, 10); // move each snake segment based on direction and draw them

            h = x < 0 || 490 < x || y < 0 || 490 < y || (u == x && y == v); // collision detection
        });
    }
}, 250)

