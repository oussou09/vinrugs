<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactUsSeed extends Seeder
{
    public function run(): void
    {
        $problemTypes = [1, 2, 3, 4];

        $descriptions = [
            "I am having trouble logging into my account. The password reset email is not arriving.",
            "My order has been pending for over a week with no updates. Please help.",
            "The website crashes every time I try to complete the checkout process.",
            "I was charged twice for the same order. Please refund the duplicate charge.",
            "The product I received does not match the description on the website.",
            "I cannot update my shipping address in the account settings.",
            "The discount code I applied did not reduce the price at checkout.",
            "I have not received a confirmation email after placing my order.",
            "The tracking link provided does not work and shows no information.",
            "I would like to request a return for an item I purchased last week.",
            "The image gallery on the product page is not loading properly.",
            "I accidentally placed a duplicate order and need one cancelled immediately.",
            "My account was suspended without any explanation or prior notice.",
            "The invoice I downloaded has incorrect billing information on it.",
            "I am unable to add items to my cart despite them showing as in stock.",
            "The mobile version of the website is very difficult to navigate.",
            "I received a damaged item and would like a replacement sent urgently.",
            "The filter options on the catalog page do not seem to work correctly.",
            "I have been waiting three days for a response from customer support.",
            "The size guide on the product page appears to be incorrect or outdated.",
        ];

        $firstNames = [
            'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
            'Benjamin', 'Isabella', 'Lucas', 'Mia', 'Henry', 'Charlotte', 'Alexander',
            'Amelia', 'Mason', 'Harper', 'Ethan', 'Evelyn', 'Daniel', 'Luna', 'Michael',
            'Aria', 'Owen', 'Chloe', 'Sebastian', 'Penelope', 'Jack', 'Layla',
        ];

        $lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
            'Davis', 'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White',
            'Harris', 'Martin', 'Thompson', 'Young', 'Allen', 'King', 'Wright',
            'Scott', 'Torres', 'Nguyen', 'Hill', 'Adams', 'Baker', 'Nelson', 'Carter',
        ];

        $records = [];

        for ($i = 0; $i < 50; $i++) {
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName  = $lastNames[array_rand($lastNames)];
            $fullName  = "$firstName $lastName";
            $email     = strtolower($firstName) . '.' . strtolower($lastName) . $i . '@example.com';

            $records[] = [
                'full_name'           => $fullName,
                'email'               => $email,
                'type_problem'        => $problemTypes[array_rand($problemTypes)],
                'problem_description' => $descriptions[array_rand($descriptions)],
                'created_at'          => now()->subDays(rand(0, 90))->subHours(rand(0, 23)),
                'updated_at'          => now()->subDays(rand(0, 30)),
            ];
        }

        DB::table('contact_us')->insert($records);
    }
}
