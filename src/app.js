/**
 * Snake in under 650 bytes
 *
 * Use arrow keys to move
 * Game can be restarted by pressing any key
 */
// start game
z = (d) => {
    // x = snake x coords
    // y = snake y coords
    // q = game speed
    // h = dead
    // i = score
    // k = last key pressed
    x = y = q = 245;
    i = k = h = 0;
    s = [2]; // snake parts - values assigned to directions [left, up, right, down]
    e = ~~(Math.random() * 48) * 10 + 15; // apple x
    f = ~~(Math.random() * 48) * 10 + 15; // apple y

    setTimeout(r,q);
}

o = (d) => (d&1 && d-2)*10 // get segment direction offset

r = (d) => { //run loop
    s.unshift(s[0]); //add a new snake section

    //apple detection
    if (e == x && y == f) {
        e = ~~(Math.random() * 48) * 10 + 15; // move the apple
        f = ~~(Math.random() * 48) * 10 + 15;
        q-=5;
    } else s.pop(); // remove the end section unless it's eaten an apple

    k < 5 && s[0]&1^k&1 && (s[0] = k); // check key pressed

    c.height = c.width = 500; // hax... resetting canvas width clears canvas and all context properties (font, colours etc)
    a.lineWidth = 10;
    a.lineJoin = a.lineCap = `round`;

    // move snake in the right direction
    u = x += o(s[0]);
    v = y += o(s[0] - 1);

    a.strokeRect(0, 0, 500, 500); // add a border

    a.fillText(`🍎`, e, f+8); // draw the apple - with y offset as it appears above the line

    a.beginPath();
    a.moveTo(u+5,v+5);

    s.map((d) => { // draw out all the snakey bits
        u -= o(d); // move each snake segment based on direction
        v -= o(d - 1);
        a.lineTo(u + 5, v + 5);

        h = h || x < 0 || 490 < x || y < 0 || 490 < y || (u == x && y == v); // collision detection
    });

    a.strokeStyle=`#0f0`;
    a.stroke();

    a.fillText(i+=100, 10, 15); //write score

    h && ~~localStorage.s < i && (localStorage.s = i);

    a.fillText(`⭐ ${localStorage.s}`, 480 - 8 * `${localStorage.s}`.length, 15); //write high score

    h || setTimeout(r,q);

    a.font=`100px A`; // more hax.. no space to give a real font name, but it needs something
    h && a.fillText(`☠️`, 180, 270);
}

b.onkeydown = (d) => (k = d.which % 36) && h && z(); // modulo of 36 gives us 1-4 in order left, up, right, down

z();