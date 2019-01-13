<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Game extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
              	'id'    => $this->id,
 		'r1c1'  => $this->r1c1,
		'r1c2'  => $this->r1c2,
		'r1c3'  => $this->r1c3,
		'r2c1'  => $this->r2c1,
		'r2c2'  => $this->r2c2,
		'r2c3'  => $this->r2c3,
		'r3c1'  => $this->r3c1,
                'r3c2'  => $this->r3c2,
                'r3c3'  => $this->r3c3,
		'created_at' => $this->created_at,
       		'updated_at' => $this->updated_at
               ];
    }
}
