<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class Event extends Model
{
    use HasFactory;
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'title',
        'date',
        'time',
        'calendar_id'
    ];

    public static function getEventsByDate($date, $CalendarId) {

        return Event::where([
            'date' => Carbon::createFromFormat('d/m/yy', $date)->format('Y-m-d'),
            'calendar_id' => $CalendarId
        ])->orderBy('time', 'ASC');
    }
}
