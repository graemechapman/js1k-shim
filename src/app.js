/**
* Snake in under 500 bytes
*/

// x = snake x coords
// y = snake y coords
// e = apple x
// f = apple y
// q = game speed
// h = dead
// k = last key pressed
z = (d) => {
    k = h = e = f = x = y = 99;
    s = [j = 2]; // snake parts - values assigned to directions [left, up, right, down]
}

b.onkeydown = (d) => (k = d.which % 36); // modulo of 36 gives us 1-4 in order left, up, right, down

// get segment direction offset
o = (d) => (d%2 && d-2);

z();

setInterval((d) => { //run loop

    // validate key pressed - must not be alternate direction to current
    k<5 && k&1^j&1 && (j = k);

    s.unshift(j); //add a new snake section

    //apple detection
    if (e^x | y^f) {
        s.pop(); // remove the end section unless it's eaten an apple
    } else {
        e = new Date%22 * 9; // move the apple
        f = new Date%21 * 9;
    }

    c.height = c.width = 198; // hax... resetting canvas width clears canvas and all properties (font, colours etc)
    a.fillRect(0,0,c.height,c.height);

    // move snake in the right direction
    u = x += 9*o(s[0]);
    v = y += 9*o(s[0]-1);

    a.fillStyle='red';
    a.fillRect(e,f,9,9);
    s.map((d) => { // draw out all the snakey bits
        a.fillRect(u -= 9*o(d), v -= 9*o(d-1), 9, 9); // move each snake segment based on direction and draw them
        h = h && (x+9)%207 && (y+9)%207 && (u^x | y^v); // collision detection
    });

    h || z();
}, 250)

