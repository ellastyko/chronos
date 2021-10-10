<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Carbon\Carbon;
use DateTime;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Event::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'title' => 'required|string',
            'date' => 'required',
            'calendar_id' => 'required'
        ]);

        $date = Carbon::createFromFormat('d/m/Y H:i', $request->input('date'));
        if ($date->isPast()) {
            return response([
                'message' => 'Choose valid date!'
            ], 400);
        }
        $event = Event::create([
            'title' => $request->input('title'),
            'date' => $date->format('Y-m-d'),  
            'time' => $date->format('H:i:s'),     
            'calendar_id' =>  $request->input('calendar_id')
        ]);
        return response([
            'message' => 'Event added!',
            'event' => $event
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
