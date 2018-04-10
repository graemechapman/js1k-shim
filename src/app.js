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
    // h = game running (bool)
    // i = score
    // j = direction
    // k = last key pressed
    x = y = 120;
    h = q = 250;
    i = k = 0;
    s = [j = 2]; // snake parts - values assigned to directions [left, up, right, down]
    e = ~~(Math.random() * 22) * 10 + 10; // apple x
    f = ~~(Math.random() * 22) * 10 + 10; // apple y

    setTimeout(r,q);
}

o = (d) => (d&1 && d-2)*10 // get segment direction offset

r = (d) => { //run loop
    // validate key pressed - must not be alternate direction to current
    k<5 && k&1^j&1 && (j = k);

    s.unshift(j); //add a new snake section

    //apple detection
    if (e == x && y == f) {
        e = ~~(Math.random() * 22) * 10 + 10; // move the apple
        f = ~~(Math.random() * 22) * 10 + 10;
        q-=5;
    } else s.pop(); // remove the end section unless it's eaten an apple

    c.height = c.width = 250; // hax... resetting canvas width clears canvas and all context properties (font, colours etc)
    a.lineWidth = 10;
    a.lineJoin = a.lineCap = `round`;

    // move snake in the right direction
    u = x += o(s[0]);
    v = y += o(s[0] - 1);

    a.strokeRect(0, 0, 250, 250); // add a border

    a.fillText(`🍎`, e-6, f+2); // draw the apple - with y offset as it appears above the line

    a.beginPath();
    a.moveTo(u,v);

    s.map((d) => { // draw out all the snakey bits
        u -= o(d); // move each snake segment based on direction
        v -= o(d - 1);
        a.lineTo(u, v);

        h = h && x%250 && y%250 && (u^x || y^v); // collision detection
    });

    a.strokeStyle=`#0f0`;
    a.stroke();

    a.fillText(i+=100, 10, 15); //write score

    h || ~~localStorage.s < i && (localStorage.s = i);

    a.textAlign='end';
    a.fillText(`⭐ ${localStorage.s}`, 240, 15); //write high score

    h && setTimeout(r,q);

    a.font=`50px A`; // more hax.. no space to give a real font name, but it needs something
    h || a.fillText(`☠️`, 150, 130);
}

b.onkeydown = (d) => { k = d.which % 36; h || z() }; // modulo of 36 gives us 1-4 in order left, up, right, down

z();
