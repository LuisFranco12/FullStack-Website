const stories = [
    {
        image: "https://cdn.openart.ai/uploads/image_eIRXJbou_1680192390139_512.webp",
        title: "terror at night",
        synopsis: "A group of friends in Millfield uncover the horrifying truth about a creature that stalks the town at night. As they investigate, they discover the creature is real and deadly. Now, they must face their fears and survive the night if they hope to live.",
        genre: "horror",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "John Smith"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_gUe74Ygs_1680298524190_512.webp",
        title: "Deadly Pursuit",
        synopsis: "Deadly Pursuit",
        genre: "action",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "David Stone"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_kI9lp01w_1680298572460_512.webp",
        title: "The Last Enchantress",
        synopsis: "Lyra discovers she's the last enchantress with the power to control magic. With the kingdom in danger and factions vying for power, she sets out on a perilous journey with unlikely allies to save the realm. This fantasy novel is full of adventure, magic, and heart.",
        genre: "fantasy",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Aria Blake"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_hhwMDI93_1680298636326_512.webp",
        title: "The Silent Witness",
        synopsis: "a prominent businessman is found dead, and the investigation reveals a tangled web of secrets and lies. With multiple perspectives and unexpected twists, this suspenseful mystery will keep readers on the edge of their seats.",
        genre: "mystery",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Elena Black"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_NUuFqHsS_1680533174559_512.webp",
        title: "The Art of Falling in Love",
        synopsis: "A woman returns to her hometown after many years to attend her sister's wedding. She reconnects with an old friend and the two begin to rekindle their romance, but secrets from their past threaten to keep them apart.",
        genre: "romance",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Nicholas Sparks"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_SiFn50Ey_1680533948383_512.webp",
        title: "Legacy of the Five Kingdoms",
        synopsis: "The five kingdoms of the realm have been at peace for centuries, but when the ruling family of the largest kingdom is assassinated, chaos erupts. The crown prince, the only surviving member of the royal family, goes into hiding and seeks out a group of warriors known for their skill and loyalty. With their help, he aims to reclaim his throne and restore peace to the realm.",
        genre: "fantasy",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Ava Jameson"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_34kU2njk_1680299160323_512.webp",
        title: "Laugh Lines and Punchlines",
        synopsis: "Jack tries to make it big as a comedian while navigating the challenges of the comedy world. Along the way, he finds love, forms friendships, and learns valuable lessons in this heartwarming and hilarious story.",
        genre: "comedy",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Sarah Lee"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_zK7H2yCI_1680299056017_512.webp",
        title: "An Introverted Comedian",
        synopsis: "When introverted comedian, Alex, is suddenly thrust into the spotlight after a viral video of his performance goes viral, he must navigate the cut-throat world of stand-up comedy.",
        genre: "comedy",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Mike O'Sullivan"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_svodC_Nz_1680532981177_512.webp",
        title: "Dark",
        synopsis: "In the town of Millfield, a dark force has been unleashed. Strange occurrences and unexplainable deaths have left the community in fear. As the townspeople scramble to uncover the source of the evil",
        genre: "horror",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Mara Lynn Scott"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_JuptCnQi_1680533035986_512.webp",
        title: "Code Red",
        synopsis: "When a deadly virus outbreak sweeps through a major city, the government declares a Code Red emergency response. Amidst the chaos and panic, a small team of specialized agents is tasked with locating and securing a rare antidote that could save millions of lives.",
        genre: "action",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Briar Hayes"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_gBh3EVXk_1680533128009_512.webp",
        title: "The Hidden Truth",
        synopsis: "a detective investigates a series of murders in a small town, uncovering a web of deceit and corruption. With high stakes and unexpected twists, this gripping mystery novel will leave readers guessing until the very end.",
        genre: "mystery",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Jenna West"
    },
    {
        image: "https://cdn.openart.ai/uploads/image_spKbcKA8_1680298992391_512.webp",
        title: "The Dragon's Blade",
        synopsis: "follow warrior Aiden on his quest to find the legendary Dragon's Blade, facing challenges and dark forces along the way. With magical elements and action-packed scenes, this high-fantasy adventure will captivate readers.",
        genre: "fantasy",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo commodo libero, ut aliquam purus rutrum vel. Phasellus nec tellus a nisi laoreet placerat. Curabitur vel gravida elit. Maecenas euismod felis quis velit efficitur, vel aliquet libero convallis. Suspendisse potenti. Sed malesuada quam eu lacus convallis, a interdum justo maximus.",
        author: "Adam Knight"
    }
]

module.exports = stories