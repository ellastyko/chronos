<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use App\Models\ {
    User,
    Calendar,
    Event,
    Participant
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
        $clndrs = Participant::where('participant', Auth::user()->id)->get('calendar');
        $calendars = [];
        foreach ($clndrs as $value) {
            array_push($calendars, $value['calendar']);
        }
        return response([
            'calendars' => Calendar::find($calendars)
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
        Participant::create([
            'calendar' => $calendar->id,
            'participant' => Auth::user()->id
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

    public function invite(Request $request)
    {
        $request->validate([
            'invited_user' => 'required|integer',
            'calendar_id' => 'required|integer',
        ]);
        if (Auth::user()->id == $request->input('invited_user')) {
            return response([
                'message' => 'Unable to add yourself!'
            ], 400);
        }
        
        $participant = Participant::create([
            'calendar' =>  $request->input('calendar_id'),
            'participant' =>  $request->input('invited_user')
        ]);

        $details = [
            'title' => 'A member shared a calendar with you',
            'body' => 'A member shared a calendar with you. Now you can visit our website and check events!'
        ];
        Mail::to(User::find($request->input('invited_user')))->send(new SendMail($details));
        return response([
            'message' => 'Calendar shared!',
            'participant' => $participant
        ]);
    }
}
