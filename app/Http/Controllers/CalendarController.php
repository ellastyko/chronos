<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ {
    Calendar,
    Event
};
use Illuminate\Support\Facades\Auth;


class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function UserCalendars()
    {     
        return response([
            'calendars' => Calendar::where(['author' => Auth::user()->id])->get()
        ]);
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
            'type' => 'required|not_in:0',
        ]);
        $calendar = Calendar::create([
            'title' => $request->input('title'),
            'type' => $request->input('type'),
            'author' => Auth::user()->id
        ]);
        return response([
            'message' => 'Calendar added!',
            'calendar' => $calendar
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
        $calendar = Calendar::find($id);
        if ($calendar) {
            return response([
                'calendar' => $calendar
            ]);
        }
        else {
            response([
                'message' => 'Calendar was not found!'
            ], 404);
        }
    }

    public function showEvents(Request $request, $id)
    {
        return response([
            'events' => Event::getEventsByDate($request->get('date'), $id)->get()
        ]);
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
