import openai
import numpy as np

# Set up your OpenAI API key
# Define the list of animals to classify
animals = [
    "Elephant", "Lion", "Tiger", "Giraffe", "Zebra", "Kangaroo", "Panda", "Gorilla", 
    "Rhinoceros", "Hippopotamus", "Cheetah", "Leopard", "Polar Bear", "Grizzly Bear", 
    "Koala", "Sloth", "Penguin", "Flamingo", "Ostrich", "Eagle", "Owl", "Parrot", 
    "Dolphin", "Whale", "Shark", "Octopus", "Jellyfish", "Sea Turtle", "Seal", 
    "Walrus", "Bat", "Chimpanzee", "Baboon", "Hyena", "Fox", "Wolf", "Deer", 
    "Moose", "Bison", "Antelope", "Alligator", "Crocodile", "Komodo Dragon", 
    "Iguana", "Rattlesnake", "Python", "Frog", "Toad", "Salamander", "Newt"
]

# Define the categories
categories = ["Amphibians", "Birds", "Fish", "Invertebrates", "Mammals", "Reptiles"]

# Function to get embeddings
def get_embedding(text, model="text-embedding-3-small"):
    response = openai.Embedding.create(input=[text], model=model)
    embedding = np.array(response['data'][0]['embedding'])
    return embedding

# Get embeddings for each category
category_embeddings = {}
for category in categories:
    category_embedding = get_embedding(category)
    category_embeddings[category] = category_embedding

# Function to calculate cosine similarity using numpy
def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    magnitude1 = np.linalg.norm(vec1)
    magnitude2 = np.linalg.norm(vec2)
    return dot_product / (magnitude1 * magnitude2)

# Function to classify an animal
def classify_animal(animal):
    animal_embedding = get_embedding(animal)
    similarities = {}
    for category, category_embedding in category_embeddings.items():
        similarity = cosine_similarity(animal_embedding, category_embedding)
        similarities[category] = similarity
    best_category = max(similarities, key=similarities.get)
    return best_category

# Classify each animal
classifications = {}
for animal in animals:
    best_category = classify_animal(animal)
    classifications[animal] = best_category

# Organize the results by category
result = {}
for category in categories:
    result[category] = []
for animal, classification in classifications.items():
    result[classification].append(animal)

# Print the results
for category, animal_list in result.items():
    print(f"{category}: {animal_list}")
    print('\n')
