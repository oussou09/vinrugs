<?php

namespace App\Http\Controllers;

use App\Models\MailNewsLetter;
use Illuminate\Http\Request;

class MailNewsLetterController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function StoreMNL(Request $request)
    {
        $validator = $request->validate([
            'email' => 'required|email',
        ]);

        try {
            $UrMailNewsLetter = MailNewsLetter::create($validator);
             return response()->json(['message' => "Thank you for subscribing! Check your inbox soon for our latest stories."], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Something went wrong while Creating user profile: ' . $e->getMessage()], 500);
        }

    }
}
