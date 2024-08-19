import os
import openai



response = openai.ChatCompletion.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": """
                        Classify each animal in the following list of 50 animals into one of the main animal categories (Amphibians, Birds, Fish, Invertebrates, Mammals, or Reptiles).
                        Input: List of 50 animals: [ Elephant, Lion, Tiger, Giraffe, Zebra, Kangaroo, Panda, Gorilla, Rhinoceros, Hippopotamus, Cheetah, Leopard, Polar Bear, Grizzly Bear, Koala, Sloth, Penguin, Flamingo, Ostrich, Eagle, Owl, Parrot, Dolphin, Whale, Shark, Octopus, Jellyfish, Sea Turtle, Seal, Walrus, Bat, Chimpanzee, Baboon, Hyena, Fox, Wolf, Deer, Moose, Bison, Antelope, Alligator, Crocodile, Komodo Dragon, Iguana, Rattlesnake, Python, Frog, Toad, Salamander, Newt]

                        Output format: Mammals:[], Amphibians:[], Reptiles:[], Fish:[], Birds:[], Invertebrates:[]
                        """
        }
    ],
    temperature=0,
    max_tokens=2048,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0
)

print(response['choices'][0]['message']['content'])
