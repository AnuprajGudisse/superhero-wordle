const superheroes = [
    { name: 'Batman', hints: ['Gotham City protector', 'No superpowers', 'Uses gadgets', 'Bruce Wayne', 'The Dark Knight'] },
    { name: 'Superman', hints: ['From Krypton', 'Red and blue suit', 'X-ray vision', 'Clark Kent', 'Man of Steel'] },
    { name: 'Spider Man', hints: ['Bitten by a radioactive spider', 'Shoots webs', 'Friendly neighborhood hero', 'Peter Parker', 'Lives in New York City'] },
    { name: 'Iron Man', hints: ['Genius inventor', 'Powered by an arc reactor', 'Billionaire playboy', 'Tony Stark', 'Wears a red and gold suit'] },
    { name: 'Wonder Woman', hints: ['Amazonian princess', 'Wields a lasso of truth', 'Superhuman strength', 'Diana Prince', 'Themyscira warrior'] },
    { name: 'Thor', hints: ['God of Thunder', 'Wields a hammer', 'Asgardian prince', 'Son of Odin', 'Brother of Loki'] },
    { name: 'Hulk', hints: ['Green giant', 'Super strength', 'Bruce Banner', 'Anger triggers transformation', 'The Strongest Avenger'] },
    { name: 'Captain America', hints: ['Super soldier', 'Wields a shield', 'Steve Rogers', 'Fights for justice', 'Symbol of patriotism'] },
    { name: 'Black Widow', hints: ['Former Russian spy', 'Expert martial artist', 'Natasha Romanoff', 'Red hair', 'Member of the Avengers'] },
    { name: 'Aquaman', hints: ['Atlantean hero', 'Wields a trident', 'Controls sea creatures', 'Arthur Curry', 'King of Atlantis'] },
    { name: 'The Flash', hints: ['Fastest man alive', 'Scarlet Speedster', 'Barry Allen', 'Time traveler', 'Member of the Justice League'] },
    { name: 'Green Lantern', hints: ['Wields a power ring', 'Member of the Green Lantern Corps', 'Hal Jordan', 'Creates constructs with willpower', 'Intergalactic hero'] },
    { name: 'Doctor Strange', hints: ['Sorcerer Supreme', 'Master of the mystic arts', 'Stephen Strange', 'Time manipulation', 'Guardian of the multiverse'] },
    { name: 'Black Panther', hints: ['King of Wakanda', 'Superhuman agility', 'Wears a vibranium suit', 'T\'Challa', 'Fights for his people'] },
    { name: 'Deadpool', hints: ['Merc with a mouth', 'Healing factor', 'Wields dual katanas', 'Wade Wilson', 'Breaks the fourth wall'] },
    { name: 'Wolverine', hints: ['Mutant with claws', 'Healing factor', 'Part of the X-Men', 'Logan', 'Adamantium skeleton'] },
    { name: 'Cyclops', hints: ['Shoots optic blasts', 'Leader of the X-Men', 'Scott Summers', 'Wears a visor', 'Mutant hero'] },
    { name: 'Storm', hints: ['Controls the weather', 'Member of the X-Men', 'Ororo Munroe', 'Lightning powers', 'Queen of Wakanda'] },
    { name: 'Rogue', hints: ['Absorbs powers by touch', 'Member of the X-Men', 'Anna Marie', 'Super strength', 'Flying ability'] },
    { name: 'Beast', hints: ['Blue fur and super strength', 'Genius intellect', 'Hank McCoy', 'Member of the X-Men', 'Loves science'] },
    { name: 'Hawkeye', hints: ['Master archer', 'Clint Barton', 'Member of the Avengers', 'Uses trick arrows', 'Sharp shooter'] },
    { name: 'Vision', hints: ['Android hero', 'Powered by the Mind Stone', 'Member of the Avengers', 'Married to Scarlet Witch', 'Phases through objects'] },
    { name: 'Scarlet Witch', hints: ['Reality warper', 'Wields chaos magic', 'Wanda Maximoff', 'Member of the Avengers', 'Twin of Quicksilver'] },
    { name: 'Quicksilver', hints: ['Super speed', 'Twin of Scarlet Witch', 'Pietro Maximoff', 'Silver hair', 'Faster than the eye'] },
    { name: 'Ant Man', hints: ['Shrinks and grows', 'Wears a specialized suit', 'Scott Lang', 'Member of the Avengers', 'Controls ants'] },
    { name: 'The Wasp', hints: ['Shrinks and grows', 'Flies with wings', 'Hope van Dyne', 'Member of the Avengers', 'Partner of Ant-Man'] },
    { name: 'Star Lord', hints: ['Leader of the Guardians of the Galaxy', 'Loves 80s music', 'Peter Quill', 'Uses dual blasters', 'Part celestial'] },
    { name: 'Gamora', hints: ['Deadliest woman in the galaxy', 'Green-skinned warrior', 'Adopted daughter of Thanos', 'Member of the Guardians', 'Uses a sword'] },
    { name: 'Rocket Raccoon', hints: ['Talking raccoon', 'Expert marksman', 'Mechanic and inventor', 'Member of the Guardians', 'Loves Groot'] },
    { name: 'Groot', hints: ['Talking tree', 'Says "I am Groot"', 'Loves Rocket', 'Member of the Guardians', 'Can grow and regenerate'] },
    { name: 'Drax', hints: ['Literal-minded warrior', 'Super strength', 'Green-skinned', 'Member of the Guardians', 'Seeks revenge for family'] },
    { name: 'Loki', hints: ['God of Mischief', 'Brother of Thor', 'Shape-shifter', 'Son of Laufey', 'Uses illusions'] },
    { name: 'Silver Surfer', hints: ['Galactic hero', 'Former Herald of Galactus', 'Rides a silver board', 'Norrin Radd', 'Cosmic powers'] },
    { name: 'Nova', hints: ['Intergalactic hero', 'Member of the Nova Corps', 'Richard Rider', 'Super strength', 'Flies with cosmic energy'] },
    { name: 'Ghost Rider', hints: ['Flaming skull', 'Rides a fiery motorcycle', 'Spirit of vengeance', 'Johnny Blaze', 'Uses a chain as a weapon'] },
    { name: 'Shazam', hints: ['Magical hero', 'Can transform with a word', 'Billy Batson', 'Super strength and speed', 'Lightning powers'] },
    { name: 'Green Arrow', hints: ['Master archer', 'Oliver Queen', 'Wealthy vigilante', 'Uses trick arrows', 'Defender of Star City'] },
    { name: 'Supergirl', hints: ['Cousin of Superman', 'From Krypton', 'Kara Zor-El', 'Super strength', 'Heat vision'] },
    { name: 'Nightwing', hints: ['Former Robin', 'Skilled acrobat', 'Dick Grayson', 'Fights crime in Blüdhaven', 'Uses escrima sticks'] },
    { name: 'Batgirl', hints: ['Gotham City vigilante', 'Barbara Gordon', 'Skilled martial artist', 'Daughter of Commissioner Gordon', 'Tech-savvy hero'] },
    { name: 'The Atom', hints: ['Shrinks to microscopic size', 'Scientist', 'Ray Palmer', 'Member of the Justice League', 'Harnesses atomic energy'] },
    { name: 'Martian Manhunter', hints: ['Shape-shifter', 'From Mars', 'J\'onn J\'onzz', 'Telepathic abilities', 'Member of the Justice League'] },
    { name: 'Black Canary', hints: ['Martial artist', 'Uses a sonic scream', 'Dinah Lance', 'Member of the Justice League', 'Lover of Green Arrow'] },
    { name: 'Zatanna', hints: ['Magician and sorceress', 'Speaks spells backward', 'Performs stage magic', 'Member of the Justice League', 'Wields powerful magic'] },
    { name: 'Falcon', hints: ['Wingsuit hero', 'Partner of Captain America', 'Sam Wilson', 'Wields a shield', 'Uses Redwing drone'] },
    { name: 'Winter Soldier', hints: ['Super soldier', 'Metal arm', 'Bucky Barnes', 'Former assassin', 'Best friend of Captain America'] },
    { name: 'Moon Knight', hints: ['Egyptian-themed hero', 'Marc Spector', 'Multiple personalities', 'Wields crescent darts', 'Fights at night'] },
];

export default superheroes;
