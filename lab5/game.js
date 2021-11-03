const express = require("express");
const router = express.Router({mergeParams: true});
const client = require("./config/redisClient");

router.get("/", async (req, res) => {
    const games = client.keys("game:*")
    return res.send(games);
});

router.post("/new-game", async (req, res) => {
    // const move = {x: req.body.x, y: req.body.y};
    try {
        let game_id = await client.get('game:game_id')
        if (game_id === null) {
            await client.set('game:game_id', 0)
            game_id = await client.get('game:game_id')
        }

        const new_board = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]]
        await client.set(`game:${game_id}:board`, new_board)

        const this_game_id = game_id;
        await client.set("game:game_id", game_id+1)
        return res.send({game_id: this_game_id});

    } catch (err) {
        console.log(err)
        return res.send(err);
    }
    
});

router.post("/:game_id", async (req, res) => {
    const move = req.body;
    try {
        let move_id = await client.get(`game:${game_id}:move_id`)
        if (move_id === null) {
            await client.set(`game:${game_id}:move_id`, 0)
            move_id = await client.get(`game:${game_id}:move_id`)
        }

        await client.set(`game:${game_id}:moves:${move_id}`, move);
        const m = client.get(`game:${game_id}:moves:${move_id}`)

        const this_move_id = move_id;
        await client.set("game:game_id", move_id + 1)
        return res.send({move_id: this_move_id});

    } catch (err) {
        console.log(err)
        return res.send(err);
    }
});

router.delete("/", async (req, res) => {
    return res.send({});
});

module.exports = router;