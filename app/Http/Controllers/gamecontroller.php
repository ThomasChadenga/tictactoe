<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use App\Http\Resources\Game as GameResource;
use App\Http\Resources\GameCollection;

class GameController extends Controller
{
    public function index()
    {
        return new GameCollection(Game::all());
    }

    public function load($id)
    {
        return new GameResource(Game::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate([
            	'r1c1' => 'required|max:1',
             	'r1c2' => 'required|max:1',
		'r1c3' => 'required|max:1',
		'r2c1' => 'required|max:1',
                'r2c2' => 'required|max:1',
                'r2c3' => 'required|max:1',
		'r3c1' => 'required|max:1',
                'r3c2' => 'required|max:1',
                'r3c3' => 'required|max:1'
        ]);

        $game = Game::create($request->all());

        return (new GameResource($game))
                ->response()
                ->setStatusCode(201);
    }

    public function resetGame($id)
    {
        $game = Game::findOrFail($id);
        //reset the board
        $game->r1c1 = 'U';
        $game->r1c2 = 'U';
        $game->r1c3 = 'U';
        $game->r2c1 = 'U';
        $game->r2c2 = 'U';
        $game->r2c3 = 'U';
        $game->r3c1 = 'U';
        $game->r3c2 = 'U';
        $game->r3c3 = 'U';

        return new GameResource($game);
    }

}
