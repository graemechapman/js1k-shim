// self executing anonymous, entry point for your app
((d) => {
    c.width = c.height = 500; // set canvas size

    g = 0; //high score

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

    a.lineWidth=10;
    a.lineJoin=a.lineCap=`round`;

    o = (d) => (d&1 && d-2)*10 // get segment direction offset

    r = (d) => { //run loop
        k < 5 && s[0]&1^k&1 && (s[0] = k); // check key pressed

        //apple detection
        if (e == x && y == f) {
            q*=.95;
            s.push(s);
            e = ~~(Math.random() * 48) * 10 + 15;
            f = ~~(Math.random() * 48) * 10 + 15;
        }

        // move snake in the right direction
        u = x += o(s[0]);
        v = y += o(s[0]-1);

        a.fillStyle=`#fff`;
        a.fillRect(0,0,500,500); // fill white
        a.strokeRect(0,0,500,500); // add a border

        a.fillStyle=`#f00`;
        a.fillText(`🍏`,e,f+8); //draw the apple - with y offset as it appears above the line

        a.beginPath();
        a.moveTo(u+5,v+5);
        s.map((d) => { // draw out all the snakey bits
            u -= o(d); // move each snake segment based on direction
            v -= o(d-1);
            a.lineTo(u+5,v+5);

            h = x < 0 || 490 < x || y < 0 || 490 < y || (u == x && y == v); // collision detection
        });
        a.strokeStyle=`#f00`;
        a.stroke();
        a.strokeStyle=`#000`;

        s.unshift(s[0]); // add a new element to the snake, in the right direction
        s.pop(); // remove the last section of the snake

        a.fillText(++i*100, 10,15); //write score

        h && a.fillText(`GAME OVER`,210,245);
        h && g < i && (g = i);

        h || setTimeout(r,q);

        g && a.fillText(`hi ${g*100}`, 10,35); //write high score
    }

    b.onkeydown = (d) => (k = d.which % 36) && h && z(); // modulo of 36 gives us 1-5 in order left, up, right, down

    z();
})();
