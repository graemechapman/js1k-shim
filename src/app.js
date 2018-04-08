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
    e = f = x = y = 100;
    k = h = 0;
    s = [2]; // snake parts - values assigned to directions [left, up, right, down]
}

b.onkeydown = (d) => (k = d.which % 36); // modulo of 36 gives us 1-4 in order left, up, right, down

o = (d) => (d&1 && d-2)*10 // get segment direction offset

z();

setInterval((d) => { //run loop
    s.unshift(s[0]); //add a new snake section

    //apple detection
    if (e == x && y == f) {
        e = new Date%21 * 10; // move the apple
        f = new Date%20 * 10;
    } else s.pop(); // remove the end section unless it's eaten an apple

    k < 5 && s[0]&1^k&1 && (s[0] = k); // check key pressed

    c.height = c.width = 200; // hax... resetting canvas width clears canvas and all properties (font, colours etc)

    // move snake in the right direction
    u = x += o(s[0]);
    v = y += o(s[0]-1);

    a.fillRect(0,0,c.height,c.height);

    a.fillStyle='red';
    a.fillRect(e,f,10,10);

    s.map((d) => { // draw out all the snakey bits
        a.fillRect(u -= o(d), v -= o(d-1), 10, 10); // move each snake segment based on direction and draw them

        h = h || x < 0 || 190 < x || y < 0 || 190 < y || (u == x && y == v); // collision detection
    });

    h && z();
}, 250)

