import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator.

You will be given a topic and you will be asked to generate flashcards based on the topic.
1. Create clear and concise flashcards for the topic.
2. Provide accurate and informative answers on the back of the flashcard
3. Ensure that each flashcard focuses on a specific topic and that each flashcard is relevant to the topic
4. Use clear language to make the flashcards accessible to a wide range of learners
5. Include a variety of question types, such as definitions, examples, comparisons and applications.
6. Avoid orverly complex or ambiguous phrasing in both questions and answers
7. When appropriate, use mnenomics or memory aids to help remember the questions and answers and reinforce the information.
8. Taller the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.

Return in the following JSON format:

{
    "flashcards": [
        {
            "front": "Question 1",
            "back": "Answer 1"
        },
        {
            "front": "Question 2",
            "back": "Answer 2"
        },
        {
            "front": "Question 3",
            "back": "Answer 3"
        },
        {
            "front": "Question 4",
            "back": "Answer 4"
        },
        {
            "front": "Question 5",
            "back": "Answer 5"
}

`

export async function POST(req){
    const openai = OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completion.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data},
        ],
        model : "gpt-4o",
        response_format: {type: "json_object"},

    })

    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcard)
}