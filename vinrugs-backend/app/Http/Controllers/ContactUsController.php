<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function StoreContact(Request $request){
        $validatordata = $request->validate([
                'full_name' => 'required|string|between:3,60',
                'email' => 'required|email',
                'type_problem' => 'required|integer|between:1,4',
                'problem_description' => 'required|string|between:3,500'
        ]);

        try {
            $contact = ContactUs::create($validatordata);
            return response()->json([
                'message' => 'Created successfully',
                'data' => $contact,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong while saving your message: ' . $e->getMessage()], 500);
        }
    }

    public function GetContacts(){
        $contacts = ContactUs::all();
        return response()->json($contacts);
    }
}
