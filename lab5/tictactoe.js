const express = require("express");
const router = express.Router({mergeParams: true});
const client = require("./config/redisClient");

router.get("/", async (req, res) => {
    const games = await client.keys("tictactoe:*")
    console.log("games: ", games);
    return res.send(games);
});

router.get("/:game_id/board", async (req, res) => {
    const game_id = req.params.game_id;
    try {
        let board = await client.get(`tictactoe:${game_id}:board`)
        console.log("board: ", board);
        board = JSON.parse(board)
        return res.send(board)
    } catch (err) {
        console.log(err);
    }
})

router.get("/:game_id/moves", async (req, res) => {
    const game_id = req.params.game_id;
    try {
        let moves = await client.lrange(`tictactoe:${game_id}:moves`, 0, -1)
        // moves = JSON.parse(moves);
        console.log(moves);

        return res.send(moves)

    } catch (err) {
        console.log(err);
    }
})

router.post("/new-game", async (req, res) => {
    // const move = {x: req.body.x, y: req.body.y};
    try {
        let game_id = await client.get('tictactoe:game_id')
        if (game_id === null) {
            await client.set('tictactoe:game_id', 0)
            game_id = await client.get('tictactoe:game_id')
        }
        game_id = Number(game_id);

        const new_board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]
        await client.set(`tictactoe:${game_id}:board`, JSON.stringify(new_board));


        const this_game_id = game_id;
        await client.set("tictactoe:game_id", game_id + 1)
        return res.send({game_id: this_game_id});

    } catch (err) {
        console.log(err)
        return res.send(err);
    }
})
    


router.post("/:game_id", async (req, res) => {
    const game_id = req.params.game_id;
    const x = req.body.x;
    const y = req.body.y;
    const player = req.body.player; // kółko/krzyżyk O/X
    let move = {x,y, player};
    try {
        let move_id = await client.get(`tictactoe:${game_id}:move_id`)
        if (move_id === null) {
            console.log("move id null");
            await client.set(`tictactoe:${game_id}:move_id`, 0)
            move_id = await client.get(`tictactoe:${game_id}:move_id`)
        }
        move_id = Number(move_id);

        if ((x < 0 || x > 2) || (y < 0 || y > 2))
            return res.send("x and y must be between 0 and 2")

        


        let board = await client.get(`tictactoe:${game_id}:board`);
        console.log(board);
        board = JSON.parse(board);

        const field = board[x][y];
        console.log(field);

        if (field !== "-")
            return res.send("This field is not empty!")


        board[x][y] = player;
        console.log(board);

        await client.set(`tictactoe:${game_id}:board`, JSON.stringify(board))


        move = { 
            ...move,
            move_id
        }
        await client.set(`tictactoe:${game_id}:moves:${move_id}`, JSON.stringify(move));
        await client.rpush(`tictactoe:${game_id}:moves`, JSON.stringify(move));
        const m = await client.get(`tictactoe:${game_id}:moves:${move_id}`)
        console.log("move: ", JSON.parse(m));

        // const this_move_id = move_id;
        await client.set(`tictactoe:${game_id}:move_id`, move_id + 1)
        const m_id = await client.get(`tictactoe:${game_id}:move_id`)  
        console.log("m_id: ", m_id);
        return res.send(move);

        // return res.send({})
    } catch (err) {
        console.log(err)
        return res.send(err);
    }
});

router.delete("/", async (req, res) => {
    return res.send({});
});

module.exports = router;