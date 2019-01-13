<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
	    $table->string('r1c1');
            $table->string('r1c2');
            $table->string('r1c3');
	    $table->string('r2c1');
            $table->string('r2c2');
            $table->string('r2c3');
	    $table->string('r3c1');
            $table->string('r3c2');
            $table->string('r3c3');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
