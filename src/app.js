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
    s = [2]; // snake parts - values assigned to directions [left, up, right, down]
}

b.onkeydown = (d) => (k = d.which % 36); // modulo of 36 gives us 1-4 in order left, up, right, down

// get segment direction offset
o = (d) => (d&1 && d-2)*9;

z();

setInterval((d) => { //run loop
    s.unshift(s[0]); //add a new snake section

    //apple detection
    if (e^x | y^f) {
        s.pop(); // remove the end section unless it's eaten an apple
    } else {
        e = new Date%22 * 9; // move the apple
        f = new Date%21 * 9;
    }

    k < 5 && s[0]&1^k&1 && (s[0] = k); // check key pressed

    c.height = c.width = 198; // hax... resetting canvas width clears canvas and all properties (font, colours etc)

    // move snake in the right direction
    u = x += o(s[0]);
    v = y += o(s[0]-1);

    a.fillRect(0,0,c.height,c.height);

    a.fillStyle='red';
    a.fillRect(e,f,9,9);
    s.map((d) => { // draw out all the snakey bits
        a.fillRect(u -= o(d), v -= o(d-1), 9, 9); // move each snake segment based on direction and draw them
        h = h && (x+9)%207 && (y+9)%207 && (u^x | y^v); // collision detection
    });

    h || z();
}, 250)

